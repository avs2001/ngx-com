#!/usr/bin/env node

/**
 * Publish script for ngx-com library
 *
 * Builds the library and publishes to npm.
 * Useful for local verification before pushing tags.
 *
 * Usage:
 *   node scripts/publish.mjs [options]
 *
 * Options:
 *   --dry-run    Build and pack without publishing
 *   --tag=X      npm dist-tag (default: "latest", use "next" for prereleases)
 *   --otp=X      One-time password for npm 2FA
 *   --yes        Skip confirmation prompt
 *   --help       Show this help message
 */

import { existsSync, readdirSync, statSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { createInterface } from 'node:readline';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST_PATH = join(ROOT, 'dist/com');

// ─── Helpers ─────────────────────────────────────────────────────────────────

function exec(cmd, options = {}) {
  return execSync(cmd, {
    cwd: ROOT,
    encoding: 'utf-8',
    stdio: options.silent ? 'pipe' : 'inherit',
    ...options,
  });
}

function execSilent(cmd) {
  return execSync(cmd, { cwd: ROOT, encoding: 'utf-8' }).trim();
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

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

function getDirectorySize(dirPath) {
  let size = 0;
  const files = readdirSync(dirPath, { withFileTypes: true });
  for (const file of files) {
    const filePath = join(dirPath, file.name);
    if (file.isDirectory()) {
      size += getDirectorySize(filePath);
    } else {
      size += statSync(filePath).size;
    }
  }
  return size;
}

function printHelp() {
  console.log(`
Usage: node scripts/publish.mjs [options]

Options:
  --dry-run    Build and show what would be published (no actual publish)
  --tag=X      npm dist-tag (default: "latest")
               Use "next" for prereleases, "beta" for beta versions
  --otp=X      One-time password for npm 2FA
  --yes        Skip confirmation prompt
  --help       Show this help message

Examples:
  node scripts/publish.mjs --dry-run
  node scripts/publish.mjs --tag=next
  node scripts/publish.mjs --otp=123456 --yes

Notes:
  - The library is built fresh before every publish
  - Use --dry-run first to verify the package contents
  - For prereleases, always use --tag=next to avoid overwriting latest
`);
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);

  // Parse options
  const dryRun = args.includes('--dry-run');
  const skipConfirm = args.includes('--yes') || args.includes('-y');
  const helpFlag = args.includes('--help') || args.includes('-h');

  const tagArg = args.find((a) => a.startsWith('--tag='));
  const tag = tagArg ? tagArg.split('=')[1] : 'latest';

  const otpArg = args.find((a) => a.startsWith('--otp='));
  const otp = otpArg ? otpArg.split('=')[1] : null;

  if (helpFlag) {
    printHelp();
    process.exit(0);
  }

  console.log('\n📦 ngx-com Publish Script\n');

  // Step 1: Build the library
  console.log('🔨 Building library...\n');
  try {
    exec('npm run build:lib');
  } catch (err) {
    console.error('\n❌ Build failed');
    process.exit(1);
  }

  // Verify build output exists
  if (!existsSync(DIST_PATH)) {
    console.error(`\n❌ Build output not found at ${DIST_PATH}`);
    process.exit(1);
  }

  const distPackagePath = join(DIST_PATH, 'package.json');
  if (!existsSync(distPackagePath)) {
    console.error(`\n❌ package.json not found in ${DIST_PATH}`);
    process.exit(1);
  }

  // Read package info
  const pkg = JSON.parse(execSilent(`cat "${distPackagePath}"`));
  const version = pkg.version;
  const name = pkg.name;
  const isPrerelease = version.includes('-');

  // Warn if publishing prerelease to latest
  if (isPrerelease && tag === 'latest') {
    console.log('⚠️  Warning: Publishing a prerelease version to "latest" tag.');
    console.log('   Consider using --tag=next instead.\n');
  }

  // Step 2: Show package info
  console.log('\n📋 Package Info');
  console.log('─'.repeat(50));
  console.log(`  Name:     ${name}`);
  console.log(`  Version:  ${version}`);
  console.log(`  Tag:      ${tag}`);
  console.log(`  Size:     ${formatBytes(getDirectorySize(DIST_PATH))}`);
  console.log('─'.repeat(50));

  // Step 3: Run npm pack --dry-run to show contents
  console.log('\n📦 Package contents (npm pack --dry-run):\n');
  try {
    exec('npm pack --dry-run', { cwd: DIST_PATH });
  } catch {
    // npm pack --dry-run might fail on some versions, continue anyway
  }

  if (dryRun) {
    console.log('\n🔍 Dry run — no publish performed.');
    console.log('\nTo publish, run without --dry-run');
    process.exit(0);
  }

  // Step 4: Confirm
  if (!skipConfirm) {
    const answer = await ask(`\nPublish ${name}@${version} to npm with tag "${tag}"? [y/N] `);
    if (answer !== 'y' && answer !== 'yes') {
      console.log('Aborted.');
      process.exit(0);
    }
  }

  // Step 5: Publish
  console.log('\n🚀 Publishing to npm...\n');

  let publishCmd = `npm publish --tag ${tag} --access public`;
  if (otp) {
    publishCmd += ` --otp ${otp}`;
  }

  try {
    exec(publishCmd, { cwd: DIST_PATH });
    console.log(`\n✅ Successfully published ${name}@${version} with tag "${tag}"!\n`);
    console.log(`View on npm: https://www.npmjs.com/package/${name}\n`);
  } catch (err) {
    console.error('\n❌ Publish failed');
    console.error('If 2FA is enabled, try again with --otp=XXXXXX');
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
