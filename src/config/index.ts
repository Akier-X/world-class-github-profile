export interface Config {
  github: {
    username: string;
    token?: string;
  };
  personal: {
    name: string;
    occupation: string;
    bio: string;
    skills: string[];
    location?: string;
    email?: string;
    website?: string;
  };
  social?: {
    twitter?: string;
    linkedin?: string;
    blog?: string;
  };
  preferences: {
    theme: 'dark' | 'light';
    primaryColor: string;
    showEmail: boolean;
    showLocation: boolean;
    pinnedRepos?: string[];
    excludeRepos?: string[];
    highlightLanguages?: string[];
  };
  features: {
    readmeGenerator: boolean;
    dashboard: boolean;
    portfolio: boolean;
    aiBranding: boolean;
    realTimeActivity: boolean;
    blogIntegration: boolean;
    '3dAnimations': boolean;
    darkMode: boolean;
  };
}

const DEFAULT_CONFIG: Config = {
  github: {
    username: process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'octocat',
    token: process.env.GITHUB_TOKEN,
  },
  personal: {
    name: process.env.NEXT_PUBLIC_NAME || 'Developer',
    occupation: process.env.NEXT_PUBLIC_OCCUPATION || 'Full Stack Developer',
    bio: process.env.NEXT_PUBLIC_BIO || 'Building world-class products',
    skills: ['React', 'TypeScript', 'Node.js'],
    location: process.env.NEXT_PUBLIC_LOCATION,
    email: process.env.NEXT_PUBLIC_EMAIL,
    website: process.env.NEXT_PUBLIC_WEBSITE,
  },
  social: {
    twitter: process.env.NEXT_PUBLIC_TWITTER,
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN,
    blog: process.env.NEXT_PUBLIC_BLOG,
  },
  preferences: {
    theme: 'dark',
    primaryColor: process.env.NEXT_PUBLIC_PRIMARY_COLOR || '#3B82F6',
    showEmail: false,
    showLocation: true,
    pinnedRepos: [],
    excludeRepos: [],
    highlightLanguages: [],
  },
  features: {
    readmeGenerator: true,
    dashboard: true,
    portfolio: true,
    aiBranding: true,
    realTimeActivity: process.env.NEXT_PUBLIC_ENABLE_REALTIME === 'true',
    blogIntegration: process.env.NEXT_PUBLIC_ENABLE_BLOG === 'true',
    '3dAnimations': process.env.NEXT_PUBLIC_ENABLE_3D === 'true',
    darkMode: true,
  },
};

let config: Config = DEFAULT_CONFIG;

export function loadConfig(): Config {
  if (typeof window !== 'undefined') {
    try {
      const configJson = localStorage.getItem('github-profile-config');
      if (configJson) {
        const userConfig = JSON.parse(configJson);
        config = { ...DEFAULT_CONFIG, ...userConfig };
      }
    } catch (error) {
      console.error('Failed to load config from localStorage:', error);
    }
  }
  return config;
}

export function saveConfig(newConfig: Partial<Config>): void {
  if (typeof window !== 'undefined') {
    config = { ...config, ...newConfig };
    localStorage.setItem('github-profile-config', JSON.stringify(config));
  }
}

export function getConfig(): Config {
  return config;
}

export default DEFAULT_CONFIG;
