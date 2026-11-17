(() => {
  "use strict";
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

  // Captures réelles d'ORION Control : déposer les images dans public/assets/orion/ puis les lister ici.
  // Exemple : { src: "/assets/orion/tableau-de-bord.webp", alt: "Tableau de bord d'ORION Control", caption: "Tableau de bord" }
  const SHOTS = [];

  const el = (tag, attrs = {}, ...children) => {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") node.className = v;
      else if (v !== undefined && v !== null && v !== false) node.setAttribute(k, v);
    }
    for (const c of children.flat()) if (c != null && c !== false) node.append(c);
    return node;
  };

  $("#year").textContent = new Date().getFullYear();

  /* ---------- Architecture : composants ---------- */
  const NODES = {
    wake: {
      kicker: "Entrée",
      title: "WAKE WORD",
      text: "Elle écoute en continu le mot « ORION » avec un modèle openWakeWord entraîné sur mesure en français. Une seconde vérification par Whisper écarte les faux réveils avant d'ouvrir l'écoute.",
      meta: [["Tourne sur", "Core (son relayé par l'agent du PC fixe)"], ["Technologie", "openWakeWord, Whisper"], ["Relié à", "STT"]],
    },
    stt: {
      kicker: "Entrée",
      title: "STT",
      text: "La phrase prononcée est transcrite par faster-whisper sur le GPU du PC portable. Si le GPU ne répond pas, la transcription repasse sur le processeur du Core, plus lente mais disponible.",
      meta: [["Tourne sur", "PC portable (GPU), repli sur le Core"], ["Technologie", "faster-whisper"], ["Relié à", "CORE"]],
    },
    core: {
      kicker: "Décision",
      title: "CORE",
      text: "Le cœur d'ORION. Il reçoit le texte, reconnaît d'abord les commandes simples sans LLM, sinon interroge le LLM, vérifie l'outil proposé, demande confirmation quand il le faut, garde le contexte de la conversation et expose l'API d'administration.",
      meta: [["Tourne sur", "Core, service systemd durci"], ["Langage", "Python"], ["Relié à", "LLM, AUTONOMY, MODULES, TTS"]],
    },
    llm: {
      kicker: "Décision",
      title: "LLM",
      text: "Le modèle de langage comprend la demande et propose un outil avec ses paramètres, sous forme de JSON validé contre un schéma. Il conseille ; les règles du Core décident. Aucune décision sensible ne dépend de lui.",
      meta: [["Tourne sur", "PC portable (GPU), secours sur le Core"], ["Modèles", "Qwen3 8B, Qwen2.5 3B en secours"], ["Relié à", "CORE"]],
    },
    autonomy: {
      kicker: "Décision",
      title: "AUTONOMY",
      text: "Le moteur de permissions central. Il sait qui demande (moi, ORION Control, une tâche programmée ou un module), quelle capacité est en jeu, et l'état de l'interrupteur d'autonomie. Les capacités sensibles attendent ma confirmation. Chaque décision est inscrite dans un registre chaîné par SHA-256.",
      meta: [["Capacités", "lecture, notification, appel, appareils, données, message, dépense, suppression, code"], ["En cas de doute", "refus"], ["Relié à", "CORE, MODULES, ORION Control"]],
    },
    modules: {
      kicker: "Action",
      title: "MODULES",
      text: "Les outils et les modules qui agissent : lumières, musique, PC, minuteurs et rappels, agenda, mails, appels, et les modules du socle V3 comme NEWS, WATCH, SENTINEL ou EVOLVE. Un module en échec est isolé sans arrêter les autres.",
      meta: [["Socle", "orion/platform : base SQLite, planificateur, alertes, historique"], ["Modules", "16"], ["Relié à", "CORE, AUTONOMY"]],
    },
    tts: {
      kicker: "Action",
      title: "TTS",
      text: "Elle répond avec Piper et une voix entraînée pour elle. La réponse du LLM est découpée en phrases et dite au fur et à mesure, sans attendre la fin du texte. Le son repart vers les haut-parleurs du PC fixe.",
      meta: [["Tourne sur", "Core"], ["Technologie", "Piper, voix « orion » entraînée"], ["Relié à", "CORE"]],
    },
    infra: {
      kicker: "Socle",
      title: "INFRASTRUCTURE",
      text: "Trois machines et un terminal, un service systemd surveillé par un watchdog, un déploiement scripté avec contrôle de santé et retour automatique, des sauvegardes vérifiées chaque nuit et SENTINEL pour la supervision.",
      meta: [["Machines", "Core, PC portable, PC fixe, terminal ORION OS"], ["Supervision", "SENTINEL, contrôle de santé toutes les 2 min"], ["Voir", "section Infrastructure"]],
    },
  };

  const panel = { kicker: $("#archKicker"), title: $("#archTitle"), text: $("#archText"), meta: $("#archMeta") };
  const nodes = $$("#archDiagram .o-node");
  const traceItems = $$("#traceSteps li");

  function select(key, { fromTrace = false } = {}) {
    const n = NODES[key];
    if (!n) return;
    nodes.forEach((b) => {
      const on = b.dataset.node === key;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", String(on));
    });
    panel.kicker.textContent = n.kicker;
    panel.title.textContent = n.title;
    panel.text.textContent = n.text;
    panel.meta.replaceChildren(...n.meta.flatMap(([k, v]) => [el("dt", {}, k), el("dd", {}, v)]));
    if (!fromTrace) stopTrace();
  }
  nodes.forEach((b) => b.addEventListener("click", () => select(b.dataset.node)));

  /* ---------- Trajet d'une demande ---------- */
  const traceBtn = $("#traceBtn");
  let traceTimer = null;
  let traceIndex = -1;
  function stopTrace() {
    clearTimeout(traceTimer);
    traceTimer = null;
    traceIndex = -1;
    traceItems.forEach((li) => li.classList.remove("is-current", "is-done"));
    $("#archDiagram").classList.remove("is-tracing");
    $("span", traceBtn).textContent = "Suivre une demande";
  }
  function stepTrace() {
    traceIndex += 1;
    if (traceIndex >= traceItems.length) {
      traceTimer = setTimeout(stopTrace, 1600);
      return;
    }
    traceItems.forEach((li, i) => {
      li.classList.toggle("is-current", i === traceIndex);
      li.classList.toggle("is-done", i < traceIndex);
    });
    select(traceItems[traceIndex].dataset.node, { fromTrace: true });
    traceTimer = setTimeout(stepTrace, reducedMotion.matches ? 2600 : 1900);
  }
  traceBtn.addEventListener("click", () => {
    if (traceTimer) return stopTrace();
    stopTrace();
    $("#archDiagram").classList.add("is-tracing");
    $("span", traceBtn).textContent = "Arrêter";
    stepTrace();
  });
  traceItems.forEach((li) => {
    li.tabIndex = 0;
    const go = () => { stopTrace(); select(li.dataset.node); };
    li.addEventListener("click", go);
    li.addEventListener("keydown", (e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), go()));
  });
  select("core");

  /* ---------- ORION Control : les 26 pages réelles ---------- */
  const CONTROL = [
    ["Vue d'ensemble", [["Tableau de bord", "L'état d'ORION, ce qui demande votre attention et ce qui est prévu."]]],
    ["Pilotage", [
      ["Autonomie", "L'interrupteur d'autonomie, les confirmations, les tâches, les autorisations et le registre d'actions."],
      ["Routines", "Ce qu'ORION fait d'elle-même : déclencheurs, actions, prochaines exécutions."],
      ["Modes", "Le mode de la maison et le silence d'ORION."],
    ]],
    ["Activité", [
      ["Historique", "Ce que les routines et les outils ont réellement fait, dans l'ordre."],
      ["Notifications", "Ce qu'ORION vous a dit, par quel canal, et ce qu'elle a gardé pour elle."],
    ]],
    ["Maison", [
      ["Maison", "Vos pièces, vos appareils, vos scènes et vos automatisations, tels qu'ORION les lit."],
      ["Appareils", "Les ordinateurs et les lumières qu'ORION connaît."],
      ["Listes et notes", "Vos listes, vos tâches et vos notes."],
      ["Agenda Google", "L'état de la lecture de votre agenda."],
    ]],
    ["Finance", [["Finance", "Vos comptes, vos soldes et vos opérations, saisis à la main : aucune connexion bancaire, aucun paiement."]]],
    ["Intelligence", [
      ["Connaissances", "Ce qu'ORION sait de vous, d'où elle le tient, et ce qui se contredit."],
      ["Mes intérêts", "Les sujets qu'ORION pense que vous suivez."],
      ["Actualités", "Le journal, les bulletins, les alertes et leurs sources."],
      ["Surveillances", "Ce qu'ORION surveille pour vous et ce qu'elle a trouvé."],
      ["Projets", "Vos dépôts GitHub suivis, lus par ORION en lecture seule."],
      ["Évolution", "Les anomalies vues par ORION et les améliorations qu'elle propose. Rien n'est déployé d'ici."],
      ["Outils", "Ce qu'ORION sait faire, avec quel risque, et ce qui est disponible maintenant."],
    ]],
    ["Infrastructure", [
      ["Santé", "Les ressources dont ORION dépend et leurs incidents."],
      ["Matériel", "Le Core, les disques et les autres machines, tels qu'ORION les lit."],
    ]],
    ["Applications", [
      ["ORION APPS", "Les applications reliées, leurs permissions et leurs demandes."],
      ["Gaming", "Les consoles, le PC de jeu et le temps de jeu observé."],
      ["Discord", "Le salon vocal du PC, piloté par l'agent Windows."],
      ["Frag Factory", "L'atelier de clips, vu d'ORION."],
      ["Achats", "Les mandats d'achat et ce qu'ORION en a fait."],
    ]],
    ["ORION Control", [["Paramètres", "La liaison avec le Core et l'apparence de cette application."]]],
  ];
  const controlNav = $("#controlNav");
  const controlView = $("#controlView");
  const buttons = () => $$("button", controlNav);
  const showPage = (group, name, desc, btn) => {
    buttons().forEach((b) => {
      b.classList.toggle("is-active", b === btn);
      b.setAttribute("aria-pressed", String(b === btn));
    });
    const index = buttons().indexOf(btn) + 1;
    const siblings = CONTROL.find(([g]) => g === group)[1].filter(([n]) => n !== name);
    controlView.replaceChildren(
      el("p", { class: "o-window__group" }, `${group} · page ${index} sur ${buttons().length}`),
      el("h4", {}, name),
      el("p", { class: "o-window__desc" }, desc),
      siblings.length
        ? el("div", { class: "o-window__more" },
            el("p", {}, "Dans le même groupe"),
            el("div", {}, siblings.map(([n]) => {
              const b = el("button", { type: "button", class: "o-window__chip" }, n);
              b.addEventListener("click", () => buttons().find((x) => x.textContent === n).click());
              return b;
            })))
        : null
    );
  };
  CONTROL.forEach(([group, pages]) => {
    controlNav.append(el("p", { class: "o-window__navgroup" }, group));
    pages.forEach(([name, desc]) => {
      const b = el("button", { type: "button", "aria-pressed": "false" }, name);
      b.addEventListener("click", () => showPage(group, name, desc, b));
      controlNav.append(b);
    });
  });
  const firstAutonomy = $$("button", controlNav).find((b) => b.textContent === "Autonomie");
  firstAutonomy.click();

  if (SHOTS.length) {
    $("#controlShotsGrid").append(
      ...SHOTS.map((s) => el("figure", {}, el("img", { src: s.src, alt: s.alt, loading: "lazy", decoding: "async" }), s.caption ? el("figcaption", {}, s.caption) : null))
    );
    $("#controlShots").hidden = false;
  }

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
    if (e.key === "Escape" && navLinks.classList.contains("open")) { setMenu(false); menuBtn.focus(); }
  });
  matchMedia("(min-width: 761px)").addEventListener("change", (e) => e.matches && setMenu(false));
  menuBtn.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
  navLinks.addEventListener("click", (e) => e.target.closest("a") && setMenu(false));

  /* ---------- Défilement : nav, progression ---------- */
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

  /* ---------- Étape active (nav + parcours) ---------- */
  const links = [...$$(".nav__links a"), ...$$("#oSteps a")];
  const spy = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) => {
        const on = a.getAttribute("href") === `#${e.target.id}`;
        a.classList.toggle("active", on);
        if (on) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    }),
    { rootMargin: "-45% 0px -50% 0px" }
  );
  $$("main section[id]").forEach((s) => spy.observe(s));

  /* ---------- Apparition au défilement ---------- */
  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    $$(".reveal").forEach((n) => n.classList.add("visible"));
  } else {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("visible"), io.unobserve(e.target))),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    $$(".reveal").forEach((n) => io.observe(n));
  }
})();
