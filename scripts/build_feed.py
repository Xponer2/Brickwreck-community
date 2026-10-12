"""
Builds the site's data: every bug report (issue) and every forum post (discussion) of the repo, with their comments,
the forum's categories and the latest release, into one JSON file the static site reads.

    python3 scripts/build_feed.py site/data/feed.json

Needs GITHUB_TOKEN (in the workflow it's given; on your own machine `gh auth token` is used) and REPO (owner/name,
default Xponer2/Brickwreck-community). Standard library only.
"""
import datetime
import html
import json
import os
import re
import subprocess
import sys
import urllib.request

REPO = os.environ.get("REPO") or "Xponer2/Brickwreck-community"
OWNER, NAME = REPO.split("/", 1)

# The status of a bug, from its labels and how it was closed (the board's columns).
STATUS_LABELS = [("fixed-next-build", "fixed-next"), ("in-progress", "progress"), ("needs-info", "needs-info"),
                 ("cant-reproduce", "needs-info"), ("confirmed", "confirmed")]
KIND_LABELS = ["crash", "gameplay", "visual", "performance", "multiplayer", "sound", "translation"]
FORM_FIELDS = {"what kind of problem?": "kind", "where were you?": "mode", "game version": "version",
               "your computer": "system", "what happened?": "what"}

AUTHOR = "author { login avatarUrl url }"
ISSUES = """
query($owner: String!, $name: String!, $after: String) {
  repository(owner: $owner, name: $name) {
    issues(first: 50, after: $after, orderBy: {field: CREATED_AT, direction: DESC}) {
      pageInfo { hasNextPage endCursor }
      nodes {
        number title url state stateReason createdAt updatedAt closedAt body bodyHTML locked
        %(a)s
        labels(first: 20) { nodes { name color } }
        reactions(content: THUMBS_UP) { totalCount }
        comments(last: 40) { totalCount nodes { %(a)s createdAt bodyHTML url } }
      }
    }
  }
}""" % {"a": AUTHOR}
DISCUSSIONS = """
query($owner: String!, $name: String!, $after: String) {
  repository(owner: $owner, name: $name) {
    discussionCategories(first: 25) { nodes { name slug emojiHTML description isAnswerable } }
    discussions(first: 50, after: $after, orderBy: {field: CREATED_AT, direction: DESC}) {
      pageInfo { hasNextPage endCursor }
      nodes {
        number title url createdAt updatedAt body bodyHTML upvoteCount isAnswered locked
        %(a)s
        category { slug }
        comments(last: 40) {
          totalCount
          nodes { %(a)s createdAt bodyHTML url upvoteCount isAnswer
                  replies(first: 20) { nodes { %(a)s createdAt bodyHTML url } } }
        }
      }
    }
  }
}""" % {"a": AUTHOR}
RELEASE = """
query($owner: String!, $name: String!) {
  repository(owner: $owner, name: $name) {
    latestRelease { name tagName url publishedAt description
                    releaseAssets(first: 10) { nodes { name downloadUrl size downloadCount } } }
  }
}"""


def token():
    t = os.environ.get("GITHUB_TOKEN")
    if t:
        return t
    return subprocess.run(["gh", "auth", "token"], capture_output=True, text=True, check=True).stdout.strip()


TOKEN = None


def gql(query, **variables):
    global TOKEN
    TOKEN = TOKEN or token()
    req = urllib.request.Request("https://api.github.com/graphql",
                                 data=json.dumps({"query": query, "variables": {"owner": OWNER, "name": NAME, **variables}}).encode(),
                                 headers={"Authorization": f"bearer {TOKEN}", "Content-Type": "application/json",
                                          "User-Agent": "brickwreck-community-site"})
    with urllib.request.urlopen(req, timeout=60) as r:
        out = json.load(r)
    if out.get("errors"):
        raise RuntimeError(json.dumps(out["errors"])[:600])
    return out["data"]["repository"]


def paged(query, key):
    after, nodes, extra = None, [], None
    while True:
        repo = gql(query, after=after)
        extra = extra or repo
        page = repo[key]
        nodes += page["nodes"]
        if not page["pageInfo"]["hasNextPage"] or len(nodes) >= 1000:
            return nodes, extra
        after = page["pageInfo"]["endCursor"]


# --- Media ----------------------------------------------------------------------------------------------------------

UUID = r"[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}"
# Uploads are shown by GitHub through links that expire in minutes; the lasting address of the same file instead.
PRIVATE = re.compile(r"https://private-user-images\.githubusercontent\.com/[^\"'\s<>]*?(" + UUID + r")[^\"'\s<>]*")
YOUTUBE = re.compile(r"(?:youtube\.com/(?:watch\?(?:[^\"'\s<>]*?&(?:amp;)?)?v=|shorts/|embed/|live/)|youtu\.be/)([A-Za-z0-9_-]{11})")
OTHER_VIDEO = re.compile(r"https?://(?:www\.)?(?:streamable\.com/[A-Za-z0-9]+|drive\.google\.com/file/d/[A-Za-z0-9_-]+[^\"'\s<>]*|vimeo\.com/\d+)")


def lasting(html_text):
    return PRIVATE.sub(lambda m: f"https://github.com/user-attachments/assets/{m.group(1)}", html_text or "")


