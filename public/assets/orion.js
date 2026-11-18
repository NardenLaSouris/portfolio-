(() => {
  "use strict";
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

  // Captures réelles d'ORION Control en production (18 novembre 2026), pages sans donnée personnelle.
  // Pour en ajouter : déposer l'image dans public/assets/orion/ puis la lister ici.
  const SHOTS = [
    { src: "/assets/orion/control-tableau-de-bord.webp", alt: "ORION Control : tableau de bord, ORION opérationnelle, services en ligne, programme et activité récente", caption: "Tableau de bord : ORION opérationnelle, services, programme, activité récente", w: 1440, h: 900 },
    { src: "/assets/orion/control-autonomie.webp", alt: "ORION Control : autonomie active, registre de 18 472 lignes au chaînage intact, ressources", caption: "Autonomie : interrupteur, arrêt d'urgence, registre de 18 472 lignes au chaînage intact", w: 1440, h: 900 },
    { src: "/assets/orion/control-sante.webp", alt: "ORION Control : santé des ressources surveillées par SENTINEL, disponibilité sur 7 jours", caption: "Santé : ressources surveillées par SENTINEL et leur disponibilité sur 7 jours", w: 1440, h: 900 },
    { src: "/assets/orion/control-materiel.webp", alt: "ORION Control : matériel du Core et des PC, charge, mémoire, disques et températures", caption: "Matériel : le Core et les PC tels qu'ORION les lit", w: 1440, h: 900 },
    { src: "/assets/orion/control-outils.webp", alt: "ORION Control : liste des 197 outils avec domaine, niveau de risque et disponibilité", caption: "Outils : 197 outils, chacun avec son niveau de risque", w: 1440, h: 900 },
    { src: "/assets/orion/control-actualites.webp", alt: "ORION Control : module NEWS avec 32 sources, 500 événements, bulletins et réglages", caption: "Actualités : 32 sources, bulletins et seuils de NEWS", w: 1440, h: 900 },
    { src: "/assets/orion/control-evolution.webp", alt: "ORION Control : module EVOLVE, niveau, anomalies, correctifs et propositions", caption: "Évolution : niveau d'EVOLVE, anomalies et propositions", w: 1440, h: 900 },
  ];

  // Fond d'écran d'ORION (Wallpaper Engine) : déposer les captures dans public/assets/orion/ puis les lister ici,
  // dans cet ordre si possible. Masquer avant : agenda, rappels, notes, présence, montants, adresses.
  //   { src: "/assets/orion/wallpaper-principal.webp", alt: "…", caption: "Fond d'écran principal : le visage au centre…", w: …, h: … }
  //   { src: "/assets/orion/wallpaper-stats-paysage.webp", … caption: "Écran paysage : services et autonomie" }
  //   { src: "/assets/orion/wallpaper-stats-portrait.webp", … caption: "Écran portrait : modules" }
  // La section reste masquée tant que la liste est vide.
  const WALLPAPERS = [
    { src: "/assets/orion/wallpaper-principal.webp", alt: "Fond d'écran principal d'ORION : sphère animée reliée aux machines, horloge, météo, santé du Core, état des PC, agenda et post-it ; présence, montants et nom du modèle floutés", caption: "Fond d'écran principal : le cœur d'ORION relié à ses machines, météo, santé et activité (présence, montants et modèle floutés)", w: 1920, h: 1080 },
    { src: "/assets/orion/wallpaper-stats-paysage.webp", alt: "Écran paysage : disponibilité des services sur 7 jours, autonomie, sauvegarde de la nuit, terminaux, appels et état des modules", caption: "Écran paysage : services, autonomie, sauvegarde de la nuit et modules", w: 1920, h: 1080 },
    { src: "/assets/orion/wallpaper-stats-portrait.webp", alt: "Écran portrait : modules d'ORION (NEWS, WATCH, EVOLVE, jeux, agenda, missions…), finance floutée", caption: "Écran portrait : les modules (finance floutée)", w: 1080, h: 1920 },
  ];

  // Le visage d'ORION, capturé dans ses quatre états (page réelle orion/face/static).
  const FACES = {
    standby: { src: "/assets/orion/visage-standby.webp", label: "Veille", text: "En veille, tant qu'elle n'a pas entendu « ORION » : les anneaux tournent lentement, la lueur est atténuée, le motif reste simple." },
    listening: { src: "/assets/orion/visage-listening.webp", label: "Écoute", text: "Après « ORION », les anneaux s'ouvrent et les axes s'éclairent pendant qu'elle écoute." },
    thinking: { src: "/assets/orion/visage-thinking.webp", label: "Réflexion", text: "Pendant qu'elle réfléchit, les anneaux tournent plus vite et le motif se densifie." },
    speaking: { src: "/assets/orion/visage-speaking.webp", label: "Réponse", text: "Quand elle répond, le visage suit le niveau de sa voix." },
  };

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
    const siblings = CONTROL.find(([g]) => g === group)[1].filter(([n]) => n !== name);
    controlView.replaceChildren(
      el("p", { class: "o-window__group" }, group),
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

  // Captures : la première en grand, les suivantes en galerie ; toutes s'agrandissent au clic.
  // Galeries de captures : la première en grand, les suivantes en dessous ; toutes s'agrandissent au clic.
  const gallery = (list, gridId, boxId) => {
    if (!list.length) return;
    const open = (i, trigger) => window.Lightbox && window.Lightbox.open(list, i, trigger);
    const tile = (s, i, cls) => {
      const b = el("button", { class: cls, type: "button", "aria-label": `Agrandir : ${s.caption || s.alt}` },
        el("img", { src: s.src, alt: s.alt, width: s.w, height: s.h, loading: "lazy", decoding: "async" }));
      b.addEventListener("click", () => open(i, b));
      return el("figure", {}, b, s.caption ? el("figcaption", {}, s.caption) : null);
    };
    $(gridId).append(tile(list[0], 0, "o-shot o-shot--main"), ...list.slice(1).map((s, i) => tile(s, i + 1, "o-shot")));
    $(boxId).hidden = false;
  };
  gallery(SHOTS, "#controlShotsGrid", "#controlShots");
  gallery(WALLPAPERS, "#wallShotsGrid", "#wallShots");

  /* ---------- Le visage : la vraie page, animée, pilotée par les onglets ---------- */
  // Sans « réduire les animations », la page réelle du visage (copie dans /orion-visage/) tourne dans un cadre et
  // reçoit l'état par son API, OrionFace.setVisualState() ; sinon, les captures fixes de chaque état.
  const faceBox = $("#faceStates");
  if (faceBox) {
    const stage = $("#faceStage");
    const img = $("#faceImg");
    const txt = $("#faceText");
    let frame = null;
    let current = "standby";
    const api = () => {
      try { return frame && frame.contentWindow && (frame.contentWindow.OrionFace || frame.contentWindow.JarvisFace); } catch { return null; }
    };
    const push = () => { const f = api(); if (f) f.setVisualState(current); };

    if (!reducedMotion.matches) {
      frame = el("iframe", { class: "o-face__frame", src: "/orion-visage/index.html", title: "Visage animé d'ORION", loading: "lazy", tabindex: "-1" });
      // Le visage ne répond pas (page bloquée, script refusé) : le cadre est retiré, la capture fixe reste.
      frame.addEventListener("load", () => {
        if (!api()) { frame.remove(); frame = null; $("#faceNote").textContent = "Captures de la page réelle du visage, dans ses quatre états."; return; }
        push();
        stage.classList.add("is-live");
      });
      stage.append(frame);
      $("#faceNote").textContent = "La vraie page du visage d'ORION, animée en direct ; les onglets lui donnent son état.";
      // Hors de l'écran, le cadre est masqué : le navigateur n'anime plus le visage.
      new IntersectionObserver((entries) => entries.forEach((e) => { if (frame) frame.style.visibility = e.isIntersecting ? "visible" : "hidden"; }))
        .observe(stage);
    }

    const tabs = Object.entries(FACES).map(([key, f]) => {
      const b = el("button", { type: "button", role: "tab", class: "o-face__tab", "aria-selected": "false", "data-state": key }, f.label);
      b.addEventListener("click", () => {
        tabs.forEach((t) => t.setAttribute("aria-selected", String(t === b)));
        current = key;
        txt.textContent = f.text;
        if (frame) return push();
        img.classList.remove("is-in");
        requestAnimationFrame(() => {
          img.src = f.src;
          img.alt = `Le visage d'ORION en état : ${f.label.toLowerCase()}`;
          img.classList.add("is-in");
        });
      });
      return b;
    });
    faceBox.append(...tabs);
    tabs[0].click();
  }

  /* ---------- Terminal : captures agrandissables ---------- */
  const TERMINAL = [
    { src: "/assets/orion/terminal-panneau.webp", alt: "Panneau du terminal ORION OS : lumières, mode intimité, volume, écran et réglages", caption: "Le panneau, ouvert d'un toucher sur le visage" },
    { src: "/assets/orion/terminal-visage.webp", alt: "Visage d'ORION en plein écran sur le terminal, en paysage", caption: "Au repos : le visage d'ORION en plein écran" },
    { src: "/assets/orion/terminal-reglages.webp", alt: "Réglages du terminal : appairage au Core, Wi-Fi, son et luminosité (réseau masqué)", caption: "Les réglages : appairage, Wi-Fi, son, luminosité (réseau masqué)" },
  ];
  $$(".o-phone__shot").forEach((b) => b.addEventListener("click", () => window.Lightbox && window.Lightbox.open(TERMINAL, Number(b.dataset.i), b)));

  /* ---------- Constellation : liens du Core vers chaque élément ---------- */
  const sky = $("#skyLines");
  if (sky) {
    const NS = "http://www.w3.org/2000/svg";
    const core = $(".o-sky__core");
    const cx = parseFloat(core.style.getPropertyValue("--x"));
    const cy = parseFloat(core.style.getPropertyValue("--y"));
    $$("#skyNodes li[data-s]").forEach((li) => {
      const line = document.createElementNS(NS, "line");
      line.setAttribute("x1", cx);
      line.setAttribute("y1", cy);
      line.setAttribute("x2", parseFloat(li.style.getPropertyValue("--x")));
      line.setAttribute("y2", parseFloat(li.style.getPropertyValue("--y")));
      line.setAttribute("class", `o-sky__line o-sky__line--${li.dataset.s}`);
      line.setAttribute("vector-effect", "non-scaling-stroke");
      sky.append(line);
      // Étiquette du côté opposé au Core, pour que le lien n'arrive jamais à travers le texte.
      if (parseFloat(li.style.getPropertyValue("--y")) < cy) li.classList.add("is-up");
    });
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
