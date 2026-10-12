// Brickwreck beta site: a static page over the repo's bug reports (issues) and forum (discussions). The data is
// data/feed.json, rebuilt by the workflow whenever something is posted (scripts/build_feed.py); posting itself
// happens on GitHub, through the links here.
"use strict";

const REPO = "Xponer2/Brickwreck-community";
const GH = `https://github.com/${REPO}`;
const ITCH = "https://xponer.itch.io/brickwreck";
const LOG_DIR = "%APPDATA%\\Godot\\app_userdata\\Brickwreck\\logs";

const T = {
  en: {
    beta: "beta",
    "nav.bugs": "Bugs", "nav.forum": "Forum", "nav.media": "Videos", "nav.guide": "How to report",
    loading: "Loading…", failed: "Couldn't load the data. Try again in a minute.",
    "home.title": "Brickwreck beta testing",
    "home.text": "Bug reports, videos and discussion for the Brickwreck beta. Posting is done on GitHub (a free account is needed); reading needs nothing.",
    "home.warn": "This is an early test version and isn't considered fully playable yet. Multiplayer has barely been tested.",
    "act.get": "Download the game (itch.io)",
    "act.bug": "Report a bug", "act.post": "New forum post", "act.video": "Post a video", "act.guide": "How to report",
    download: "Download {0}",
    "home.bugs": "Latest bugs", "home.posts": "Latest forum posts", "home.news": "News",
    "home.counts": "{0} open bugs · {1} fixed · {2} forum posts",
    all: "All", "see.all": "All bugs →", "see.forum": "Whole forum →",
    "bugs.title": "Bugs", "bugs.text": "Please search before reporting. If your bug is already here, add a 👍 or a comment on GitHub.",
    "bugs.search": "Search", "bugs.none": "Nothing found.", "bugs.first": "No bugs reported yet.",
    "sort.new": "Newest", "sort.active": "Recently updated", "sort.top": "Most votes", "sort.talk": "Most comments",
    "tab.open": "Open", "tab.new": "New", "tab.work": "Being worked on", "tab.fixed": "Fixed", "tab.closed": "Closed", "tab.all": "All",
    "kind.any": "Any kind",
    "st.new": "New", "st.confirmed": "Confirmed", "st.progress": "Being fixed", "st.needs-info": "Needs info",
    "st.fixed-next": "Fixed in next build", "st.fixed": "Fixed", "st.closed": "Closed",
    "st.new.s": "Reported, not looked at yet.", "st.confirmed.s": "The developer could reproduce it.",
    "st.progress.s": "Being fixed now.", "st.needs-info.s": "Can't reproduce it — more details, a video or the log would help.",
    "st.fixed-next.s": "Fixed in the code; comes with the next build.", "st.fixed.s": "Fixed in a released build.",
    "st.closed.s": "Duplicate, not a bug, or won't be changed.",
    "k.crash": "Crash", "k.gameplay": "Gameplay", "k.visual": "Visual", "k.performance": "Performance",
    "k.multiplayer": "Multiplayer", "k.sound": "Sound", "k.translation": "Text",
    "c.num": "#", "c.title": "Title", "c.status": "Status", "c.replies": "Replies", "c.updated": "Updated", "c.cat": "Category",
    "f.kind": "Kind", "f.mode": "Where", "f.version": "Version", "f.system": "Computer", "f.status": "Status", "f.by": "Reported by",
    "comment.gh": "Comment on GitHub", "reply.gh": "Reply on GitHub",
    by: "by {0}", answer: "Answer", video: "video",
    back: "← Back", notfound: "Not found. If it was just posted, it shows up here within a few minutes.",
    "forum.title": "Forum", "forum.text": "Ideas, questions, videos, guides — anything about the game.",
    "forum.none": "No posts yet.",
    "media.title": "Videos", "media.text": "Videos and screenshots from bug reports and forum posts.",
    "media.none": "No videos yet.", "media.from.bug": "bug #{0}", "media.from.post": "forum",
    "video.fail": "Watch this video on GitHub →",
    "guide.title": "How to report a bug",
    updated: "Updated {0}",
    "foot.gh": "GitHub repository",
  },
  ru: {
    beta: "бета",
    "nav.bugs": "Баги", "nav.forum": "Форум", "nav.media": "Видео", "nav.guide": "Как сообщить",
    loading: "Загрузка…", failed: "Не удалось загрузить данные. Попробуйте через минуту.",
    "home.title": "Бета-тест Brickwreck",
    "home.text": "Баг-репорты, видео и обсуждения беты Brickwreck. Писать — на GitHub (нужен бесплатный аккаунт), читать можно без него.",
    "home.warn": "Это ранняя тестовая версия, пока не считается полностью играбельной. Мультиплеер почти не тестировался.",
    "act.get": "Скачать игру (itch.io)",
    "act.bug": "Сообщить о баге", "act.post": "Новый пост на форуме", "act.video": "Выложить видео", "act.guide": "Как сообщить",
    download: "Скачать {0}",
    "home.bugs": "Свежие баги", "home.posts": "Свежее на форуме", "home.news": "Новости",
    "home.counts": "открытых багов: {0} · исправлено: {1} · постов на форуме: {2}",
    all: "Все", "see.all": "Все баги →", "see.forum": "Весь форум →",
    "bugs.title": "Баги", "bugs.text": "Поищите перед тем, как писать. Если ваш баг уже есть — поставьте 👍 или допишите комментарий на GitHub.",
    "bugs.search": "Поиск", "bugs.none": "Ничего не найдено.", "bugs.first": "Пока ни одного бага.",
    "sort.new": "Новые", "sort.active": "Недавно обновлённые", "sort.top": "Больше голосов", "sort.talk": "Больше комментариев",
    "tab.open": "Открытые", "tab.new": "Новые", "tab.work": "В работе", "tab.fixed": "Исправленные", "tab.closed": "Закрытые", "tab.all": "Все",
    "kind.any": "Любой тип",
    "st.new": "Новый", "st.confirmed": "Подтверждён", "st.progress": "Исправляется", "st.needs-info": "Нужны детали",
    "st.fixed-next": "Исправлен в след. билде", "st.fixed": "Исправлен", "st.closed": "Закрыт",
    "st.new.s": "Прислан, ещё не смотрели.", "st.confirmed.s": "У разработчика тоже повторилось.",
    "st.progress.s": "Сейчас исправляется.", "st.needs-info.s": "Не получается повторить — помогут подробности, видео или лог.",
    "st.fixed-next.s": "Исправлено в коде, придёт со следующим билдом.", "st.fixed.s": "Исправлено в вышедшем билде.",
    "st.closed.s": "Дубликат, не баг или менять не будем.",
    "k.crash": "Вылет", "k.gameplay": "Геймплей", "k.visual": "Графика", "k.performance": "Производительность",
    "k.multiplayer": "Мультиплеер", "k.sound": "Звук", "k.translation": "Текст",
    "c.num": "#", "c.title": "Название", "c.status": "Статус", "c.replies": "Ответы", "c.updated": "Обновлено", "c.cat": "Раздел",
    "f.kind": "Тип", "f.mode": "Где", "f.version": "Версия", "f.system": "Компьютер", "f.status": "Статус", "f.by": "Прислал",
    "comment.gh": "Комментировать на GitHub", "reply.gh": "Ответить на GitHub",
    by: "от {0}", answer: "Ответ", video: "видео",
    back: "← Назад", notfound: "Не найдено. Если только что опубликовано — появится здесь через несколько минут.",
    "forum.title": "Форум", "forum.text": "Идеи, вопросы, видео, гайды — всё об игре.",
    "forum.none": "Постов пока нет.",
    "media.title": "Видео", "media.text": "Видео и скриншоты из баг-репортов и постов на форуме.",
    "media.none": "Видео пока нет.", "media.from.bug": "баг #{0}", "media.from.post": "форум",
    "video.fail": "Смотреть это видео на GitHub →",
    "guide.title": "Как сообщить о баге",
    updated: "Обновлено {0}",
    "foot.gh": "Репозиторий на GitHub",
  },
};

