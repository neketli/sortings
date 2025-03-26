import type { PlaywrightTestConfig } from '@playwright/test'
import { devices } from '@playwright/test'

const config: PlaywrightTestConfig = {
  testDir: './tests/e2e',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    actionTimeout: 0,
    baseURL: process.env.CI ? 'http://localhost:5173/sortings' : 'http://localhost:5173',
    trace: 'on-first-retry',
    headless: !!process.env.CI,
  },
  webServer: {
    command: process.env.CI ? 'vite preview --port 5173' : 'vite dev',
    port: 5173,
    reuseExistingServer: !process.env.CI,
    timeout: 30 * 1000
  },
  projects: [
    {
      name: 'Desktop',
      use: {
        browserName: 'chromium',
        ...devices['Desktop Chrome'],
      },
    },
  ],
}

export default config
