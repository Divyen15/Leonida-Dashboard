import json
import os

with open('repo_meta.json', 'r', encoding='utf-8') as f:
    repo = json.load(f)

with open('commits.json', 'r', encoding='utf-8') as f:
    commits = json.load(f)

with open('pulls.json', 'r', encoding='utf-8') as f:
    open_pulls = json.load(f)

with open('prs_closed.json', 'r', encoding='utf-8') as f:
    closed_pulls = json.load(f)

snapshot = {
    "fetchedAt": "2026-11-23T17:03:00Z",
    "repo": {
        "name": repo.get("name"),
        "full_name": repo.get("full_name"),
        "html_url": repo.get("html_url"),
        "description": repo.get("description"),
        "stars": repo.get("stargazers_count"),
        "forks": repo.get("forks_count"),
        "open_issues": repo.get("open_issues_count"),
        "default_branch": repo.get("default_branch"),
        "pushed_at": repo.get("pushed_at"),
        "created_at": repo.get("created_at")
    },
    "commits": [],
    "pulls": [],
    "closed_pulls": []
}

for c in commits:
    snapshot["commits"].append({
        "sha": c["sha"],
        "short_sha": c["sha"][:7],
        "message": c["commit"]["message"],
        "author": c["commit"]["author"]["name"],
        "date": c["commit"]["author"]["date"],
        "html_url": c["html_url"]
    })

for p in open_pulls:
    snapshot["pulls"].append({
        "number": p["number"],
        "title": p["title"],
        "state": p["state"],
        "user": p["user"]["login"],
        "user_avatar": p["user"]["avatar_url"],
        "created_at": p["created_at"],
        "html_url": p["html_url"],
        "labels": [l["name"] for l in p.get("labels", [])],
        "body": (p.get("body") or "")[:500]
    })

for p in closed_pulls:
    snapshot["closed_pulls"].append({
        "number": p["number"],
        "title": p["title"],
        "state": p["state"],
        "merged": p.get("merged_at") is not None,
        "merged_at": p.get("merged_at"),
        "user": p["user"]["login"],
        "user_avatar": p["user"]["avatar_url"],
        "created_at": p["created_at"],
        "closed_at": p.get("closed_at"),
        "html_url": p["html_url"],
        "labels": [l["name"] for l in p.get("labels", [])]
    })

os.makedirs('src/data', exist_ok=True)
with open('src/data/snapshot.json', 'w', encoding='utf-8') as f:
    json.dump(snapshot, f, indent=2)

print(f"Generated src/data/snapshot.json with {len(snapshot['commits'])} commits, {len(snapshot['pulls'])} open PRs, {len(snapshot['closed_pulls'])} closed PRs.")