const GUIDE = {
  en: `
<h2>From the game</h2>
<p><b>Main menu → Report a bug</b>, or <b>Esc → Report a bug</b> during a battle. This opens the bug form in your browser with the game version and your computer already filled in, and opens the folder with the log file so you can drag <code>godot.log</code> into the form.</p>
<h2>What to write</h2>
<ul>
<li>One bug per report.</li>
<li>What happened, and what you expected to happen.</li>
<li>How to make it happen again, if you know. "Happened once" is still useful.</li>
<li>A video or a screenshot if you can. On Windows, Win+Alt+R records with the Xbox Game Bar and Win+Shift+S takes a screenshot.</li>
<li>The log file, from the folder <code>${LOG_DIR}</code>: <code>godot.log</code> is the latest run. If you've started the game again since the bug (after a crash, say), take the newest <code>godot&lt;date&gt;.log</code> instead.</li>
</ul>
<h2>Videos</h2>
<p>GitHub accepts videos up to 10 MB dragged into the form. For longer ones, upload to YouTube (unlisted is fine), Streamable or Google Drive and paste the link.</p>
<h2>Duplicates</h2>
<p>Check the <a href="#/bugs">bug list</a> first. If the bug is already there, add a 👍 to it on GitHub, and a comment if you know something new.</p>
<p>English or Russian are both fine.</p>`,
  ru: `
<h2>Из игры</h2>
<p><b>Главное меню → «Сообщить об ошибке»</b> или <b>Esc → «Сообщить об ошибке»</b> в бою. Откроется форма бага в браузере — версия игры и ваш компьютер уже вписаны — и папка с лог-файлом, чтобы перетащить <code>godot.log</code> в форму.</p>
<h2>Что писать</h2>
<ul>
<li>Один баг — одно сообщение.</li>
<li>Что случилось и что должно было случиться.</li>
<li>Как повторить, если знаете. «Случилось один раз» — тоже полезно.</li>
<li>Видео или скриншот, если можете. В Windows Win+Alt+R пишет видео через Xbox Game Bar, Win+Shift+S делает скриншот.</li>
<li>Лог-файл из папки <code>${LOG_DIR}</code>: <code>godot.log</code> — последний запуск. Если после бага игру уже запускали снова (например, после вылета), возьмите самый новый <code>godot&lt;дата&gt;.log</code>.</li>
</ul>
<h2>Видео</h2>
<p>GitHub принимает видео до 10 МБ — перетащите в форму. Более длинные загрузите на YouTube (можно «доступ по ссылке»), Streamable или Google Диск и вставьте ссылку.</p>
<h2>Повторы</h2>
<p>Сначала проверьте <a href="#/bugs">список багов</a>. Если баг уже есть — поставьте ему 👍 на GitHub и допишите комментарий, если знаете что-то новое.</p>
<p>Писать можно по-английски или по-русски.</p>`,
};

