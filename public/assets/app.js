(() => {
  "use strict";
  const C = window.PORTFOLIO || {};
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  const el = (tag, attrs = {}, ...children) => {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") node.className = v;
      else if (k === "html") node.innerHTML = v;
      else if (v !== undefined && v !== null && v !== false) node.setAttribute(k, v);
    }
    for (const c of children.flat()) if (c != null) node.append(c);
    return node;
  };

  const ICONS = {
    github:
      '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z"/></svg>',
    linkedin:
      '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>',
    link:
      '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    folder:
      '<svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    star: '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>',
  };
  const iconFor = (label = "") => ICONS[label.toLowerCase()] || ICONS.link;

  /* ---------- Textes simples ---------- */
  document.title = `${C.name || "Portfolio"} — ${C.role || "Portfolio"}`;
  $$("[data-bind]").forEach((n) => {
    const key = n.dataset.bind;
    if (key === "initials") {
      n.textContent = `<${(C.name || "P").slice(0, 2)} />`;
    } else if (C[key]) n.textContent = C[key];
  });
  $("#year").textContent = new Date().getFullYear();
  if (C.available) $("#availability").hidden = false;
  if (C.cv) Object.assign($("#cvLink"), { href: C.cv, hidden: false });

  /* ---------- Réseaux ---------- */
  const socialItems = () =>
    (C.socials || []).map((s) =>
      el("li", {}, el("a", { href: s.url, target: "_blank", rel: "noopener", html: `${iconFor(s.label)}<span>${s.label}</span>` }))
    );
  $("#heroSocials").append(...socialItems());
  $("#contactSocials").append(...socialItems());

  /* ---------- À propos ---------- */
  $("#aboutText").append(...(C.about || []).map((p) => el("p", {}, p)));
  $("#stats").append(...(C.stats || []).map((s) => el("li", {}, el("strong", {}, s.value), el("span", {}, s.label))));

  /* ---------- Compétences ---------- */
  $("#skillsGrid").append(
    ...(C.skills || []).map((g) =>
      el("article", { class: "skill-card reveal" }, el("h3", {}, g.group), el("ul", { class: "chips" }, g.items.map((i) => el("li", { class: "chip" }, i))))
    )
  );

  /* ---------- Projets ---------- */
  const projectCard = (p, compact = false) => {
    const links = el("div", { class: "project__links" });
    if (p.repo) links.append(el("a", { href: p.repo, target: "_blank", rel: "noopener", "aria-label": `Code source de ${p.title}`, html: ICONS.github }));
    if (p.demo) links.append(el("a", { href: p.demo, target: "_blank", rel: "noopener", "aria-label": `Démo de ${p.title}`, html: ICONS.link }));
    const card = el(
      "article",
      { class: "project reveal", "data-tags": (p.tags || []).join("|") },
      el("div", { class: "project__head" }, el("span", { class: "project__icon", html: ICONS.folder }), links),
      el(compact ? "h4" : "h3", {}, p.title),
      el("p", {}, p.description || "Pas de description."),
      p.meta || null,
      el("ul", { class: "tags" }, (p.tags || []).map((t) => el("li", {}, t)))
    );
    return card;
  };

  const projects = C.projects || [];
  $("#projectsGrid").append(...projects.map((p) => projectCard(p)));

  const allTags = [...new Set(projects.flatMap((p) => p.tags || []))];
  if (allTags.length > 1) {
    const filters = $("#filters");
    const make = (label, value) => el("button", { class: "filter", type: "button", "data-filter": value, "aria-pressed": "false" }, label);
    filters.append(make("Tous", "*"), ...allTags.map((t) => make(t, t)));
    const apply = (value) => {
      $$(".filter", filters).forEach((b) => {
        const on = b.dataset.filter === value;
        b.classList.toggle("active", on);
        b.setAttribute("aria-pressed", String(on));
      });
      $$("#projectsGrid .project").forEach((card) => {
        card.hidden = value !== "*" && !card.dataset.tags.split("|").includes(value);
      });
    };
    filters.addEventListener("click", (e) => {
      const b = e.target.closest(".filter");
      if (b) apply(b.dataset.filter);
    });
    apply("*");
  }

  /* ---------- Dépôts GitHub (chargés dynamiquement) ---------- */
  async function loadGitHub() {
    if (!C.github) return;
    const section = $("#ghSection");
    const grid = $("#ghGrid");
    const count = matchMedia("(max-width: 760px)").matches ? Math.min(C.githubRepoCount || 6, 4) : C.githubRepoCount || 6;
    section.hidden = false;
    $("#ghMore").href = `https://github.com/${C.github}?tab=repositories`;
    grid.append(...Array.from({ length: Math.min(count, 3) }, () => el("div", { class: "project skeleton" })));
    try {
      const res = await fetch(`https://api.github.com/users/${encodeURIComponent(C.github)}/repos?sort=updated&per_page=30`);
      if (!res.ok) throw new Error(res.status);
      const featured = new Set(projects.map((p) => (p.repo || "").toLowerCase().replace(/\/$/, "")));
      const repos = (await res.json())
        .filter((r) => !r.fork && !featured.has(r.html_url.toLowerCase()))
        .slice(0, count);
      grid.innerHTML = "";
      if (!repos.length) return (section.hidden = true);
      grid.append(
        ...repos.map((r) => {
          const meta = el("div", { class: "meta" });
          if (r.stargazers_count) meta.append(el("span", { html: `${ICONS.star} ${r.stargazers_count}` }));
          meta.append(el("span", {}, `MAJ ${new Date(r.pushed_at).toLocaleDateString("fr-FR", { month: "short", year: "numeric" })}`));
          const card = projectCard(
            { title: r.name, description: r.description, tags: [r.language, ...(r.topics || []).slice(0, 3)].filter(Boolean), repo: r.html_url, demo: r.homepage, meta },
            true
          );
          card.classList.add("visible");
          return card;
        })
      );
    } catch {
      section.hidden = true;
    }
  }
  loadGitHub();

  /* ---------- Parcours ---------- */
  $("#timeline").append(
    ...(C.experience || []).map((x) =>
      el("li", { class: "reveal" }, el("span", { class: "period" }, x.period), el("h3", {}, x.title), el("div", { class: "place" }, x.place), x.text ? el("p", {}, x.text) : null)
    )
  );

  /* ---------- Contact ---------- */
  const emailLink = $("#emailLink");
  emailLink.textContent = C.email || "";
  emailLink.href = `mailto:${C.email || ""}`;
  const toast = $("#toast");
  const showToast = (msg) => {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(showToast.t);
    showToast.t = setTimeout(() => toast.classList.remove("show"), 2000);
  };
  $("#copyEmail").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(C.email);
      showToast("Adresse copiée ✓");
    } catch {
      showToast(C.email);
    }
  });

  /* ---------- Thème ---------- */
  const root = document.documentElement;
  $("#themeToggle").addEventListener("click", () => {
    const current = root.dataset.theme || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    const next = current === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
  });

  /* ---------- Menu mobile ---------- */
  const menuBtn = $("#menuToggle");
  const navLinks = $("#navLinks");
  const setMenu = (open) => {
    navLinks.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    document.body.classList.toggle("menu-open", open);
  };
  addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));
  matchMedia("(min-width: 761px)").addEventListener("change", (e) => e.matches && setMenu(false));
  menuBtn.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
  navLinks.addEventListener("click", (e) => e.target.closest("a") && setMenu(false));

  /* ---------- Nav : ombre + lien actif ---------- */
  const nav = $(".nav");
  const onScroll = () => nav.classList.toggle("scrolled", scrollY > 10);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const sections = $$("main section[id]");
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        $$(".nav__links a").forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${e.target.id}`));
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => spy.observe(s));

  /* ---------- Apparition au défilement ---------- */
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("visible"), io.unobserve(e.target))),
    { threshold: 0.12 }
  );
  $$(".reveal").forEach((n) => io.observe(n));

  /* ---------- Effet machine à écrire sur le rôle ---------- */
  const typed = $("#typed");
  if (typed && C.role && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const text = C.role;
    typed.textContent = "";
    let i = 0;
    const tick = () => {
      typed.textContent = text.slice(0, ++i);
      if (i < text.length) setTimeout(tick, 55);
    };
    setTimeout(tick, 400);
  }
})();
