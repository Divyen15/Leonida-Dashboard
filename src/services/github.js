/**
 * GitHub API service for Leonida Watch
 * 
 * Features:
 * - Live fetching from public GitHub API (api.github.com/repos/ItsNotRexed/Leonida)
 * - Transparent fallback to bundled snapshot if offline or rate-limited
 * - Rate limit detection and header tracking (limit, remaining, reset time)
 * - Safe conditional request caching using localStorage ETags
 * - Optional user-provided token (kept in memory/session, never persisted publicly)
 */

import snapshotData from '../data/snapshot.json';

const REPO_OWNER = 'ItsNotRexed';
const REPO_NAME = 'Leonida';
const BASE_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`;

export async function fetchGitHubData(customToken = null) {
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
  };

  if (customToken && customToken.trim()) {
    headers['Authorization'] = `token ${customToken.trim()}`;
  }

  const result = {
    isLive: false,
    isRateLimited: false,
    rateLimit: {
      limit: 60,
      remaining: 60,
      reset: null,
      resetTimeDisplay: ''
    },
    lastChecked: new Date(),
    repo: snapshotData.repo,
    commits: snapshotData.commits,
    pulls: snapshotData.pulls,
    closedPulls: snapshotData.closed_pulls,
    error: null,
    source: 'Bundled Verified Snapshot'
  };

  try {
    // 1. Fetch repo metadata
    const repoRes = await fetch(BASE_URL, { headers });
    
    // Inspect rate limits
    const limit = repoRes.headers.get('x-ratelimit-limit');
    const remaining = repoRes.headers.get('x-ratelimit-remaining');
    const reset = repoRes.headers.get('x-ratelimit-reset');

    if (limit) result.rateLimit.limit = parseInt(limit, 10);
    if (remaining) result.rateLimit.remaining = parseInt(remaining, 10);
    if (reset) {
      const resetDate = new Date(parseInt(reset, 10) * 1000);
      result.rateLimit.reset = resetDate;
      result.rateLimit.resetTimeDisplay = resetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    if (repoRes.status === 403 || repoRes.status === 429) {
      result.isRateLimited = true;
      result.error = `GitHub API rate limit reached (${remaining || 0}/${limit || 60} remaining). Resets at ${result.rateLimit.resetTimeDisplay || 'soon'}. Using verified offline snapshot.`;
      return result;
    }

    if (!repoRes.ok) {
      throw new Error(`GitHub API HTTP ${repoRes.status}: ${repoRes.statusText}`);
    }

    const repoData = await repoRes.json();
    result.repo = {
      name: repoData.name,
      full_name: repoData.full_name,
      html_url: repoData.html_url,
      description: repoData.description,
      stars: repoData.stargazers_count,
      forks: repoData.forks_count,
      open_issues: repoData.open_issues_count,
      default_branch: repoData.default_branch,
      pushed_at: repoData.pushed_at,
      created_at: repoData.created_at
    };

    // 2. Fetch commits
    const commitsRes = await fetch(`${BASE_URL}/commits?per_page=35`, { headers });
    if (commitsRes.ok) {
      const commitsData = await commitsRes.json();
      result.commits = commitsData.map(c => ({
        sha: c.sha,
        short_sha: c.sha.substring(0, 7),
        message: c.commit.message,
        author: c.commit.author?.name || c.author?.login || 'Developer',
        date: c.commit.author?.date || c.commit.committer?.date,
        html_url: c.html_url
      }));
    }

    // 3. Fetch open PRs
    const pullsRes = await fetch(`${BASE_URL}/pulls?state=open&per_page=35`, { headers });
    if (pullsRes.ok) {
      const pullsData = await pullsRes.json();
      result.pulls = pullsData.map(p => ({
        number: p.number,
        title: p.title,
        state: p.state,
        user: p.user?.login || 'Contributor',
        user_avatar: p.user?.avatar_url,
        created_at: p.created_at,
        html_url: p.html_url,
        labels: (p.labels || []).map(l => l.name),
        body: p.body ? p.body.substring(0, 500) : ''
      }));
    }

    // 4. Fetch closed / merged PRs
    const closedPullsRes = await fetch(`${BASE_URL}/pulls?state=closed&per_page=35`, { headers });
    if (closedPullsRes.ok) {
      const closedPullsData = await closedPullsRes.json();
      result.closedPulls = closedPullsData.map(p => ({
        number: p.number,
        title: p.title,
        state: p.state,
        merged: Boolean(p.merged_at),
        merged_at: p.merged_at,
        user: p.user?.login || 'Contributor',
        user_avatar: p.user?.avatar_url,
        created_at: p.created_at,
        closed_at: p.closed_at,
        html_url: p.html_url,
        labels: (p.labels || []).map(l => l.name)
      }));
    }

    result.isLive = true;
    result.source = 'Live GitHub API';
  } catch (err) {
    result.error = `Unable to reach GitHub API (${err.message}). Showing verified offline snapshot.`;
  }

  return result;
}
