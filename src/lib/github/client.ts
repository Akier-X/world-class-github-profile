import { Octokit } from '@octokit/rest';
import { graphql } from '@octokit/graphql';
import { getConfig } from '@/config';

class GitHubClient {
  private octokit: Octokit;
  private graphqlClient: typeof graphql;
  private username: string;

  constructor() {
    const config = getConfig();
    this.username = config.github.username;

    this.octokit = new Octokit({
      auth: config.github.token,
    });

    this.graphqlClient = graphql.defaults({
      headers: {
        authorization: config.github.token ? `token ${config.github.token}` : '',
      },
    });
  }

  async getUser() {
    try {
      const { data } = await this.octokit.users.getByUsername({
        username: this.username,
      });
      return data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  async getRepositories() {
    try {
      const { data } = await this.octokit.repos.listForUser({
        username: this.username,
        sort: 'updated',
        per_page: 100,
      });
      return data;
    } catch (error) {
      console.error('Error fetching repositories:', error);
      throw error;
    }
  }

  async getContributions(from?: string, to?: string) {
    try {
      const query = `
        query($username: String!, $from: DateTime, $to: DateTime) {
          user(login: $username) {
            contributionsCollection(from: $from, to: $to) {
              totalCommitContributions
              totalIssueContributions
              totalPullRequestContributions
              totalPullRequestReviewContributions
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }
      `;

      const response: any = await this.graphqlClient(query, {
        username: this.username,
        from: from || new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
        to: to || new Date().toISOString(),
      });

      return response.user.contributionsCollection;
    } catch (error) {
      console.error('Error fetching contributions:', error);
      throw error;
    }
  }

  async getLanguageStats() {
    try {
      const repos = await this.getRepositories();
      const languageStats: Record<string, number> = {};

      for (const repo of repos) {
        if (repo.language) {
          languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
        }
      }

      return Object.entries(languageStats)
        .map(([language, count]) => ({ language, count }))
        .sort((a, b) => b.count - a.count);
    } catch (error) {
      console.error('Error fetching language stats:', error);
      throw error;
    }
  }

  async getEvents(page = 1, perPage = 30) {
    try {
      const { data } = await this.octokit.activity.listPublicEventsForUser({
        username: this.username,
        page,
        per_page: perPage,
      });
      return data;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  }

  async getStars() {
    try {
      const repos = await this.getRepositories();
      return repos.reduce((total, repo) => total + (repo.stargazers_count || 0), 0);
    } catch (error) {
      console.error('Error calculating stars:', error);
      throw error;
    }
  }

  async getFollowers() {
    try {
      const user = await this.getUser();
      return user.followers || 0;
    } catch (error) {
      console.error('Error fetching followers:', error);
      throw error;
    }
  }

  async getProfileReadme() {
    try {
      const { data } = await this.octokit.repos.getReadme({
        owner: this.username,
        repo: this.username,
      });
      return Buffer.from(data.content, 'base64').toString('utf-8');
    } catch (error) {
      return null;
    }
  }
}

let clientInstance: GitHubClient | null = null;

export function getGitHubClient(): GitHubClient {
  if (!clientInstance) {
    clientInstance = new GitHubClient();
  }
  return clientInstance;
}

export default GitHubClient;
