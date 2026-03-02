#!/usr/bin/env node

/**
 * Release script for ngx-com library
 *
 * Bumps version, generates changelog, creates commit, tag, pushes to GitHub,
 * and creates a GitHub Release (which triggers the npm publish workflow).
 *
 * Usage:
 *   node scripts/release.mjs patch|minor|major|prepatch|preminor|premajor|prerelease|x.y.z
 *
 * Options:
 *   --dry-run    Show what would be done without making changes
 *   --no-push    Create commit and tag locally but don't push or create release
 *   --preid=X    Prerelease identifier (default: "alpha")
 *   --help       Show this help message
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { createInterface } from 'node:readline';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const LIB_PACKAGE_PATH = join(ROOT, 'projects/com/package.json');
const CHANGELOG_PATH = join(ROOT, 'CHANGELOG.md');

// ─── Helpers ─────────────────────────────────────────────────────────────────

function exec(cmd, options = {}) {
  return execSync(cmd, { cwd: ROOT, encoding: 'utf-8', ...options }).trim();
}

function execLive(cmd) {
  execSync(cmd, { cwd: ROOT, stdio: 'inherit' });
}

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf-8'));
}

function writeJson(path, data) {
  writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
}

function ask(question) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    });
  });
}

function checkGhCli() {
  try {
    exec('gh --version');
    return true;
  } catch {
    return false;
  }
}

function printHelp() {
  console.log(`
Usage: node scripts/release.mjs <version> [options]

Version (required):
  patch        Bump patch version (0.0.1 -> 0.0.2)
  minor        Bump minor version (0.0.1 -> 0.1.0)
  major        Bump major version (0.0.1 -> 1.0.0)
  prepatch     Bump prepatch (0.0.1 -> 0.0.2-alpha.0)
  preminor     Bump preminor (0.0.1 -> 0.1.0-alpha.0)
  premajor     Bump premajor (0.0.1 -> 1.0.0-alpha.0)
  prerelease   Bump prerelease (0.0.2-alpha.0 -> 0.0.2-alpha.1)
  x.y.z        Explicit version (e.g., 1.2.3, 2.0.0-beta.1)

Options:
  --dry-run    Show what would be done without making changes
  --no-push    Create commit and tag locally but don't push or create release
  --preid=X    Prerelease identifier (default: "alpha")
  --help       Show this help message

Examples:
  node scripts/release.mjs patch
  node scripts/release.mjs minor --dry-run
  node scripts/release.mjs premajor --preid=beta
  node scripts/release.mjs 2.0.0-rc.1

Flow:
  1. Bumps version in projects/com/package.json
  2. Updates CHANGELOG.md
  3. Creates commit: chore(release): vX.Y.Z
  4. Creates tag: vX.Y.Z
  5. Pushes commit and tag to origin
  6. Creates GitHub Release (triggers npm publish workflow)
`);
}

// ─── Version Logic ───────────────────────────────────────────────────────────

function parseVersion(version) {
  const match = version.match(/^(\d+)\.(\d+)\.(\d+)(?:-([a-zA-Z]+)\.(\d+))?$/);
  if (!match) return null;
  return {
    major: parseInt(match[1], 10),
    minor: parseInt(match[2], 10),
    patch: parseInt(match[3], 10),
    preid: match[4] || null,
    prenum: match[5] !== undefined ? parseInt(match[5], 10) : null,
  };
}

function formatVersion(v) {
  const base = `${v.major}.${v.minor}.${v.patch}`;
  if (v.preid !== null && v.prenum !== null) {
    return `${base}-${v.preid}.${v.prenum}`;
  }
  return base;
}

function bumpVersion(current, type, preid = 'alpha') {
  const v = parseVersion(current);
  if (!v) {
    throw new Error(`Invalid current version: ${current}`);
  }

  switch (type) {
    case 'patch':
      return formatVersion({ ...v, patch: v.patch + 1, preid: null, prenum: null });
    case 'minor':
      return formatVersion({ ...v, minor: v.minor + 1, patch: 0, preid: null, prenum: null });
    case 'major':
      return formatVersion({ ...v, major: v.major + 1, minor: 0, patch: 0, preid: null, prenum: null });
    case 'prepatch':
      return formatVersion({ ...v, patch: v.patch + 1, preid, prenum: 0 });
    case 'preminor':
      return formatVersion({ ...v, minor: v.minor + 1, patch: 0, preid, prenum: 0 });
    case 'premajor':
      return formatVersion({ ...v, major: v.major + 1, minor: 0, patch: 0, preid, prenum: 0 });
    case 'prerelease':
      if (v.preid !== null && v.prenum !== null) {
        return formatVersion({ ...v, prenum: v.prenum + 1 });
      }
      return formatVersion({ ...v, patch: v.patch + 1, preid, prenum: 0 });
    default:
      if (parseVersion(type)) {
        return type;
      }
      throw new Error(`Invalid version type: ${type}`);
  }
}

function isPrerelease(version) {
  return version.includes('-');
}

// ─── Changelog Generation ────────────────────────────────────────────────────

function getLastTag() {
  try {
    return exec('git describe --tags --abbrev=0 2>/dev/null');
  } catch {
    return null;
  }
}

function getCommitsSince(tag) {
  const range = tag ? `${tag}..HEAD` : 'HEAD';
  try {
    const log = exec(`git log ${range} --pretty=format:"%H|%s" --no-merges`);
    if (!log) return [];
    return log.split('\n').map((line) => {
      const [hash, ...rest] = line.split('|');
      return { hash: hash.slice(0, 7), message: rest.join('|') };
    });
  } catch {
    return [];
  }
}

function categorizeCommits(commits) {
  const categories = {
    feat: { title: 'Features', commits: [] },
    fix: { title: 'Bug Fixes', commits: [] },
    perf: { title: 'Performance', commits: [] },
    refactor: { title: 'Refactoring', commits: [] },
    docs: { title: 'Documentation', commits: [] },
    test: { title: 'Tests', commits: [] },
    chore: { title: 'Chores', commits: [] },
    other: { title: 'Other Changes', commits: [] },
  };

  for (const commit of commits) {
    const match = commit.message.match(/^(\w+)(?:\([^)]+\))?:\s*(.+)/);
    if (match) {
      const [, type, desc] = match;
      const category = categories[type] || categories.other;
      category.commits.push({ ...commit, description: desc });
    } else {
      categories.other.commits.push({ ...commit, description: commit.message });
    }
  }

  return categories;
}

function generateChangelogEntry(version, commits, lastTag) {
  const date = new Date().toISOString().split('T')[0];
  const categories = categorizeCommits(commits);
  const compareTag = lastTag || '0.0.0';

  let entry = `## [${version}](https://github.com/avs2001/ngx-com/compare/v${compareTag}...v${version}) (${date})\n\n`;

  for (const [, category] of Object.entries(categories)) {
    if (category.commits.length > 0) {
      entry += `### ${category.title}\n\n`;
      for (const commit of category.commits) {
        entry += `- ${commit.description} (${commit.hash})\n`;
      }
      entry += '\n';
    }
  }

  return entry;
}

function generateReleaseNotes(version, commits) {
  const categories = categorizeCommits(commits);
  let notes = '';

  for (const [, category] of Object.entries(categories)) {
    if (category.commits.length > 0) {
      notes += `## ${category.title}\n\n`;
      for (const commit of category.commits) {
        notes += `- ${commit.description} (${commit.hash})\n`;
      }
      notes += '\n';
    }
  }

  return notes || 'No notable changes.';
}

function updateChangelog(entry, dryRun) {
  const header = `# Changelog

All notable changes to this project will be documented in this file.

This changelog is auto-generated by the release script.

`;

  if (!existsSync(CHANGELOG_PATH)) {
    if (!dryRun) {
      writeFileSync(CHANGELOG_PATH, header + entry);
    }
    return;
  }

  const existing = readFileSync(CHANGELOG_PATH, 'utf-8');
  const versionMatch = existing.match(/^## \[/m);
  if (versionMatch) {
    const insertPoint = versionMatch.index;
    const before = existing.slice(0, insertPoint);
    const after = existing.slice(insertPoint);
    if (!dryRun) {
      writeFileSync(CHANGELOG_PATH, before + entry + after);
    }
  } else {
    if (!dryRun) {
      writeFileSync(CHANGELOG_PATH, existing + '\n' + entry);
    }
  }
}

// ─── Git Operations ──────────────────────────────────────────────────────────

function hasUncommittedChanges() {
  const status = exec('git status --porcelain');
  return status.length > 0;
}

function getCurrentBranch() {
  return exec('git rev-parse --abbrev-ref HEAD');
}

function stageFiles(files) {
  exec(`git add ${files.join(' ')}`);
}

function createCommit(version) {
  exec(`git commit -m "chore(release): v${version}"`);
}

function createTag(version) {
  exec(`git tag v${version}`);
}

function pushToOrigin() {
  execLive('git push origin HEAD --follow-tags');
}

function createGitHubRelease(version, notes, isPrerelease) {
  const prereleaseFlag = isPrerelease ? '--prerelease' : '';
  const notesEscaped = notes.replace(/"/g, '\\"').replace(/`/g, '\\`');

  execLive(`gh release create v${version} --title "v${version}" --notes "${notesEscaped}" ${prereleaseFlag}`);
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);

  // Parse options
  const dryRun = args.includes('--dry-run');
  const noPush = args.includes('--no-push');
  const helpFlag = args.includes('--help') || args.includes('-h');
  const preidArg = args.find((a) => a.startsWith('--preid='));
  const preid = preidArg ? preidArg.split('=')[1] : 'alpha';

  const positionalArgs = args.filter((a) => !a.startsWith('--') && !a.startsWith('-'));
  const versionArg = positionalArgs[0];

  if (helpFlag || !versionArg) {
    printHelp();
    process.exit(helpFlag ? 0 : 1);
  }

  // Preflight checks
  if (!noPush && !checkGhCli()) {
    console.error('Error: GitHub CLI (gh) is required for creating releases.');
    console.error('Install it from: https://cli.github.com/');
    console.error('Or use --no-push to skip pushing and release creation.');
    process.exit(1);
  }

  if (hasUncommittedChanges()) {
    console.error('Error: You have uncommitted changes. Please commit or stash them first.');
    process.exit(1);
  }

  const currentBranch = getCurrentBranch();
  if (currentBranch !== 'main' && !noPush) {
    console.warn(`Warning: You are on branch "${currentBranch}", not "main".`);
    const proceed = await ask('Continue anyway? [y/N] ');
    if (proceed !== 'y' && proceed !== 'yes') {
      console.log('Aborted. Switch to main branch first: git checkout main');
      process.exit(0);
    }
  }

  // Read current version
  const libPkg = readJson(LIB_PACKAGE_PATH);
  const currentVersion = libPkg.version;

  // Calculate new version
  let newVersion;
  try {
    newVersion = bumpVersion(currentVersion, versionArg, preid);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }

  // Get commits for changelog
  const lastTag = getLastTag();
  const commits = getCommitsSince(lastTag);
  const changelogEntry = generateChangelogEntry(newVersion, commits, lastTag);
  const releaseNotes = generateReleaseNotes(newVersion, commits);
  const isPre = isPrerelease(newVersion);

  // Show summary
  console.log('\n📦 Release Summary');
  console.log('─'.repeat(50));
  console.log(`  Version:     ${currentVersion} → ${newVersion}`);
  console.log(`  Tag:         v${newVersion}`);
  console.log(`  Prerelease:  ${isPre ? 'Yes' : 'No'}`);
  console.log(`  Commits:     ${commits.length} since ${lastTag || 'beginning'}`);
  console.log(`  Push:        ${noPush ? 'No (--no-push)' : 'Yes'}`);
  console.log('─'.repeat(50));
  console.log('\nChangelog entry:');
  console.log(changelogEntry);

  if (dryRun) {
    console.log('🔍 Dry run — no changes made.');
    console.log('\nTo perform the release, run without --dry-run');
    process.exit(0);
  }

  // Confirm
  const confirmMsg = noPush
    ? '\nCreate commit and tag locally? [y/N] '
    : '\nCreate release and publish to npm? [y/N] ';
  const answer = await ask(confirmMsg);
  if (answer !== 'y' && answer !== 'yes') {
    console.log('Aborted.');
    process.exit(0);
  }

  // Update version in library package.json
  console.log('\n📝 Updating version...');
  libPkg.version = newVersion;
  writeJson(LIB_PACKAGE_PATH, libPkg);

  // Update changelog
  console.log('📝 Updating changelog...');
  updateChangelog(changelogEntry, false);

  // Stage files
  console.log('📦 Staging files...');
  stageFiles(['projects/com/package.json', 'CHANGELOG.md']);

  // Create commit
  console.log('💾 Creating commit...');
  createCommit(newVersion);

  // Create tag
  console.log('🏷️  Creating tag...');
  createTag(newVersion);

  if (noPush) {
    console.log('\n✅ Release v' + newVersion + ' prepared locally!\n');
    console.log('Next steps:');
    console.log(`  1. Review:  git show HEAD`);
    console.log(`  2. Push:    git push origin HEAD --follow-tags`);
    console.log(`  3. Create release: gh release create v${newVersion} --title "v${newVersion}"\n`);
    process.exit(0);
  }

  // Push to origin
  console.log('🚀 Pushing to origin...');
  pushToOrigin();

  // Create GitHub Release
  console.log('📢 Creating GitHub Release...');
  createGitHubRelease(newVersion, releaseNotes, isPre);

  console.log('\n✅ Release v' + newVersion + ' published!\n');
  console.log('GitHub Actions will now:');
  console.log('  1. Run tests');
  console.log('  2. Build the library');
  console.log('  3. Publish to npm');
  console.log('\nWatch progress: https://github.com/avs2001/ngx-com/actions');
  console.log(`View release: https://github.com/avs2001/ngx-com/releases/tag/v${newVersion}\n`);
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
