import { getGitHubClient } from '@/lib/github/client';

interface StrengthScore {
  name: string;
  score: number;
  description: string;
  evidence: string[];
}

export async function analyzeGitHubProfile(): Promise<StrengthScore[]> {
  const client = getGitHubClient();

  try {
    const [user, repos, contributions, languageStats] = await Promise.all([
      client.getUser(),
      client.getRepositories(),
      client.getContributions(),
      client.getLanguageStats(),
    ]);

    const strengths: StrengthScore[] = [];

    // 1. Technical Depth Analysis
    const technicalDepth = analyzeTechnicalDepth(repos, languageStats);
    strengths.push(technicalDepth);

    // 2. Execution Speed Analysis
    const executionSpeed = analyzeExecutionSpeed(repos, contributions);
    strengths.push(executionSpeed);

    // 3. OSS Contribution Analysis
    const ossContribution = analyzeOSSContribution(repos, user);
    strengths.push(ossContribution);

    // 4. Learning Speed Analysis
    const learningSpeed = analyzeLearningSpeed(repos, languageStats);
    strengths.push(learningSpeed);

    return strengths.sort((a, b) => b.score - a.score);
  } catch (error) {
    console.error('Error analyzing GitHub profile:', error);
    return [];
  }
}

function analyzeTechnicalDepth(repos: any[], languages: any[]): StrengthScore {
  const languageCount = languages.length;
  const complexRepos = repos.filter(
    (repo) => repo.size > 1000 || (repo.stargazers_count || 0) > 10
  ).length;
  const hasDocumentation = repos.filter((repo) => repo.has_wiki || repo.has_pages).length;

  const score = Math.min(
    100,
    (languageCount * 10 + complexRepos * 15 + hasDocumentation * 5) / 2
  );

  const evidence = [
    `${languageCount} programming languages mastered`,
    `${complexRepos} complex projects with significant codebases`,
    `${hasDocumentation} projects with comprehensive documentation`,
  ];

  return {
    name: 'Technical Depth',
    score: Math.round(score),
    description:
      'Demonstrates deep understanding of multiple technologies and complex system design',
    evidence,
  };
}

function analyzeExecutionSpeed(repos: any[], contributions: any): StrengthScore {
  const recentRepos = repos.filter((repo) => {
    const createdDate = new Date(repo.created_at);
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    return createdDate > sixMonthsAgo;
  }).length;

  const totalCommits = contributions?.totalCommitContributions || 0;
  const avgCommitsPerDay = totalCommits / 365;

  const score = Math.min(100, recentRepos * 15 + avgCommitsPerDay * 20);

  const evidence = [
    `${recentRepos} projects created in the last 6 months`,
    `${totalCommits.toLocaleString()} total commits this year`,
    `Average ${avgCommitsPerDay.toFixed(1)} commits per day`,
  ];

  return {
    name: 'Execution Speed',
    score: Math.round(score),
    description: 'Rapid development and consistent delivery of projects',
    evidence,
  };
}

function analyzeOSSContribution(repos: any[], user: any): StrengthScore {
  const publicRepos = repos.filter((repo) => !repo.private && !repo.fork).length;
  const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
  const totalForks = repos.reduce((sum, repo) => sum + (repo.forks_count || 0), 0);
  const followers = user.followers || 0;

  const score = Math.min(
    100,
    publicRepos * 5 + Math.min(totalStars, 100) + totalForks * 10 + followers * 2
  );

  const evidence = [
    `${publicRepos} public repositories`,
    `${totalStars.toLocaleString()} total stars received`,
    `${totalForks.toLocaleString()} times forked by others`,
    `${followers.toLocaleString()} GitHub followers`,
  ];

  return {
    name: 'Open Source Impact',
    score: Math.round(score),
    description: 'Active contributor with significant community impact',
    evidence,
  };
}

function analyzeLearningSpeed(repos: any[], languages: any[]): StrengthScore {
  const recentLanguages = new Set<string>();
  repos.forEach((repo) => {
    const createdDate = new Date(repo.created_at);
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    if (createdDate > threeMonthsAgo && repo.language) {
      recentLanguages.add(repo.language);
    }
  });

  const languageGrowthRate = (recentLanguages.size / Math.max(languages.length, 1)) * 100;
  const diversityScore = languages.length * 10;

  const score = Math.min(100, languageGrowthRate + diversityScore);

  const evidence = [
    `${recentLanguages.size} new technologies adopted in last 3 months`,
    `${languages.length} total languages in tech stack`,
    `${languageGrowthRate.toFixed(0)}% growth rate in technology adoption`,
  ];

  return {
    name: 'Learning Speed',
    score: Math.round(score),
    description: 'Rapid acquisition of new technologies and skills',
    evidence,
  };
}

export function generateBrandingStatement(strengths: StrengthScore[]): string {
  const topStrength = strengths[0];
  if (!topStrength) {
    return 'A passionate developer building world-class products';
  }

  const statements = {
    'Technical Depth':
      'An expert developer with deep technical knowledge across multiple domains',
    'Execution Speed': 'A high-velocity developer who ships quality code consistently',
    'Open Source Impact':
      'An influential open source contributor making a significant community impact',
    'Learning Speed': 'A fast learner who rapidly adapts to new technologies and challenges',
  };

  return statements[topStrength.name as keyof typeof statements] || statements['Technical Depth'];
}
