import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock environment variables
process.env.NEXT_PUBLIC_GITHUB_USERNAME = 'test-user';
process.env.NEXT_PUBLIC_NAME = 'Test User';
process.env.NEXT_PUBLIC_OCCUPATION = 'Test Developer';
process.env.NEXT_PUBLIC_BIO = 'Test bio';
