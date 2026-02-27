#!/usr/bin/env bash
# session-summary.sh
# Claude Code Stop hook: summarizes the current session transcript
# and saves it to .claude/summaries/<session_id>.md
#
# This hook fires when Claude finishes responding. It reads the hook
# payload from stdin, extracts the transcript path, and delegates
# summarization to a headless Claude subagent via `claude -p`.

set -euo pipefail

# ---------------------------------------------------------------------------
# 1. Parse the JSON payload from stdin
# ---------------------------------------------------------------------------
PAYLOAD=$(cat)

SESSION_ID=$(echo "$PAYLOAD" | jq -r '.session_id // empty')
TRANSCRIPT_PATH=$(echo "$PAYLOAD" | jq -r '.transcript_path // empty')
STOP_HOOK_ACTIVE=$(echo "$PAYLOAD" | jq -r '.stop_hook_active // false')

# Guard: avoid infinite loops — if a stop hook is already running, bail out
if [ "$STOP_HOOK_ACTIVE" = "true" ]; then
  exit 0
fi

# Guard: nothing to summarize without a transcript
if [ -z "$TRANSCRIPT_PATH" ] || [ ! -f "$TRANSCRIPT_PATH" ]; then
  exit 0
fi

# ---------------------------------------------------------------------------
# 2. Prepare the output directory
# ---------------------------------------------------------------------------
SUMMARIES_DIR="${CLAUDE_PROJECT_DIR:-.}/.claude/summaries"
mkdir -p "$SUMMARIES_DIR"

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
OUTPUT_FILE="$SUMMARIES_DIR/${TIMESTAMP}_${SESSION_ID}.md"

# ---------------------------------------------------------------------------
# 3. Extract a trimmed version of the transcript (last 200 lines max)
#    to keep the headless prompt small and fast
# ---------------------------------------------------------------------------
TRANSCRIPT_CONTENT=$(tail -n 200 "$TRANSCRIPT_PATH")

# Guard: skip if transcript is trivially small
LINE_COUNT=$(echo "$TRANSCRIPT_CONTENT" | wc -l)
if [ "$LINE_COUNT" -lt 3 ]; then
  exit 0
fi

# ---------------------------------------------------------------------------
# 4. Delegate summarization to Claude in headless mode
# ---------------------------------------------------------------------------
SUMMARY=$(claude -p \
  --output-format text \
  "You are a session summarizer. Analyze the following Claude Code session transcript and produce a concise Markdown summary with these sections:

## Session Summary

### Goal
What the user was trying to accomplish.

### Key Actions
Bullet list of the main actions taken (files created/edited, commands run, decisions made).

### Outcome
What was achieved by the end of the session.

### Open Items
Any unfinished tasks or follow-ups mentioned.

---

Here is the transcript (JSONL format, each line is a message):

\`\`\`
$TRANSCRIPT_CONTENT
\`\`\`

Respond ONLY with the Markdown summary, nothing else." 2>/dev/null) || true

# ---------------------------------------------------------------------------
# 5. Write the summary to disk
# ---------------------------------------------------------------------------
if [ -n "$SUMMARY" ]; then
  cat > "$OUTPUT_FILE" <<EOF
<!-- Auto-generated session summary -->
<!-- Session: $SESSION_ID -->
<!-- Date: $(date -Iseconds) -->
<!-- Transcript: $TRANSCRIPT_PATH -->

$SUMMARY
EOF
  echo "Session summary saved to $OUTPUT_FILE"
fi

exit 0
