(() => {
  "use strict";
  const C = window.PORTFOLIO || {};
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const mobile = matchMedia("(max-width: 760px)");

  const el = (tag, attrs = {}, ...children) => {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") node.className = v;
      else if (k === "html") node.innerHTML = v;
      else if (k === "style") node.setAttribute("style", v);
      else if (v !== undefined && v !== null && v !== false) node.setAttribute(k, v);
    }
    for (const c of children.flat()) if (c != null && c !== false) node.append(c);
    return node;
  };
  const external = (href) => ({ href, target: "_blank", rel: "noopener noreferrer" });

  const ICONS = {
    github:
      '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z"/></svg>',
    linkedin:
      '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>',
    link:
      '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    arrow:
      '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    lock:
      '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    star: '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>',
  };
  const iconFor = (label = "") => ICONS[label.toLowerCase()] || ICONS.link;
  const norm = (url = "") => url.toLowerCase().replace(/\/+$/, "");

  /* ---------- Textes simples ---------- */
  $$("[data-bind]").forEach((n) => {
    const key = n.dataset.bind;
    if (key === "initials") n.textContent = (C.name || "P").split(/\s+/).map((w) => w[0]).join("").toUpperCase();
    else if (C[key]) n.textContent = C[key];
  });
  $("#year").textContent = new Date().getFullYear();
  if (C.available) {
    $("#availabilityText").textContent = C.availabilityText || "Disponible";
    $("#availability").hidden = false;
  }
  if (C.cv) Object.assign($("#cvLink"), { href: C.cv, hidden: false });

  /* ---------- Accueil : domaines + carte « en bref » ---------- */
  $("#domains").append(...(C.domains || []).map((d) => el("li", {}, d)));
  $("#facts").append(...(C.facts || []).flatMap((f) => [el("dt", {}, f.label), el("dd", {}, f.value)]));
  $("#heroSocials").append(
    ...(C.socials || []).map((s) => el("li", {}, el("a", { ...external(s.url), "aria-label": s.label, html: `${iconFor(s.label)}<span>${s.label}</span>` })))
  );

  /* ---------- Profil ---------- */
  $("#aboutText").append(...(C.about || []).map((p) => el("p", {}, p)));

  /* ---------- Projet phare ---------- */
  const tagList = (tags = [], cls = "tags") => el("ul", { class: cls, "aria-label": "Technologies" }, tags.map((t) => el("li", {}, t)));
  const linkButtons = (p, cls = "btn btn--sm") => {
    const out = [];
    if (p.repo) out.push(el("a", { class: cls, ...external(p.repo), "aria-label": `Code source de ${p.title} sur GitHub`, html: `${ICONS.github}<span>Code</span>` }));
    if (p.demo) out.push(el("a", { class: cls, ...external(p.demo), "aria-label": `Démo de ${p.title}`, html: `${ICONS.link}<span>Démo</span>` }));
    return out;
  };

  const f = C.featured;
  if (f) {
    const box = $("#featured");
    const links = linkButtons(f, "btn");
    box.append(
      el("div", { class: "featured__top" },
        el("div", { class: "featured__head" },
          el("span", { class: "status" }, el("span", { class: "dot" }), f.status || "En cours"),
          el("h3", { class: "featured__title" }, f.title),
          f.subtitle ? el("p", { class: "featured__subtitle" }, f.subtitle) : null),
        f.pipeline
          ? el("ol", { class: "pipeline", "aria-label": "Fonctionnement" }, f.pipeline.map((s, i) => el("li", { style: `--i:${i}` }, s)))
          : null),
      el("div", { class: "featured__body" },
        el("div", { class: "ps" },
          el("div", {}, el("h4", {}, "Le problème"), el("p", {}, f.problem)),
          el("div", {}, el("h4", {}, "La solution"), el("p", {}, f.solution))),
        f.machines
          ? el("ul", { class: "machines", "aria-label": "Architecture" },
              f.machines.map((m) => el("li", {}, el("strong", {}, m.name), el("span", {}, m.role))))
          : null),
      el("h4", { class: "featured__label" }, "Points techniques"),
      el("ul", { class: "featured__list" }, (f.highlights || []).map((h) => el("li", {}, h))),
      el("div", { class: "featured__foot" },
        tagList(f.tags, "chips"),
        el("div", { class: "featured__links" },
          f.caseStudy ? el("a", { class: "btn btn--gold", href: f.caseStudy }, "Découvrir ORION", el("span", { "aria-hidden": "true" }, "→")) : null,
          links,
          links.length ? null : el("span", { class: "private", html: `${ICONS.lock} Code privé` })))
    );
    box.hidden = false;
  }

  /* ---------- Projets principaux ---------- */
  const projects = C.projects || [];
  const projectCard = (p, i) =>
    el("article", { class: "project reveal", "data-cat": p.category || "", style: `--i:${i}` },
      el("div", { class: "project__top" },
        el("p", { class: "project__kind" }, p.kind || p.category || ""),
        el("div", { class: "project__links" }, linkButtons(p))),
      el("h3", { class: "project__title" }, p.title),
      el("dl", { class: "project__ps" },
        el("dt", {}, "Contexte"), el("dd", {}, p.problem),
        el("dt", {}, "Réalisation"), el("dd", {}, p.solution)),
      tagList(p.tags));
  $("#projectsGrid").append(...projects.map(projectCard));

  /* ---------- Projets secondaires ---------- */
  const miniCard = (p, i = 0) => {
    const href = p.repo || p.demo;
    const card = el("article", { class: "mini reveal", "data-cat": p.category || "", style: `--i:${i}` },
      el("div", { class: "mini__head" },
        el("h4", {}, href ? el("a", { ...external(href), class: "mini__link" }, p.title) : p.title),
        href ? el("span", { class: "mini__icon", html: ICONS.arrow }) : null),
      p.description ? el("p", {}, p.description) : null,
      p.meta || null,
      tagList(p.tags));
    return card;
  };
  const secondary = C.secondary || [];
  if (secondary.length) {
    $("#secondaryTitle").hidden = false;
    $("#secondaryGrid").append(...secondary.map(miniCard));
  }

  /* ---------- Filtres par catégorie ---------- */
  const all = [...projects, ...secondary];
  const cats = [...new Set(all.map((p) => p.category).filter(Boolean))];
  if (cats.length > 1) {
    const filters = $("#filters");
    const make = (label, value) => el("button", { class: "filter", type: "button", "data-filter": value, "aria-pressed": "false" }, label);
    filters.append(make("Tous", "*"), ...cats.map((c) => make(c, c)));
    const apply = (value) => {
      $$(".filter", filters).forEach((b) => {
        const on = b.dataset.filter === value;
        b.classList.toggle("active", on);
        b.setAttribute("aria-pressed", String(on));
      });
      $$("#projectsGrid .project, #secondaryGrid .mini").forEach((card) => {
        card.hidden = value !== "*" && card.dataset.cat !== value;
      });
      $("#secondaryTitle").hidden = !$$("#secondaryGrid .mini").some((c) => !c.hidden);
    };
    filters.addEventListener("click", (e) => {
      const b = e.target.closest(".filter");
      if (b) apply(b.dataset.filter);
    });
    apply("*");
  }

  /* ---------- Autres dépôts GitHub (chargés dynamiquement) ---------- */
  async function loadGitHub() {
    if (!C.github) return;
    const section = $("#ghSection");
    const grid = $("#ghGrid");
    const count = mobile.matches ? Math.min(C.githubRepoCount || 6, 4) : C.githubRepoCount || 6;
    $("#ghMore").href = `https://github.com/${C.github}?tab=repositories`;
    const known = new Set([f, ...all].filter(Boolean).map((p) => norm(p.repo)).filter(Boolean));
    const excluded = new Set((C.githubExclude || []).map((n) => n.toLowerCase()));
    try {
      const res = await fetch(`https://api.github.com/users/${encodeURIComponent(C.github)}/repos?sort=pushed&per_page=30`);
      if (!res.ok) throw new Error(res.status);
      const repos = (await res.json())
        .filter((r) => !r.fork && !r.archived && !known.has(norm(r.html_url)) && !excluded.has(r.name.toLowerCase()))
        .slice(0, count);
      if (!repos.length) return;
      grid.append(
        ...repos.map((r) => {
          const meta = el("div", { class: "meta" });
          if (r.stargazers_count) meta.append(el("span", { html: `${ICONS.star} ${r.stargazers_count}` }));
          meta.append(el("span", {}, `Mis à jour ${new Date(r.pushed_at).toLocaleDateString("fr-FR", { month: "short", year: "numeric" })}`));
          const card = miniCard({ title: r.name.replace(/[-_]+/g, " "), description: r.description, tags: [r.language].filter(Boolean), repo: r.html_url, meta });
          card.classList.add("visible");
          return card;
        })
      );
      section.hidden = false;
    } catch {
      /* Réseau ou quota GitHub : la section reste masquée, le lien vers GitHub suffit. */
    }
  }
  loadGitHub();

  /* ---------- Compétences ---------- */
  $("#skillsGrid").append(
    ...(C.skills || []).map((g, i) =>
      el("section", { class: "skill-group reveal", style: `--i:${i}`, "aria-label": g.group },
        el("h3", {}, g.group),
        el("ul", {}, g.items.map((it) => {
          const item = typeof it === "string" ? { name: it } : it;
          return el("li", {}, el("span", { class: "skill-name" }, item.name), item.where ? el("span", { class: "skill-where" }, item.where) : null);
        })))
    )
  );

  /* ---------- Parcours ---------- */
  $("#timeline").append(
    ...(C.experience || []).map((x, i) =>
      el("li", { class: "reveal", style: `--i:${i}` },
        el("span", { class: "period" }, x.period),
        el("div", { class: "timeline__card" },
          el("h3", {}, x.title),
          el("p", { class: "place" }, x.place),
          x.text ? el("p", { class: "timeline__text" }, x.text) : null,
          x.skills ? tagList(x.skills, "chips chips--sm") : null))
    )
  );

  /* ---------- Contact ---------- */
  const mailto = `mailto:${C.email || ""}`;
  Object.assign($("#emailLink"), { textContent: C.email || "", href: mailto });
  $("#mailBtn").href = mailto;
  $("#contactSocials").append(
    ...(C.socials || []).map((s) =>
      el("li", {}, el("a", { class: "contact-link", ...external(s.url) },
        el("span", { class: "contact-link__icon", html: iconFor(s.label) }),
        el("span", { class: "contact-link__text" }, el("strong", {}, s.label), el("span", {}, s.handle || s.url.replace(/^https?:\/\/(www\.)?/, ""))),
        el("span", { class: "contact-link__arrow", html: ICONS.arrow })))
    )
  );

  const toast = $("#toast");
  const showToast = (msg) => {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(showToast.t);
    showToast.t = setTimeout(() => toast.classList.remove("show"), 2200);
  };
  const copyBtn = $("#copyEmail");
  copyBtn.addEventListener("click", async () => {
    const label = $("span", copyBtn);
    try {
      await navigator.clipboard.writeText(C.email);
      copyBtn.classList.add("is-done");
      label.textContent = "Adresse copiée";
      showToast("Adresse e-mail copiée dans le presse-papiers");
      clearTimeout(copyBtn.t);
      copyBtn.t = setTimeout(() => {
        copyBtn.classList.remove("is-done");
        label.textContent = "Copier l'adresse";
      }, 2200);
    } catch {
      showToast(C.email);
    }
  });

  /* ---------- Thème ---------- */
  const root = document.documentElement;
  const themeBtn = $("#themeToggle");
  const currentTheme = () => root.dataset.theme || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  const syncThemeLabel = () => themeBtn.setAttribute("aria-label", currentTheme() === "light" ? "Passer au thème sombre" : "Passer au thème clair");
  syncThemeLabel();
  themeBtn.addEventListener("click", () => {
    const next = currentTheme() === "light" ? "dark" : "light";
    root.classList.add("theme-anim");
    root.dataset.theme = next;
    setTimeout(() => root.classList.remove("theme-anim"), 400);
    try { localStorage.setItem("theme", next); } catch {}
    syncThemeLabel();
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
  addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks.classList.contains("open")) {
      setMenu(false);
      menuBtn.focus();
    }
  });
  matchMedia("(min-width: 761px)").addEventListener("change", (e) => e.matches && setMenu(false));
  menuBtn.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
  navLinks.addEventListener("click", (e) => e.target.closest("a") && setMenu(false));

  /* ---------- Défilement : nav, barre de progression ---------- */
  const nav = $(".nav");
  const bar = $("#progress");
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - innerHeight;
      nav.classList.toggle("scrolled", scrollY > 10);
      bar.style.transform = `scaleX(${max > 0 ? Math.min(scrollY / max, 1) : 0})`;
      ticking = false;
    });
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Lien actif dans la nav ---------- */
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        $$(".nav__links a").forEach((a) => {
          const on = a.getAttribute("href") === `#${e.target.id}`;
          a.classList.toggle("active", on);
          if (on) a.setAttribute("aria-current", "true");
          else a.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  $$("main section[id]").forEach((s) => spy.observe(s));

  /* ---------- Apparition au défilement ---------- */
  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    $$(".reveal").forEach((n) => n.classList.add("visible"));
  } else {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("visible"), io.unobserve(e.target))),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    $$(".reveal").forEach((n) => io.observe(n));
  }
})();
