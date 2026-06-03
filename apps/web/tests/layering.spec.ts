import { test, expect } from '@playwright/test';

test.describe('3D Scene Layering', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('3D Canvas is present and has correct styling', async ({ page }) => {
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();

    // Check for fixed positioning and z-index via computed styles
    const styles = await canvas.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        position: computed.position,
        zIndex: computed.zIndex,
        pointerEvents: computed.pointerEvents,
      };
    });

    expect(styles.position).toBe('fixed');
    expect(styles.zIndex).toBe('10');
    expect(styles.pointerEvents).toBe('none');
  });

  test('AILA model is rendered (via R3F data attributes if available)', async ({ page }) => {
    // This is a basic check. R3F doesn't always expose easy DOM hooks for meshes,
    // but we can check if the canvas is drawing something or has specific attributes we might add.
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();
  });
});
