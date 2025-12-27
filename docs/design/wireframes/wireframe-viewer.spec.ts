import { test, expect } from '@playwright/test';
import * as path from 'path';

const wireframes = [
  { path: '00-app-shell/desktop-layout.svg', title: 'Desktop Layout' },
  { path: '00-app-shell/mobile-layout.svg', title: 'Mobile Layout' },
  { path: '01-company-tracking/list-view.svg', title: 'List View' },
  { path: '01-company-tracking/add-company.svg', title: 'Add Company' },
  { path: '01-company-tracking/detail-panel.svg', title: 'Detail Panel' },
  { path: '02-home-location/onboarding-prompt.svg', title: 'Onboarding Prompt' },
  { path: '02-home-location/settings-update.svg', title: 'Settings Update' },
  { path: '03-shared-registry/browse-filter.svg', title: 'Browse Filter' },
  { path: '03-shared-registry/contribute-flow.svg', title: 'Contribute Flow' },
  { path: '03-shared-registry/duplicate-warning.svg', title: 'Duplicate Warning' },
  { path: '04-route-planning/route-list.svg', title: 'Route List' },
  { path: '04-route-planning/create-route.svg', title: 'Create Route' },
  { path: '04-route-planning/directions-view.svg', title: 'Directions View' },
  { path: '05-employer-features/dashboard.svg', title: 'Dashboard' },
  { path: '05-employer-features/claim-company.svg', title: 'Claim Company' },
  { path: '05-employer-features/post-job.svg', title: 'Post Job' },
  { path: '06-component-library.svg', title: 'Component Library' },
];

test.describe('Wireframe Viewer', () => {
  let consoleErrors: string[] = [];

  test.beforeEach(async ({ page }) => {
    consoleErrors = [];

    // Capture console errors
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Navigate to viewer
    const indexPath = path.resolve(__dirname, 'index.html');
    await page.goto(`file://${indexPath}`);
  });

  test('loads without console errors', async ({ page }) => {
    // Wait for viewer to load
    await page.waitForSelector('#viewer');
    await page.waitForTimeout(500);

    // Check no errors
    expect(consoleErrors).toHaveLength(0);
  });

  test('displays correct initial state', async ({ page }) => {
    // Check title
    await expect(page.locator('#current-info .title')).toHaveText('Desktop Layout');
    await expect(page.locator('#current-info .counter')).toHaveText('1 / 17');

    // Previous should be disabled
    await expect(page.locator('#prev')).toBeDisabled();

    // Next should be enabled
    await expect(page.locator('#next')).toBeEnabled();
  });

  test('next button navigates forward', async ({ page }) => {
    const nextBtn = page.locator('#next');

    // Click next
    await nextBtn.click();

    // Should show second wireframe
    await expect(page.locator('#current-info .title')).toHaveText('Mobile Layout');
    await expect(page.locator('#current-info .counter')).toHaveText('2 / 17');

    // Previous should now be enabled
    await expect(page.locator('#prev')).toBeEnabled();
  });

  test('previous button navigates backward', async ({ page }) => {
    // First navigate forward
    await page.locator('#next').click();
    await expect(page.locator('#current-info .counter')).toHaveText('2 / 17');

    // Then navigate back
    await page.locator('#prev').click();
    await expect(page.locator('#current-info .counter')).toHaveText('1 / 17');
    await expect(page.locator('#current-info .title')).toHaveText('Desktop Layout');
  });

  test('sidebar links navigate to correct wireframes', async ({ page }) => {
    // Click a specific sidebar link
    await page.click('a[data-svg="04-route-planning/create-route.svg"]');

    // Should update to that wireframe
    await expect(page.locator('#current-info .title')).toHaveText('Create Route');
    await expect(page.locator('#current-info .counter')).toHaveText('12 / 17');

    // Link should be active
    await expect(
      page.locator('a[data-svg="04-route-planning/create-route.svg"]')
    ).toHaveClass(/active/);
  });

  test('keyboard navigation works', async ({ page }) => {
    // Press right arrow
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#current-info .counter')).toHaveText('2 / 17');

    // Press left arrow
    await page.keyboard.press('ArrowLeft');
    await expect(page.locator('#current-info .counter')).toHaveText('1 / 17');
  });

  test('last wireframe disables next button', async ({ page }) => {
    // Navigate to last wireframe via sidebar
    await page.click('a[data-svg="06-component-library.svg"]');

    // Next should be disabled
    await expect(page.locator('#next')).toBeDisabled();

    // Previous should be enabled
    await expect(page.locator('#prev')).toBeEnabled();
  });
});

test.describe('Wireframe Screenshots', () => {
  test('captures all wireframes for visual review', async ({ page }) => {
    const indexPath = path.resolve(__dirname, 'index.html');
    await page.goto(`file://${indexPath}`);

    for (let i = 0; i < wireframes.length; i++) {
      const wf = wireframes[i];

      // Navigate via sidebar
      await page.click(`a[data-svg="${wf.path}"]`);

      // Wait for SVG to load
      await page.waitForTimeout(300);

      // Take screenshot
      const safeName = wf.path.replace(/\//g, '-').replace('.svg', '');
      await page.screenshot({
        path: `./screenshots/${safeName}.png`,
        fullPage: false,
      });
    }
  });
});

test.describe('SVG XML Validation', () => {
  test('all SVGs load without XML parsing errors', async ({ page }) => {
    const errors: string[] = [];

    // Listen for errors
    page.on('console', (msg) => {
      if (msg.type() === 'error' && msg.text().includes('XML')) {
        errors.push(msg.text());
      }
    });

    const indexPath = path.resolve(__dirname, 'index.html');
    await page.goto(`file://${indexPath}`);

    // Navigate through all wireframes
    for (let i = 0; i < wireframes.length; i++) {
      const wf = wireframes[i];
      await page.click(`a[data-svg="${wf.path}"]`);
      await page.waitForTimeout(200);
    }

    // No XML errors should have occurred
    expect(errors).toHaveLength(0);
  });
});