const KINDS = ["crash", "gameplay", "visual", "performance", "multiplayer", "sound", "translation"];
const STATUSES = ["new", "confirmed", "progress", "needs-info", "fixed-next", "fixed", "closed"];
const TABS = {
  open: s => !["fixed", "closed"].includes(s), new: s => s === "new", work: s => s === "confirmed" || s === "progress" || s === "needs-info",
  fixed: s => s === "fixed" || s === "fixed-next", closed: s => s === "closed", all: () => true,
};
const SORTS = {
  new: (a, b) => b.n - a.n, active: (a, b) => b.updated.localeCompare(a.updated),
  top: (a, b) => b.up - a.up || b.n - a.n, talk: (a, b) => b.comments - a.comments || b.n - a.n,
};

let lang = "en";
try { lang = localStorage.getItem("bw-lang") || ((navigator.language || "").toLowerCase().startsWith("ru") ? "ru" : "en"); } catch { /* (no storage) */ }
let feed = null;

// --- Helpers ---------------------------------------------------------------------------------------------------------

const $ = (sel, root = document) => root.querySelector(sel);
const t = (key, ...args) => {
  let s = (T[lang] && T[lang][key]) ?? T.en[key] ?? key;
  args.forEach((a, i) => { s = s.replace(`{${i}}`, a); });
  return s;
};
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const ago = iso => {
  if (!iso) return "";
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });
  let v = (new Date(iso).getTime() - Date.now()) / 1000;
  for (const [n, unit] of [[60, "second"], [60, "minute"], [24, "hour"], [7, "day"], [4.35, "week"], [12, "month"], [Infinity, "year"]]) {
    if (Math.abs(v) < n) return rtf.format(Math.round(v), unit);
    v /= n;
  }
  return "";
};
const date = iso => iso ? new Date(iso).toLocaleDateString(lang, { year: "numeric", month: "short", day: "numeric" }) : "";
const newBug = () => `${GH}/issues/new?template=bug.yml`;
const newPost = slug => slug ? `${GH}/discussions/new?category=${encodeURIComponent(slug)}` : `${GH}/discussions/new/choose`;
const catOf = slug => (feed && feed.categories.find(c => c.slug === slug)) || { name: slug, slug };
const face = (url, size) => url ? url + (url.includes("?") ? "&" : "?") + "s=" + size : "favicon.svg";
const status = s => `<span class="status s-${esc(s)}" title="${esc(t("st." + s + ".s"))}">${esc(t("st." + s))}</span>`;
const hasVideo = m => m && (m.videos.length || m.youtube.length || m.links.length);
const ext = (href, text, cls = "btn") => `<a class="${cls}" href="${esc(href)}" target="_blank" rel="noopener">${esc(text)}</a>`;

