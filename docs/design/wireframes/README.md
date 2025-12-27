# SpokeToWork Wireframes

Visual blueprint documentation for the SpokeToWork MVP.

## Viewing Wireframes

Open `index.html` in a browser to view all wireframes with navigation.

### Features
- Sidebar with clickable index (all 17 wireframes grouped by feature)
- Previous/Next navigation buttons
- Keyboard navigation (Left/Right arrow keys)
- Dark theme for contrast with light SVG backgrounds

## Wireframe Structure

```
00-app-shell/           Desktop and mobile layouts
01-company-tracking/    List view, add form, detail panel
02-home-location/       Onboarding and settings
03-shared-registry/     Browse, contribute, duplicate detection
04-route-planning/      Route list, builder, directions
05-employer-features/   Dashboard, claim flow, job posting
06-component-library.svg All UI components
```

## Running Playwright Tests

The tests validate SVG loading and navigation. They require Playwright system dependencies.

### Setup (WSL/Linux)

```bash
# Install npm dependencies
npm install

# Install Playwright browsers
npx playwright install chromium

# Install system dependencies (requires sudo)
sudo npx playwright install-deps chromium

# Run tests
npm test
```

### Setup (macOS)

```bash
npm install
npx playwright install chromium
npm test
```

### Test Output

- Screenshots saved to `./screenshots/`
- HTML report generated to `./playwright-report/`
