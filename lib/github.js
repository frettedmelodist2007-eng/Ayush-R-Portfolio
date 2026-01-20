"use strict";

export async function getRepos() {
    const username = "frettedmelodist2007-eng";
    try {
        const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, { next: { revalidate: 60 } });
        if (!res.ok) throw new Error('Failed to fetch repos');
        return res.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}
