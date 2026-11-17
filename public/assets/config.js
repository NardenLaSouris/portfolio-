// ============================================================
//  CONTENU DU PORTFOLIO — modifie uniquement ce fichier
//  pour personnaliser ton site (textes, liens, projets...).
// ============================================================
window.PORTFOLIO = {
  name: "Jules NEVEU",
  role: "Développeur informatique",
  // Phrase d'accroche : factuelle, sans slogan
  tagline:
    "Je développe des applications web, des API et des outils en ligne de commande. En ce moment, je construis ORION, une assistante vocale qui pilote ma maison sans passer par le cloud.",
  location: "Nantes",
  available: true, // affiche le badge de disponibilité
  availabilityText: "Ouvert aux opportunités",
  email: "neveu.jules58@gmail.com",
  cv: "", // ex. "/assets/cv.pdf" (dépose le PDF dans public/assets/)

  // Domaines affichés sous l'accroche
  domains: ["Web full-stack", "API & back-end", "IA locale & automatisation", "Outils en ligne de commande"],

  // Pseudo GitHub : les autres dépôts publics sont chargés automatiquement
  github: "NardenLaSouris",
  githubRepoCount: 6,
  githubExclude: ["Forum-Project"], // dépôts à ne pas afficher (vides, brouillons...)

  socials: [
    { label: "GitHub", handle: "NardenLaSouris", url: "https://github.com/NardenLaSouris" },
    { label: "LinkedIn", handle: "Jules Neveu", url: "https://www.linkedin.com/in/jules-neveu-167645258" },
  ],

  about: [
    "J'aime suivre un projet en entier, du schéma de la base de données jusqu'à la mise en ligne.",
    "J'ai écrit des jeux en ligne de commande en Go et en TypeScript, et une application Express déployée sur Scalingo avec un camarade. Mon plus gros projet est ORION, une assistante vocale qui tourne sur trois machines de mon réseau.",
  ],

  // Faits rapides (factuels uniquement)
  facts: [
    { label: "Langages", value: "Go · TypeScript · JavaScript · Python · SQL · HTML · CSS" },
    { label: "En ce moment", value: "ORION, assistante vocale locale" },
    { label: "Localisation", value: "Nantes" },
  ],

  // Environnement technique, avec les projets où chaque outil est utilisé
  skills: [
    {
      group: "Langages",
      items: [
        { name: "Python", where: "ORION" },
        { name: "Go", where: "Hangman, Projet Red" },
        { name: "TypeScript", where: "RPG, app mobile ORION" },
        { name: "JavaScript", where: "TODO App, ce portfolio" },
        { name: "SQL", where: "GalaxiEat, TODO App" },
        { name: "HTML / CSS", where: "TODO App, ce portfolio" },
      ],
    },
    {
      group: "Frameworks & runtimes",
      items: [
        { name: "Node.js", where: "TODO App, ce portfolio" },
        { name: "Express", where: "TODO App" },
        { name: "Deno", where: "RPG TypeScript" },
        { name: "Expo / React Native", where: "app mobile ORION" },
      ],
    },
    {
      group: "Données",
      items: [
        { name: "PostgreSQL", where: "TODO App" },
        { name: "SQLite", where: "GalaxiEat" },
        { name: "Firebase", where: "Hangman (multijoueur)" },
      ],
    },
    {
      group: "IA & systèmes",
      items: [
        { name: "Ollama (LLM local)", where: "ORION" },
        { name: "faster-whisper", where: "ORION" },
        { name: "Piper (TTS)", where: "ORION" },
        { name: "Moteur de permissions", where: "ORION" },
        { name: "systemd", where: "ORION" },
      ],
    },
    {
      group: "Outils & environnements",
      items: [
        { name: "Git / GitHub", where: "tous les projets" },
        { name: "Linux", where: "ORION" },
        { name: "Docker", where: "ORION (SearXNG)" },
        { name: "Scalingo", where: "TODO App" },
        { name: "Clever Cloud", where: "ce portfolio" },
      ],
    },
  ],

  // Projet phare, affiché en grand en tête de la section Projets
  featured: {
    title: "O.R.I.O.N.",
    status: "Projet en cours",
    subtitle: "Assistante personnelle 100 % locale",
    caseStudy: "orion.html",
    problem:
      "Les assistants vocaux du commerce traitent les demandes sur des serveurs distants. Je voulais une assistante qui pilote ma maison et mon PC sans que rien ne sorte de mon réseau, et dont je contrôle précisément les actions.",
    solution:
      "On dit « ORION », elle répond « Oui, monsieur ? », puis elle comprend la demande et l'exécute. Le traitement est réparti sur trois machines : un mini-PC Linux qui orchestre, un PC portable équipé d'une RTX 4070 pour le modèle de langage, et mon PC principal comme terminal audio.",
    pipeline: ["Mot de réveil", "Transcription", "Outil ou LLM", "Validation", "Réponse vocale"],
    machines: [
      { name: "Mini-PC Linux", role: "Orchestration, transcription, outils, synthèse vocale" },
      { name: "PC portable RTX 4070", role: "Modèle de langage (Ollama) sur GPU" },
      { name: "PC principal", role: "Micro, haut-parleurs et actions sur le PC" },
    ],
    highlights: [
      "Le LLM ne fait que proposer : chaque action passe par le Core, qui valide, vérifie les permissions et demande confirmation si besoin. ORION n'exécute jamais de commande shell libre.",
      "Autonomie contrôlée : interrupteur, autorisations bornées et registre d'actions chaîné. Les initiatives de ses modules (bulletins NEWS, alertes) y sont soumises.",
      "Si le PC avec le GPU est éteint, les commandes simples marchent toujours et un petit modèle de secours prend le relais pour la conversation.",
      "En production depuis le 4 novembre 2026 (V3) : déploiement scripté avec contrôle de santé, sauvegardes vérifiées chaque nuit, plus de 5 100 tests.",
      "ORION Control, une application Windows de 26 pages, pour superviser ce qu'elle fait et régler ce qu'elle a le droit de faire.",
    ],
    tags: ["Python", "Ollama", "faster-whisper", "Piper", "SQLite", "Expo / React Native", "Linux", "systemd"],
    repo: "", // dépôt privé
    demo: "",
  },

  // Projets principaux : contexte + réalisation
  projects: [
    {
      title: "TODO App (atelier CI/CD)",
      kind: "Application web · projet en binôme",
      category: "Web",
      problem:
        "Atelier fil conducteur en binôme : créer une application web et la déployer en continu sur un hébergeur cloud.",
      solution:
        "Un serveur Express sert l'interface en HTML/CSS/JS et expose /api/health pour vérifier que l'API répond. La configuration passe par des variables d'environnement et l'application tourne sur Scalingo. La connexion à PostgreSQL est écrite mais pas encore branchée.",
      tags: ["Node.js", "Express", "PostgreSQL", "JavaScript", "Scalingo"],
      repo: "https://github.com/NardenLaSouris/ATELIER-FIL-CONDUCTEUR---TODO-APP",
      demo: "",
    },
    {
      title: "RPG tour par tour",
      kind: "Jeu en ligne de commande",
      category: "Jeux",
      problem:
        "Exercice de programmation orientée objet : écrire un jeu de combat complet en TypeScript.",
      solution:
        "Le joueur choisit 3 aventuriers parmi 6 classes, chacune avec son action (soin, magie, vol, attaque de zone, berserk). Il traverse un donjon de 5 salles : combats, coffres parfois piégés, puis un boss. La vitesse décide de l'ordre des tours et l'inventaire est commun à l'équipe.",
      tags: ["TypeScript", "Deno", "POO"],
      repo: "https://github.com/NardenLaSouris/Projet_RPG_TypeScript",
      demo: "",
    },
  ],

  // Projets secondaires : plus courts
  secondary: [
    {
      title: "Hangman Classic",
      category: "Jeux",
      description:
        "Le jeu du pendu en Go, avec trois niveaux de difficulté et des lettres en art ASCII. Un mode multijoueur avec Firebase est commencé.",
      tags: ["Go", "Firebase"],
      repo: "https://github.com/NardenLaSouris/Hangman-classic",
    },
    {
      title: "Projet Red",
      category: "Jeux",
      description:
        "Un jeu de combat au tour par tour en Go, avec des monstres tirés au hasard, des potions, un marchand, un forgeron et un livre de sorts.",
      tags: ["Go"],
      repo: "https://github.com/NardenLaSouris/Projet-red",
    },
    {
      title: "GalaxiEat",
      category: "Données",
      description:
        "La base de données d'une chaîne de restaurants : 7 tables reliées entre elles (restaurants, employés, plats, ingrédients, commandes).",
      tags: ["SQL", "SQLite"],
      repo: "https://github.com/NardenLaSouris/GalaxiEat",
    },
    {
      title: "Ce portfolio",
      category: "Web",
      description:
        "Ce site, écrit en HTML, CSS et JavaScript sans framework. Tout le contenu tient dans un fichier de configuration et un petit serveur Node.js le sert sur Clever Cloud.",
      tags: ["HTML", "CSS", "JavaScript", "Node.js"],
      repo: "https://github.com/NardenLaSouris/portfolio-",
    },
  ],

  experience: [
    {
      period: "2025 — Aujourd'hui",
      title: "Développeur web",
      place: "Freelance / projets personnels",
      text: "Conception et développement de sites et d'applications web, de la maquette au déploiement.",
      skills: ["Conception", "Développement full-stack", "Déploiement"],
    },
    {
      period: "2023 — 2025",
      title: "Formation en développement",
      place: "École / université",
      text: "Algorithmique, développement web full-stack, bases de données et gestion de projet.",
      skills: ["Algorithmique", "Bases de données", "Gestion de projet"],
    },
  ],
};