function parseHash() {
  const [path, q] = location.hash.replace(/^#\/?/, "").split("?");
  const parts = path.split("/").filter(Boolean);
  return { view: parts[0] || "home", id: parts[1], q: new URLSearchParams(q || "") };
}
const setQuery = (view, q) => { const s = q.toString(); history.replaceState(null, "", `#/${view}${s ? "?" + s : ""}`); };

// GitHub's own rendering of a post, cleaned by DOMPurify. Then: links open on GitHub, videos that won't play here
// turn into a link, YouTube links get a player.
function rich(html) {
  const clean = window.DOMPurify
    ? DOMPurify.sanitize(html || "", { ADD_TAGS: ["video", "source"], ADD_ATTR: ["controls", "muted", "playsinline", "preload", "poster"], FORBID_TAGS: ["style", "form", "input", "button", "textarea", "select"] })
    : esc(html);
  return `<div class="md">${clean}</div>`;
}

function dress(root, fallback) {
  const done = new Set();
  root.querySelectorAll(".md a[href]").forEach(a => {
    const href = a.getAttribute("href");
    if (href.startsWith("/")) a.setAttribute("href", "https://github.com" + href);
    if (!href.startsWith("#")) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
    const id = youtubeId(href);
    if (!id || done.has(id)) return;
    done.add(id);
    const box = document.createElement("div");
    box.className = "yt";
    const f = document.createElement("iframe");
    f.src = `https://www.youtube-nocookie.com/embed/${id}`;
    f.title = "YouTube"; f.loading = "lazy"; f.allowFullscreen = true;
    f.allow = "encrypted-media; picture-in-picture; fullscreen";
    box.appendChild(f);
    (a.closest("p, li") || a).after(box);
  });
  root.querySelectorAll(".md video").forEach(v => {
    v.controls = true; v.preload = "metadata"; v.playsInline = true;
    v.addEventListener("error", () => {
      const a = document.createElement("a");
      a.className = "vfail"; a.href = fallback; a.target = "_blank"; a.rel = "noopener"; a.textContent = t("video.fail");
      v.replaceWith(a);
    }, { once: true });
  });
}

function youtubeId(url) {
  const m = /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/.exec(url || "");
  return m ? m[1] : null;
}

// --- Tables ----------------------------------------------------------------------------------------------------------

function bugTable(list, empty) {
  if (!list.length) return `<p class="empty">${esc(empty)}</p>`;
  return `<table class="list">
    <thead><tr><th class="num">${t("c.num")}</th><th>${esc(t("c.title"))}</th><th class="st">${esc(t("c.status"))}</th><th class="r hide-s">${esc(t("c.replies"))}</th><th class="r hide-s">${esc(t("c.updated"))}</th></tr></thead>
    <tbody>${list.map(i => {
      const sub = [i.kind && t("k." + i.kind), i.fields.version, hasVideo(i.media) && t("video"), t("by", i.author.login)].filter(Boolean).join(" · ");
      return `<tr>
        <td class="num">${i.n}</td>
        <td><a class="ttl" href="#/bug/${i.n}">${esc(i.title)}</a><div class="sub">${esc(sub)}${i.up ? ` · 👍 ${i.up}` : ""}</div></td>
        <td class="st">${status(i.status)}</td>
        <td class="r hide-s">${i.comments || ""}</td>
        <td class="r hide-s">${esc(ago(i.updated))}</td>
      </tr>`;
    }).join("")}</tbody></table>`;
}

function postTable(list, empty) {
  if (!list.length) return `<p class="empty">${esc(empty)}</p>`;
  return `<table class="list">
    <thead><tr><th>${esc(t("c.title"))}</th><th class="hide-s">${esc(t("c.cat"))}</th><th class="r hide-s">${esc(t("c.replies"))}</th><th class="r">${esc(t("c.updated"))}</th></tr></thead>
    <tbody>${list.map(d => {
      const sub = [t("by", d.author.login), d.answered && t("answer"), hasVideo(d.media) && t("video")].filter(Boolean).join(" · ");
      return `<tr>
        <td><a class="ttl" href="#/post/${d.n}">${esc(d.title)}</a><div class="sub">${esc(sub)}</div></td>
        <td class="hide-s small">${esc(catOf(d.category).name)}</td>
        <td class="r hide-s">${d.comments || ""}</td>
        <td class="r">${esc(ago(d.updated))}</td>
      </tr>`;
    }).join("")}</tbody></table>`;
}

function postBox(author, at, html, url, answer = false) {
  return `<div class="post${answer ? " answer" : ""}">
    <div class="post-h"><img class="av" src="${esc(face(author.avatar, 36))}" alt=""><b>${esc(author.login)}</b> · <a href="${esc(url)}" target="_blank" rel="noopener" title="${esc(new Date(at).toLocaleString(lang))}">${esc(ago(at))}</a>${answer ? ` · <b>${esc(t("answer"))}</b>` : ""}</div>
    <div class="post-b">${rich(html)}</div>
  </div>`;
}

// --- Pages -----------------------------------------------------------------------------------------------------------

function home() {
  const open = feed.issues.filter(i => TABS.open(i.status)).length;
  const fixed = feed.issues.filter(i => TABS.fixed(i.status)).length;
  const news = feed.discussions.filter(d => d.category === "announcements").slice(0, 3);
  const posts = feed.discussions.filter(d => d.category !== "announcements").slice(0, 8);
  const r = feed.release;
  const asset = r && (r.assets.find(a => /\.zip$/i.test(a.name)) || r.assets[0]);
  return `
  <h1>${esc(t("home.title"))}</h1>
  <p>${esc(t("home.text"))}</p>
  <p class="notice">${esc(t("home.warn"))}</p>
  <div class="btns">
    ${ext(ITCH, t("act.get"), "btn main")}
    ${ext(newBug(), t("act.bug"), "btn main")}
    ${r ? ext(asset ? asset.url : r.url, t("download", r.name)) : ""}
    ${ext(newPost(), t("act.post"))}
    <a class="btn" href="#/guide">${esc(t("act.guide"))}</a>
  </div>
  <p class="muted small">${esc(t("home.counts", open, fixed, feed.discussions.length))}</p>
  ${news.length ? `<h2>${esc(t("home.news"))}</h2>${postTable(news, "")}` : ""}
  <h2>${esc(t("home.bugs"))}</h2>
  ${bugTable(feed.issues.slice(0, 8), t("bugs.first"))}
  ${feed.issues.length > 8 ? `<p class="more"><a href="#/bugs">${esc(t("see.all"))}</a></p>` : ""}
  <h2>${esc(t("home.posts"))}</h2>
  ${postTable(posts, t("forum.none"))}
  ${posts.length >= 8 ? `<p class="more"><a href="#/forum">${esc(t("see.forum"))}</a></p>` : ""}`;
}

function bugs(q) {
  const tab = TABS[q.get("tab")] ? q.get("tab") : "open";
  const kind = KINDS.includes(q.get("kind")) ? q.get("kind") : "";
  const sort = SORTS[q.get("sort")] ? q.get("sort") : "new";
  const counts = Object.fromEntries(Object.keys(TABS).map(k => [k, feed.issues.filter(i => TABS[k](i.status)).length]));
  return `
  <div class="head"><div><h1>${esc(t("bugs.title"))}</h1><p class="muted">${esc(t("bugs.text"))}</p></div>${ext(newBug(), t("act.bug"), "btn main")}</div>
  <div class="filters">
    <select id="tab" aria-label="${esc(t("c.status"))}">${Object.keys(TABS).map(k => `<option value="${k}"${k === tab ? " selected" : ""}>${esc(t("tab." + k))} (${counts[k]})</option>`).join("")}</select>
    <select id="kind" aria-label="${esc(t("f.kind"))}"><option value="">${esc(t("kind.any"))}</option>${KINDS.map(k => `<option value="${k}"${k === kind ? " selected" : ""}>${esc(t("k." + k))}</option>`).join("")}</select>
    <select id="sort" aria-label="Sort">${Object.keys(SORTS).map(s => `<option value="${s}"${s === sort ? " selected" : ""}>${esc(t("sort." + s))}</option>`).join("")}</select>
    <input id="q" type="search" placeholder="${esc(t("bugs.search"))}" value="${esc(q.get("q") || "")}" aria-label="${esc(t("bugs.search"))}">
  </div>
  <div id="list"></div>`;
}

function fillBugs(q) {
  const tab = TABS[q.get("tab")] ? q.get("tab") : "open";
  const kind = q.get("kind") || "";
  const text = (q.get("q") || "").toLowerCase().trim();
  let list = feed.issues.filter(i => TABS[tab](i.status) && (!kind || i.kind === kind));
  if (text) {
    const n = text.replace(/^#/, "");
    list = list.filter(i => String(i.n) === n || i.title.toLowerCase().includes(text) || (i.summary || "").toLowerCase().includes(text));
  }
  list.sort(SORTS[q.get("sort")] || SORTS.new);
  $("#list").innerHTML = bugTable(list, feed.issues.length ? t("bugs.none") : t("bugs.first"));
}

function wireFilters(view, fill) {
  const q = parseHash().q;
  const update = () => { setQuery(view, q); fill(q); };
  ["tab", "kind", "sort"].forEach(id => {
    const el = $("#" + id);
    if (el) el.onchange = () => { if (el.value) q.set(id, el.value); else q.delete(id); update(); };
  });
  $("#q").oninput = e => { if (e.target.value) q.set("q", e.target.value); else q.delete("q"); update(); };
  fill(q);
}

function bug(n) {
  const i = feed.issues.find(x => String(x.n) === String(n));
  if (!i) return `<a class="back" href="#/bugs">${esc(t("back"))}</a><p class="empty">${esc(t("notfound"))}</p>`;
  const f = i.fields;
  const facts = [
    ["f.status", `${status(i.status)} <span class="muted small">— ${esc(t("st." + i.status + ".s"))}</span>`],
    i.kind && ["f.kind", esc(t("k." + i.kind))],
    f.mode && ["f.mode", esc(f.mode)],
    f.version && ["f.version", esc(f.version)],
    f.system && ["f.system", esc(f.system)],
    ["f.by", `${esc(i.author.login)}, ${esc(date(i.created))}`],
  ].filter(Boolean);
  return `
  <a class="back" href="#/bugs">${esc(t("back"))}</a>
  <h1>${esc(i.title)} <span class="muted">#${i.n}</span></h1>
  <table class="facts">${facts.map(([k, v]) => `<tr><th>${esc(t(k))}</th><td>${v}</td></tr>`).join("")}</table>
  ${postBox(i.author, i.created, i.html, i.url)}
  ${i.thread.map(c => postBox(c.author, c.at, c.html, c.url || i.url)).join("")}
  <div class="btns">${ext(i.url, t("comment.gh"), "btn main")}</div>`;
}

function forum(q) {
  const cat = q.get("c") || "";
  const sort = SORTS[q.get("sort")] ? q.get("sort") : "new";
  const n = slug => feed.discussions.filter(d => !slug || d.category === slug).length;
  return `
  <div class="head"><div><h1>${esc(t("forum.title"))}</h1><p class="muted">${esc(t("forum.text"))}</p></div>${ext(newPost(cat), t("act.post"), "btn main")}</div>
  <div class="cats">
    <a href="#/forum" class="${!cat ? "on" : ""}">${esc(t("all"))} (${n("")})</a>
    ${feed.categories.map(c => `<a href="#/forum?c=${esc(c.slug)}" class="${c.slug === cat ? "on" : ""}">${esc(c.name)} (${n(c.slug)})</a>`).join("")}
  </div>
  <div class="filters">
    <select id="sort" aria-label="Sort">${Object.keys(SORTS).map(s => `<option value="${s}"${s === sort ? " selected" : ""}>${esc(t("sort." + s))}</option>`).join("")}</select>
    <input id="q" type="search" placeholder="${esc(t("bugs.search"))}" value="${esc(q.get("q") || "")}" aria-label="${esc(t("bugs.search"))}">
  </div>
  <div id="list"></div>`;
}

function fillForum(q) {
  const cat = q.get("c") || "";
  const text = (q.get("q") || "").toLowerCase().trim();
  let list = feed.discussions.filter(d => !cat || d.category === cat);
  if (text) list = list.filter(d => d.title.toLowerCase().includes(text) || (d.summary || "").toLowerCase().includes(text));
  list.sort(SORTS[q.get("sort")] || SORTS.new);
  $("#list").innerHTML = postTable(list, t("forum.none"));
}

function discussion(n) {
  const d = feed.discussions.find(x => String(x.n) === String(n));
  if (!d) return `<a class="back" href="#/forum">${esc(t("back"))}</a><p class="empty">${esc(t("notfound"))}</p>`;
  const thread = d.thread.map(c => postBox(c.author, c.at, c.html, c.url || d.url, c.answer)
    + ((c.replies || []).length ? `<div class="replies">${c.replies.map(r => postBox(r.author, r.at, r.html, r.url || d.url)).join("")}</div>` : "")).join("");
  return `
  <a class="back" href="#/forum?c=${esc(d.category)}">${esc(t("back"))}</a>
  <h1>${esc(d.title)}</h1>
  <p class="muted small">${esc(catOf(d.category).name)} · ${esc(t("by", d.author.login))} · ${esc(date(d.created))}${d.up ? ` · ▲ ${d.up}` : ""}</p>
  ${postBox(d.author, d.created, d.html, d.url)}
  ${thread}
  <div class="btns">${ext(d.url, t("reply.gh"), "btn main")}</div>`;
}

function mediaItems() {
  const out = [];
  const add = (m, from) => {
    m.videos.forEach(src => out.push({ type: "video", src, from }));
    m.youtube.forEach(id => out.push({ type: "youtube", src: id, from }));
    m.links.forEach(src => out.push({ type: "link", src, from }));
    m.images.forEach(src => out.push({ type: "image", src, from }));
  };
  feed.issues.forEach(i => add(i.media, { kind: "bug", n: i.n, title: i.title, at: i.created }));
  feed.discussions.forEach(d => add(d.media, { kind: "post", n: d.n, title: d.title, at: d.created }));
  return out.sort((a, b) => (b.from.at || "").localeCompare(a.from.at || ""));
}

function media() {
  const items = mediaItems();
  const tile = m => {
    const href = m.from.kind === "bug" ? `#/bug/${m.from.n}` : `#/post/${m.from.n}`;
    let pic;
    if (m.type === "video") pic = `<video src="${esc(m.src)}#t=0.5" preload="metadata" muted playsinline></video><span class="tag">▶ ${esc(t("video"))}</span>`;
    else if (m.type === "youtube") pic = `<img src="https://i.ytimg.com/vi/${esc(m.src)}/hqdefault.jpg" alt="" loading="lazy"><span class="tag">▶ YouTube</span>`;
    else if (m.type === "image") pic = `<img src="${esc(m.src)}" alt="" loading="lazy">`;
    else pic = `<span class="site">${esc(new URL(m.src).hostname.replace(/^www\./, ""))}</span>`;
    const from = m.from.kind === "bug" ? t("media.from.bug", m.from.n) : t("media.from.post");
    return `<a class="tile" href="${href}"><div class="pic">${pic}</div><div class="cap">${esc(m.from.title)}</div><div class="from">${esc(from)} · ${esc(ago(m.from.at))}</div></a>`;
  };
  return `
  <div class="head"><div><h1>${esc(t("media.title"))}</h1><p class="muted">${esc(t("media.text"))}</p></div>${ext(newPost("show-and-tell"), t("act.video"), "btn main")}</div>
  ${items.length ? `<div class="grid">${items.map(tile).join("")}</div>` : `<p class="empty">${esc(t("media.none"))}</p>`}`;
}

function guide() {
  return `
  <div class="guide">
    <h1>${esc(t("guide.title"))}</h1>
    <div class="btns">${ext(newBug(), t("act.bug"), "btn main")}</div>
    ${GUIDE[lang] || GUIDE.en}
    <h2>${esc(t("c.status"))}</h2>
    <table class="legend">${STATUSES.map(s => `<tr><td>${status(s)}</td><td class="muted">${esc(t("st." + s + ".s"))}</td></tr>`).join("")}</table>
  </div>`;
}

// --- Frame -----------------------------------------------------------------------------------------------------------

function chrome() {
  document.documentElement.lang = lang;
  $("#lang").textContent = lang === "en" ? "Русский" : "English";
  document.querySelectorAll("[data-t]").forEach(el => { el.textContent = t(el.dataset.t); });
  const v = parseHash().view;
  const section = { bug: "bugs", post: "forum" }[v] || v;
  document.querySelectorAll("#nav a").forEach(a => a.classList.toggle("on", a.dataset.r === section));
  $("#foot").innerHTML = `<span>${feed ? esc(t("updated", ago(feed.generated))) : ""}</span><span><a href="${ITCH}" target="_blank" rel="noopener">itch.io</a> · <a href="${GH}" target="_blank" rel="noopener">${esc(t("foot.gh"))}</a></span>`;
}

function render() {
  chrome();
  const app = $("#app");
  if (!feed) { app.innerHTML = `<p class="muted">${esc(t("loading"))}</p>`; return; }
  const { view, id, q } = parseHash();
  let title = "";
  if (view === "bugs") { app.innerHTML = bugs(q); wireFilters("bugs", fillBugs); title = t("bugs.title"); }
  else if (view === "bug") {
    const i = feed.issues.find(x => String(x.n) === id);
    app.innerHTML = bug(id); dress(app, i ? i.url : GH); title = i ? `#${i.n} ${i.title}` : "";
  }
  else if (view === "forum") { app.innerHTML = forum(q); wireFilters("forum", fillForum); title = t("forum.title"); }
  else if (view === "post") {
    const d = feed.discussions.find(x => String(x.n) === id);
    app.innerHTML = discussion(id); dress(app, d ? d.url : GH); title = d ? d.title : "";
  }
  else if (view === "media") { app.innerHTML = media(); title = t("media.title"); }
  else if (view === "guide") { app.innerHTML = guide(); title = t("guide.title"); }
  else { app.innerHTML = home(); }
  document.title = title ? `${title} · Brickwreck beta` : "Brickwreck beta";
}

$("#lang").onclick = () => {
  lang = lang === "en" ? "ru" : "en";
  try { localStorage.setItem("bw-lang", lang); } catch { /* (no storage) */ }
  render();
};
let lastView = null;
window.addEventListener("hashchange", () => {
  const v = parseHash().view;
  render();
  if (v !== lastView || v === "bug" || v === "post") window.scrollTo(0, 0);
  lastView = v;
});

render();
fetch("data/feed.json", { cache: "no-cache" })
  .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
  .then(f => { feed = f; lastView = parseHash().view; render(); })
  .catch(() => { $("#app").innerHTML = `<p class="empty">${esc(t("failed"))}</p>`; });
