import { describe, it, expect, beforeEach } from 'vitest';
import { loadConfig, getConfig, saveConfig } from '@/config';

describe('Config System', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should load default config', () => {
    const config = loadConfig();
    expect(config).toBeDefined();
    expect(config.github).toBeDefined();
    expect(config.personal).toBeDefined();
    expect(config.preferences).toBeDefined();
    expect(config.features).toBeDefined();
  });

  it('should have correct default values', () => {
    const config = getConfig();
    expect(config.github.username).toBe('test-user');
    expect(config.personal.name).toBe('Test User');
    expect(config.preferences.theme).toBe('dark');
    expect(config.features.darkMode).toBe(true);
  });

  it('should save and load user config from localStorage', () => {
    const customConfig = {
      github: { username: 'custom-user' },
      personal: { name: 'Custom Name' },
    };

    saveConfig(customConfig as any);
    const loaded = loadConfig();

    expect(loaded.github.username).toBe('custom-user');
    expect(loaded.personal.name).toBe('Custom Name');
  });

  it('should handle missing localStorage gracefully', () => {
    expect(() => loadConfig()).not.toThrow();
  });
});
