#!/usr/bin/env tsx

import fs from 'fs/promises';
import path from 'path';
import { Octokit } from '@octokit/rest';

interface Config {
  github: {
    username: string;
    token?: string;
  };
  personal: {
    name: string;
    occupation: string;
    bio: string;
    skills: string[];
  };
}

async function loadConfig(): Promise<Config> {
  try {
    const configPath = path.join(process.cwd(), 'config.json');
    const configContent = await fs.readFile(configPath, 'utf-8');
    return JSON.parse(configContent);
  } catch (error) {
    // Use environment variables as fallback
    return {
      github: {
        username: process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'octocat',
        token: process.env.GITHUB_TOKEN,
      },
      personal: {
        name: process.env.NEXT_PUBLIC_NAME || 'Developer',
        occupation: process.env.NEXT_PUBLIC_OCCUPATION || 'Full Stack Developer',
        bio: process.env.NEXT_PUBLIC_BIO || 'Building world-class products',
        skills: ['React', 'TypeScript', 'Node.js'],
      },
    };
  }
}

async function fetchGitHubData(config: Config) {
  const octokit = new Octokit({ auth: config.github.token });
  const username = config.github.username;

  const [user, repos] = await Promise.all([
    octokit.users.getByUsername({ username }),
    octokit.repos.listForUser({ username, per_page: 100 }),
  ]);

  const totalStars = repos.data.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
  const topLanguages = new Map<string, number>();

  repos.data.forEach((repo) => {
    if (repo.language) {
      topLanguages.set(repo.language, (topLanguages.get(repo.language) || 0) + 1);
    }
  });

  const sortedLanguages = Array.from(topLanguages.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return {
    user: user.data,
    repos: repos.data,
    totalStars,
    topLanguages: sortedLanguages,
  };
}

function generateReadme(config: Config, githubData: any): string {
  const { totalStars, topLanguages } = githubData;

  return `# Hi there, I'm ${config.personal.name}! 👋

## ${config.personal.occupation}

${config.personal.bio}

---

## 📊 GitHub Stats

![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${config.github.username}&show_icons=true&theme=radical&hide_border=true&bg_color=0D1117&title_color=3B82F6&icon_color=3B82F6&text_color=FFFFFF)

![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user=${config.github.username}&theme=radical&hide_border=true&background=0D1117&stroke=3B82F6&ring=3B82F6&fire=F59E0B&currStreakLabel=3B82F6)

---

## 🏆 GitHub Trophies

![GitHub Trophies](https://github-profile-trophy.vercel.app/?username=${config.github.username}&theme=radical&no-frame=true&no-bg=true&column=4&row=2)

---

## 💻 Top Technologies

${topLanguages.map(([lang, count]) => `![${lang}](https://img.shields.io/badge/${lang}-${count}_repos-3B82F6?style=for-the-badge&logo=${lang.toLowerCase()}&logoColor=white)`).join('  \n')}

---

## 🚀 Skills

${config.personal.skills.map((skill) => `![${skill}](https://img.shields.io/badge/${skill.replace(' ', '_')}-Expert-3B82F6?style=flat-square&logo=${skill.toLowerCase().replace(' ', '')}&logoColor=white)`).join('  \n')}

---

## 📈 Activity Graph

![GitHub Activity Graph](https://github-readme-activity-graph.vercel.app/graph?username=${config.github.username}&theme=react-dark&hide_border=true&bg_color=0D1117&color=3B82F6&line=3B82F6&point=FFFFFF)

---

## 📫 Connect with Me

[![GitHub](https://img.shields.io/badge/GitHub-${config.github.username}-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/${config.github.username})
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-3B82F6?style=for-the-badge&logo=google-chrome&logoColor=white)](https://${config.github.username}.github.io/world-class-github-profile)

---

## 💡 Quote of the Day

![Quote](https://quotes-github-readme.vercel.app/api?type=horizontal&theme=radical)

---

<div align="center">
  <img src="https://komarev.com/ghpvc/?username=${config.github.username}&color=3B82F6&style=flat-square&label=Profile+Views" alt="Profile Views" />
</div>

<div align="center">
  <sub>Built with ❤️ using <a href="https://github.com/world-class-product-engine">World-Class Product Engine</a></sub>
</div>
`;
}

async function main() {
  try {
    console.log('🚀 Generating README.md...');

    const config = await loadConfig();
    console.log(`📝 Using GitHub username: ${config.github.username}`);

    const githubData = await fetchGitHubData(config);
    console.log('✅ Fetched GitHub data successfully');

    const readme = generateReadme(config, githubData);
    await fs.writeFile(path.join(process.cwd(), 'README.md'), readme, 'utf-8');

    console.log('✨ README.md generated successfully!');
    console.log('📍 Location: README.md');
  } catch (error: any) {
    console.error('❌ Error generating README:', error.message);
    process.exit(1);
  }
}

main();
