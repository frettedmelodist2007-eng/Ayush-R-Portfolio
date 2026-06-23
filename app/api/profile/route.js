import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Load config from environment variables
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const GITHUB_TOKEN = process.env.ADMIN_GITHUB_TOKEN || process.env.GITHUB_TOKEN;
const REPO_OWNER = 'frettedmelodist2007-eng';
const REPO_NAME = 'Ayush-R-Portfolio';
const FILE_PATH = 'lib/profile.json';
const BRANCH = 'main';

export async function POST(request) {
  try {
    const { passcode, data } = await request.json();

    // 1. Authenticate passcode
    if (!passcode || passcode !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized: Invalid passcode.' }, { status: 401 });
    }

    // 2. Validate data structure
    if (!data || typeof data !== 'object') {
      return NextResponse.json({ error: 'Invalid data format.' }, { status: 400 });
    }

    const jsonString = JSON.stringify(data, null, 2);

    // 3. Save behavior based on environment
    const isDev = process.env.NODE_ENV === 'development';

    if (isDev) {
      // In local development, write directly to the disk for hot-reloading
      const absolutePath = path.join(process.cwd(), 'lib', 'profile.json');
      fs.writeFileSync(absolutePath, jsonString, 'utf-8');
      console.log(`[API] Saved profile data locally to ${absolutePath}`);
      return NextResponse.json({ message: 'Saved profile data locally successfully!' });
    } else {
      // In production (Vercel), commit to GitHub directly to trigger rebuild
      if (!GITHUB_TOKEN) {
        return NextResponse.json({ 
          error: 'GitHub Token is missing. Please set ADMIN_GITHUB_TOKEN or GITHUB_TOKEN environment variable in Vercel.' 
        }, { status: 500 });
      }

      console.log(`[API] Committing profile changes to GitHub repository ${REPO_OWNER}/${REPO_NAME}...`);

      // A. Fetch current file details to get its latest SHA
      const getFileUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}?ref=${BRANCH}`;
      const getResponse = await fetch(getFileUrl, {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'ayushr-portfolio-admin'
        },
        cache: 'no-store'
      });

      let currentSha = null;
      if (getResponse.ok) {
        const fileInfo = await getResponse.json();
        currentSha = fileInfo.sha;
      } else if (getResponse.status !== 404) {
        // If it's a 404, we assume the file doesn't exist and we will create it. Otherwise, error out.
        const errorText = await getResponse.text();
        throw new Error(`GitHub GET error (${getResponse.status}): ${errorText}`);
      }

      // B. Push/Commit updated file to GitHub
      const putFileUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;
      const putBody = {
        message: 'chore: update profile data via admin panel',
        content: Buffer.from(jsonString).toString('base64'),
        branch: BRANCH
      };

      if (currentSha) {
        putBody.sha = currentSha;
      }

      const putResponse = await fetch(putFileUrl, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'ayushr-portfolio-admin',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(putBody)
      });

      if (!putResponse.ok) {
        const errorText = await putResponse.text();
        throw new Error(`GitHub PUT error (${putResponse.status}): ${errorText}`);
      }

      console.log(`[API] Successfully committed profile changes to GitHub on branch ${BRANCH}.`);
      return NextResponse.json({ 
        message: 'Changes committed to GitHub successfully! A new deployment will launch shortly.' 
      });
    }
  } catch (error) {
    console.error('[API Error]:', error);
    return NextResponse.json({ error: error.message || 'Internal server error.' }, { status: 500 });
  }
}
