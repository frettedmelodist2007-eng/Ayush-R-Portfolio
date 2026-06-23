const fs = require('fs');
const path = require('path');

const USERNAME = 'frettedmelodist2007-eng';
const OUTPUT_PATH = path.join(__dirname, '..', 'lib', 'projects.json');

async function syncProjects() {
  console.log(`Starting GitHub projects sync for user: ${USERNAME}...`);

  const headers = {
    'User-Agent': 'github-portfolio-sync-script'
  };

  // Use GITHUB_TOKEN if available in environment (e.g., in GitHub Actions) to bypass rate limit
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    console.log('Using GITHUB_TOKEN for authentication.');
  }

  try {
    // Fetch all public repos for the user
    // Per page limit is set to 100 to make sure we grab all public projects
    const response = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100&type=owner`,
      { headers }
    );

    if (!response.ok) {
      throw new Error(`GitHub API returned status ${response.status}: ${response.statusText}`);
    }

    const repos = await response.json();
    console.log(`Fetched ${repos.length} repositories from GitHub.`);

    // Filter and map repositories
    const formattedProjects = repos
      .filter(repo => !repo.fork) // Exclude forks
      .map(repo => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        language: repo.language || 'Unknown',
        html_url: repo.html_url,
        homepage: repo.homepage,
        stargazers_count: repo.stargazers_count,
        updated_at: repo.updated_at,
        pushed_at: repo.pushed_at
      }))
      // Sort by pushed_at descending (most recently active project first)
      .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));

    console.log(`Processed ${formattedProjects.length} original (non-fork) repositories.`);

    // Ensure output directory exists
    const dir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Write projects data to JSON file
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(formattedProjects, null, 2), 'utf-8');
    console.log(`Successfully saved project data to ${OUTPUT_PATH}`);
  } catch (error) {
    console.error('Error syncing projects:', error);
    process.exit(1);
  }
}

syncProjects();