def media(html_text, body=""):
    videos, images, seen = [], [], set()
    for m in re.finditer(r"<video\b[^>]*?\bsrc=\"([^\"]+)\"", html_text):
        if m.group(1) not in seen:
            seen.add(m.group(1))
            videos.append(html.unescape(m.group(1)))
    for m in re.finditer(r"<img\b([^>]*)>", html_text):
        attrs = m.group(1)
        if "emoji" in attrs or "avatar" in attrs:
            continue
        src = re.search(r"\bsrc=\"([^\"]+)\"", attrs)
        if src and src.group(1) not in seen:
            seen.add(src.group(1))
            images.append(html.unescape(src.group(1)))
    youtube = []
    for m in YOUTUBE.finditer(html_text + "\n" + (body or "")):
        if m.group(1) not in youtube:
            youtube.append(m.group(1))
    links = []
    for m in OTHER_VIDEO.finditer(html_text + "\n" + (body or "")):
        if m.group(0) not in links:
            links.append(m.group(0))
    return {"videos": videos, "images": images, "youtube": youtube, "links": links}


def plain(html_text, limit=220):
    t = re.sub(r"<(script|style)[^>]*>.*?</\1>", " ", html_text or "", flags=re.S)
    t = re.sub(r"<h3[^>]*>.*?</h3>", " ", t, flags=re.S)  # (a form's headings: not part of what was said)
    t = html.unescape(re.sub(r"<[^>]+>", " ", t))
    t = re.sub(r"\s+", " ", t).replace("No response", "").strip()
    return t if len(t) <= limit else t[:limit].rsplit(" ", 1)[0] + "…"


def form(body):
    """The answers of an issue form ("### Question" then the answer), by the ids above."""
    out = {}
    for part in re.split(r"^###\s+", body or "", flags=re.M)[1:]:
        head, _, value = part.partition("\n")
        key = FORM_FIELDS.get(head.strip().lower())
        value = value.strip()
        if key and value and value != "_No response_":
            out[key] = value[:600]
    return out


def who(a):
    a = a or {"login": "ghost", "avatarUrl": "", "url": "https://github.com/ghost"}
    return {"login": a["login"], "avatar": a["avatarUrl"], "url": a["url"]}


def comment(c):
    h = lasting(c.get("bodyHTML"))
    out = {"author": who(c.get("author")), "at": c["createdAt"], "html": h, "url": c.get("url")}
    if "upvoteCount" in c:
        out["up"] = c["upvoteCount"]
        out["answer"] = c.get("isAnswer", False)
    if c.get("replies"):
        out["replies"] = [comment(r) for r in c["replies"]["nodes"]]
    return out


def issue(i):
    h = lasting(i["bodyHTML"])
    labels = [l["name"] for l in i["labels"]["nodes"]]
    status = "new"
    if i["state"] == "CLOSED":
        status = "fixed" if i.get("stateReason") == "COMPLETED" else "closed"
    else:
        for label, s in STATUS_LABELS:
            if label in labels:
                status = s
                break
    comments = [comment(c) for c in i["comments"]["nodes"]]
    m = media(h, i["body"])
    for c in comments:
        cm = media(c["html"])
        for k in m:
            m[k] += [x for x in cm[k] if x not in m[k]]
    fields = form(i["body"])
    return {"n": i["number"], "title": i["title"], "url": i["url"], "status": status, "state": i["state"].lower(),
            "created": i["createdAt"], "updated": i["updatedAt"], "closed": i["closedAt"], "author": who(i["author"]),
            "labels": labels, "kind": next((k for k in KIND_LABELS if k in labels), None), "fields": fields,
            "up": i["reactions"]["totalCount"], "comments": i["comments"]["totalCount"], "locked": i["locked"],
            "summary": plain(fields.get("what") or h), "html": h, "thread": comments, "media": m}


def discussion(d):
    h = lasting(d["bodyHTML"])
    comments = [comment(c) for c in d["comments"]["nodes"]]
    m = media(h, d["body"])
    for c in comments:
        for r in [c] + c.get("replies", []):
            cm = media(r["html"])
            for k in m:
                m[k] += [x for x in cm[k] if x not in m[k]]
    return {"n": d["number"], "title": d["title"], "url": d["url"], "category": d["category"]["slug"],
            "created": d["createdAt"], "updated": d["updatedAt"], "author": who(d["author"]), "up": d["upvoteCount"],
            "answered": d["isAnswered"], "locked": d["locked"], "comments": d["comments"]["totalCount"],
            "summary": plain(h), "html": h, "thread": comments, "media": m}


def main():
    path = sys.argv[1] if len(sys.argv) > 1 else "site/data/feed.json"
    issues, _ = paged(ISSUES, "issues")
    try:
        discussions, repo = paged(DISCUSSIONS, "discussions")
        categories = [{"name": c["name"], "slug": c["slug"], "emoji": plain(c["emojiHTML"], 8), "about": c["description"],
                       "answers": c["isAnswerable"]} for c in repo["discussionCategories"]["nodes"]]
    except Exception as e:  # (the forum switched off: the bugs still go up)
        print("discussions:", e, file=sys.stderr)
        discussions, categories = [], []
    rel = gql(RELEASE).get("latestRelease")
    release = None
    if rel:
        release = {"name": rel["name"] or rel["tagName"], "tag": rel["tagName"], "url": rel["url"], "at": rel["publishedAt"],
                   "about": rel["description"] or "",
                   "assets": [{"name": a["name"], "url": a["downloadUrl"], "size": a["size"], "downloads": a["downloadCount"]}
                              for a in rel["releaseAssets"]["nodes"]]}
    feed = {"repo": REPO, "generated": datetime.datetime.now(datetime.timezone.utc).isoformat(timespec="seconds"),
            "categories": categories, "release": release,
            "issues": [issue(i) for i in issues], "discussions": [discussion(d) for d in discussions]}
    os.makedirs(os.path.dirname(path) or ".", exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(feed, f, ensure_ascii=False, separators=(",", ":"))
    print(f"{len(feed['issues'])} issues, {len(feed['discussions'])} discussions, {len(categories)} categories"
          f"{', release ' + release['tag'] if release else ''} -> {path} ({os.path.getsize(path) // 1024} KB)")


if __name__ == "__main__":
    main()
