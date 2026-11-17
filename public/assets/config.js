// ============================================================
//  CONTENU DU PORTFOLIO — modifie uniquement ce fichier
//  pour personnaliser ton site (textes, liens, projets...).
// ============================================================
window.PORTFOLIO = {
  name: "Jules NEVEU",
  role: "Développeur informatique",
  // Phrase d'accroche : factuelle, sans slogan
  tagline:
    "Je développe des applications web, des outils en ligne de commande et des systèmes qui tournent en local — de l'API Express déployée en continu jusqu'à ORION, un assistant vocal qui pilote ma maison sans passer par le cloud.",
  location: "France",
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
    "Je suis développeur et j'aime comprendre un système de bout en bout : la donnée, la logique, l'interface, puis le déploiement.",
    "Mes projets vont de jeux en ligne de commande en Go et TypeScript à une API Express livrée en intégration continue, jusqu'à ORION, un assistant vocal local réparti sur trois machines de mon réseau. J'y applique les mêmes principes : un code structuré, des choix techniques justifiés et des fonctionnalités qui marchent vraiment.",
  ],

  // Faits rapides (factuels uniquement)
  facts: [
    { label: "Langages", value: "Go · TypeScript · JavaScript · Python · SQL" },
    { label: "En ce moment", value: "ORION, assistant vocal local" },
    { label: "Localisation", value: "France" },
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
        { name: "Cedar (politiques)", where: "ORION" },
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
    subtitle: "Assistant vocal 100 % local",
    problem:
      "Les assistants vocaux du commerce traitent les demandes sur des serveurs distants. Je voulais un assistant qui pilote ma maison et mon PC en gardant tout sur mon réseau, avec un contrôle strict de ce qu'il a le droit d'exécuter.",
    solution:
      "On dit « Orion », il répond « Oui, monsieur ? », comprend la demande et agit. Le traitement est réparti sur trois machines : un mini-PC Linux qui orchestre, un PC portable équipé d'une RTX 4070 pour le modèle de langage, et mon PC principal comme terminal audio.",
    pipeline: ["Mot de réveil", "Transcription", "Outil ou LLM", "Validation", "Réponse vocale"],
    machines: [
      { name: "Mini-PC Linux", role: "Orchestration, transcription, outils, synthèse vocale" },
      { name: "PC portable RTX 4070", role: "Modèle de langage (Ollama) sur GPU" },
      { name: "PC principal", role: "Micro, haut-parleurs et actions sur le PC" },
    ],
    highlights: [
      "Le LLM ne fait que proposer : chaque action passe par un Core qui valide, applique des politiques Cedar et demande confirmation si besoin. Aucun shell, aucune commande libre.",
      "Commandes simples traitées sans LLM (0,2 ms au lieu de 0,5 à 1,4 s) : lumières, musique, minuteurs, rappels, agenda, météo.",
      "Mode dégradé si le GPU est hors ligne : commandes simples sans LLM, conversation par un modèle local de secours.",
      "Voix Piper entraînée sur mesure, contexte conversationnel, mémoire explicite, routines programmées.",
      "Autour du Core : visage animé, application ORION Control, agent Windows et application mobile.",
    ],
    tags: ["Python", "Ollama", "faster-whisper", "Piper", "Cedar", "Expo / React Native", "Linux", "systemd"],
    repo: "", // dépôt privé
    demo: "",
  },

  // Projets principaux : contexte + réalisation
  projects: [
    {
      title: "TODO App — atelier CI/CD",
      kind: "Application web · projet en binôme",
      category: "Web",
      problem:
        "Atelier fil conducteur : livrer une application web en partant de zéro jusqu'à un déploiement continu sur un hébergeur cloud.",
      solution:
        "Back-end Express servant une interface HTML/CSS/JS, route de santé /api/health pour vérifier l'API, configuration par variables d'environnement et déploiement sur Scalingo. Un module de connexion PostgreSQL est prêt pour conserver les tâches.",
      tags: ["Node.js", "Express", "PostgreSQL", "JavaScript", "Scalingo"],
      repo: "https://github.com/NardenLaSouris/ATELIER-FIL-CONDUCTEUR---TODO-APP",
      demo: "",
    },
    {
      title: "RPG tour par tour",
      kind: "Jeu en ligne de commande",
      category: "Jeux",
      problem:
        "Concevoir un jeu complet en programmation orientée objet, avec des règles de combat cohérentes et des classes bien séparées.",
      solution:
        "Équipe de 3 aventuriers parmi 6 classes aux actions spécifiques (soin, magie, vol, attaque de zone, berserk), donjon de 5 salles avec combats, coffres piégés et boss final, ordre des tours basé sur la vitesse et inventaire partagé.",
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
        "Jeu du pendu en Go : dictionnaires par difficulté, lettres en art ASCII, relance de partie et ébauche de mode multijoueur avec Firebase.",
      tags: ["Go", "Firebase"],
      repo: "https://github.com/NardenLaSouris/Hangman-classic",
    },
    {
      title: "Projet Red",
      category: "Jeux",
      description:
        "Jeu de combat au tour par tour en Go : monstres générés aléatoirement, potions, marchand, forgeron et livre de sorts.",
      tags: ["Go"],
      repo: "https://github.com/NardenLaSouris/Projet-red",
    },
    {
      title: "GalaxiEat",
      category: "Données",
      description:
        "Modélisation d'une base de données pour une chaîne de restaurants : 7 tables liées (restaurants, employés, plats, ingrédients, commandes).",
      tags: ["SQL", "SQLite"],
      repo: "https://github.com/NardenLaSouris/GalaxiEat",
    },
    {
      title: "Ce portfolio",
      category: "Web",
      description:
        "HTML, CSS et JavaScript sans framework, contenu piloté par un seul fichier de configuration, servi par un serveur Node.js sans dépendance sur Clever Cloud.",
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
