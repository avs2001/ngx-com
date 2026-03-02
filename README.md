# ngx-com

Angular component library built with Angular 21+ and Tailwind CSS.

[![npm version](https://img.shields.io/npm/v/ngx-com.svg)](https://www.npmjs.com/package/ngx-com)
[![CI](https://github.com/avs2001/ngx-com/actions/workflows/ci.yml/badge.svg)](https://github.com/avs2001/ngx-com/actions/workflows/ci.yml)

## Installation

```bash
npm install ngx-com
```

## Requirements

- Angular 21.0.0 or higher
- Node.js 22 or higher

## Documentation

View the live demo and documentation at: https://avs2001.github.io/ngx-com/

## Development

### Prerequisites

```bash
# Use the correct Node version
nvm use

# Install dependencies
npm install
```

### Available Scripts

#### Library Development

| Script | Description |
|--------|-------------|
| `npm run lib:build` | Build the library for production |
| `npm run lib:build:watch` | Build the library in watch mode |
| `npm run lib:test` | Run library unit tests |
| `npm run lib:test:ci` | Run library tests in CI mode (no watch) |
| `npm run lib:pack` | Create a tarball of the built library |

#### Demo Application

| Script | Description |
|--------|-------------|
| `npm run demo:serve` | Start the demo app dev server (port 4500) |
| `npm run demo:build` | Build the demo app for production |
| `npm start` | Alias for `demo:serve` |

#### Testing

| Script | Description |
|--------|-------------|
| `npm test` | Run all tests |
| `npm run e2e` | Run end-to-end tests |
| `npm run e2e:ui` | Run e2e tests with Playwright UI |
| `npm run e2e:headed` | Run e2e tests in headed mode |
| `npm run e2e:debug` | Debug e2e tests |

#### CI Shortcuts

| Script | Description |
|--------|-------------|
| `npm run ci` | Build and test the library |
| `npm run ci:full` | Build and test library + build demo app |

### Project Structure

```
ngx-com/
├── projects/
│   ├── com/              # Component library source
│   │   ├── src/
│   │   ├── package.json  # Library package.json (published to npm)
│   │   └── ng-package.json
│   └── integration/      # Demo/docs application
├── dist/
│   └── com/              # Built library output
├── scripts/
│   ├── release.mjs       # Version bump and changelog
│   └── publish.mjs       # Build and publish to npm
└── .github/workflows/    # CI/CD pipelines
```

## Releasing

Releases are automated via GitHub Actions. When you push a version tag, the workflow builds, tests, and publishes to npm.

### Cutting a Release

1. **Ensure you're on `main` with a clean working tree:**
   ```bash
   git checkout main
   git pull origin main
   git status  # Should show "nothing to commit"
   ```

2. **Run the release script:**
   ```bash
   # Patch release (0.0.1 -> 0.0.2)
   npm run release:patch

   # Minor release (0.0.1 -> 0.1.0)
   npm run release:minor

   # Major release (0.0.1 -> 1.0.0)
   npm run release:major

   # Prerelease (0.0.1 -> 0.0.2-alpha.0)
   npm run release:pre
   ```

   The script will:
   - Bump the version in `projects/com/package.json`
   - Update `CHANGELOG.md` with commits since last tag
   - Create a commit: `chore(release): vX.Y.Z`
   - Create a tag: `vX.Y.Z`

3. **Review and push:**
   ```bash
   # Review the commit
   git show HEAD

   # Push to trigger the release workflow
   git push && git push --tags
   ```

4. **GitHub Actions will:**
   - Run tests
   - Build the library
   - Publish to npm with provenance
   - Create a GitHub Release with auto-generated notes

### Local Publish (for testing)

Before pushing a release, you can verify locally:

```bash
# Dry run - shows what would be published
npm run publish:dry

# Actually publish (requires npm auth)
npm run publish:lib

# Publish a prerelease to "next" tag
npm run publish:lib -- --tag=next
```

### Prerelease Versions

For alpha/beta releases:

```bash
# Create a prerelease
node scripts/release.mjs premajor --preid=beta
# Results in: 1.0.0-beta.0

# Bump the prerelease number
node scripts/release.mjs prerelease
# Results in: 1.0.0-beta.1

# Publish to "next" tag (not "latest")
npm run publish:lib -- --tag=next
```

## CI/CD

### Workflows

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `ci.yml` | Push to main, PRs | Test, build, deploy demo to GitHub Pages |
| `pr.yml` | Pull requests | Validate commits, check bundle size |
| `release.yml` | Tags `v*` | Publish to npm, create GitHub Release |

### GitHub Pages

The demo app is automatically deployed to GitHub Pages on every push to `main`:
- URL: https://avs2001.github.io/ngx-com/
- No manual deployment needed

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm run ci`)
5. Commit using conventional commits (`feat: add amazing feature`)
6. Push and create a Pull Request

## License

MIT
