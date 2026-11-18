// ============================================================
//  CONTENU DU PORTFOLIO — modifie uniquement ce fichier
//  pour personnaliser ton site (textes, liens, projets...).
//  Les captures sont dans public/assets/projets/<projet>/.
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
  // Dépôts à ne jamais afficher (vides, exercices forkés...).
  githubExclude: ["Forum-Project", "git-exam"],

  socials: [
    { label: "GitHub", handle: "NardenLaSouris", url: "https://github.com/NardenLaSouris" },
    { label: "LinkedIn", handle: "Jules Neveu", url: "https://www.linkedin.com/in/jules-neveu-167645258" },
  ],

  about: [
    "Je suis développeur à Nantes. Ce qui m'intéresse, c'est de comprendre un système en entier : la donnée, la logique, l'interface, puis ce qui se passe une fois en production.",
    "J'ai appris en construisant : des jeux en Go, une base relationnelle, une application déployée en continu en binôme, un RPG en équipe.",
    "ORION a commencé le 24 septembre 2026 à 15 h 48, sous le nom de JARVIS. À 19 h 26, elle reconnaissait son mot de réveil, entraîné pour elle. Le 11 octobre, elle est devenue ORION, une assistante. Elle pilote aujourd'hui ma maison, et je l'exploite comme un vrai service.",
    "Quand je ne code pas, je joue. Au point d'avoir appris à ORION à allumer ma PS5 à la voix.",
  ],

  // Ma façon de travailler : chaque trait renvoie à un fait vérifiable dans mes projets
  traits: [
    { title: "Je mesure avant de corriger", text: "Sur ORION, c'est une mesure qui a révélé un prompt tronqué sans avertissement. Corrigé, le choix d'outil est passé de 1,2–1,7 s à 0,63–0,71 s." },
    { title: "J'écris ce qui n'est pas prouvé", text: "La documentation d'ORION sépare ce qui a été constaté en réel de ce qui est seulement écrit dans le code, et l'étude de cas le montre aussi." },
    { title: "Je vais jusqu'à la mise en ligne", text: "Trois versions d'ORION en deux mois, la dernière en production depuis le 4 novembre 2026, avec sauvegardes vérifiées et contrôle de santé." },
  ],

  // Faits rapides (factuels uniquement)
  facts: [
    { label: "Langages", value: "Go · TypeScript · JavaScript · Python · SQL · HTML · CSS" },
    { label: "En ce moment", value: "ORION, assistante vocale locale", href: "orion.html" },
    { label: "Localisation", value: "Nantes" },
  ],

  // Environnement technique, avec les projets où chaque outil est utilisé
  skills: [
    {
      group: "Langages",
      items: [
        { name: "Python", where: "ORION" },
        { name: "Go", where: "Hangman Classic, Projet Red, Piscine Go" },
        { name: "TypeScript", where: "RPG en équipe, app mobile ORION" },
        { name: "JavaScript", where: "TODO App, ORION Control, ce portfolio" },
        { name: "SQL", where: "GalaxiEat, TODO App" },
        { name: "HTML / CSS", where: "TODO App, ORION Control, ce portfolio" },
      ],
    },
    {
      group: "Frameworks et bibliothèques",
      items: [
        { name: "Express", where: "TODO App" },
        { name: "Expo / React Native", where: "app mobile ORION" },
        { name: "Firebase (SDK Go)", where: "Hangman Classic, mode en ligne commencé" },
      ],
    },
    {
      group: "Développement web",
      items: [
        { name: "Interfaces sans framework", where: "TODO App, ORION Control, ce portfolio" },
        { name: "Responsive et accessibilité", where: "ce portfolio" },
        { name: "API REST, contrôle de santé", where: "TODO App, ORION" },
      ],
    },
    {
      group: "Backend",
      items: [
        { name: "Node.js", where: "TODO App, ce portfolio" },
        { name: "PostgreSQL", where: "TODO App" },
        { name: "SQLite", where: "GalaxiEat, ORION" },
        { name: "Services Python de longue durée", where: "ORION" },
      ],
    },
    {
      group: "Intelligence artificielle",
      items: [
        { name: "LLM locaux (Ollama, Qwen)", where: "ORION" },
        { name: "faster-whisper (STT)", where: "ORION" },
        { name: "Piper (TTS, voix entraînée)", where: "ORION" },
        { name: "openWakeWord (mot de réveil entraîné)", where: "ORION" },
      ],
    },
    {
      group: "Infrastructure et outils",
      items: [
        { name: "Git / GitHub", where: "tous les projets" },
        { name: "systemd (services, watchdog)", where: "ORION" },
        { name: "Docker", where: "ORION (SearXNG)" },
        { name: "Scalingo", where: "TODO App" },
        { name: "Clever Cloud", where: "ce portfolio" },
      ],
    },
    {
      group: "Environnements de développement",
      items: [
        { name: "Linux (Ubuntu)", where: "Core d'ORION" },
        { name: "Windows, PowerShell", where: "agents et ORION Control" },
        { name: "Deno", where: "RPG en équipe" },
        { name: "Terminal (Bash)", where: "scripts de déploiement d'ORION" },
      ],
    },
  ],

  // Projet phare, affiché en grand en tête de la section Projets
  featured: {
    title: "ORION",
    status: "Projet en cours · V3 en production",
    subtitle: "Assistante personnelle 100 % locale",
    caseStudy: "orion.html",
    problem:
      "Les assistants vocaux du commerce traitent les demandes sur des serveurs distants. Je voulais une assistante qui pilote ma maison et mon PC sans que rien ne sorte de mon réseau, et dont je contrôle précisément les actions.",
    solution:
      "On dit « ORION », elle répond « Oui, monsieur ? », puis elle comprend la demande et l'exécute. Le traitement est réparti sur trois machines : un mini-PC Linux qui orchestre, un PC portable avec GPU pour le modèle de langage et la transcription, et mon PC principal comme terminal audio.",
    pipeline: ["Mot de réveil", "Transcription", "Outil ou LLM", "Validation", "Réponse vocale"],
    machines: [
      { name: "Core Linux", role: "Orchestration, outils, modules, voix, sauvegardes" },
      { name: "PC portable avec GPU", role: "Modèle de langage et transcription" },
      { name: "PC principal", role: "Micro, haut-parleurs, ORION Control" },
    ],
    highlights: [
      "Le LLM ne fait que proposer : chaque action passe par le Core, qui valide, vérifie les permissions et demande confirmation si besoin.",
      "Autonomie contrôlée : interrupteur, autorisations bornées et registre d'actions chaîné.",
      "En production depuis le 4 novembre 2026 : déploiement avec contrôle de santé, sauvegardes vérifiées chaque nuit, plus de 5 100 tests.",
      "ORION Control, une application Windows de 26 pages, pour la superviser et régler ce qu'elle a le droit de faire.",
    ],
    // Captures réelles, en production (données personnelles masquées)
    media: [
      { src: "/assets/orion/control-tableau-de-bord.webp", alt: "ORION Control : tableau de bord, ORION opérationnelle", caption: "ORION Control, l'application de supervision, en production", frame: "none", w: 1440, h: 900 },
      { src: "/assets/orion/wallpaper-principal.webp", alt: "Fond d'écran d'ORION sur le PC : sphère reliée aux machines, météo, santé et activité", caption: "Son fond d'écran sur le PC : machines, santé, activité", frame: "none", w: 1920, h: 1080 },
      { src: "/assets/orion/terminal-panneau.webp", alt: "Terminal ORION OS : lumières, mode intimité et volume", caption: "Le terminal ORION OS : lumières, mode intimité, volume", frame: "none", w: 1560, h: 720 },
    ],
    tags: ["Python", "Ollama", "faster-whisper", "Piper", "SQLite", "Expo / React Native", "Linux", "systemd"],
    repo: "", // dépôt privé
    demo: "",
  },

  // Projets principaux : présentation complète avec captures.
  // media[].frame : "browser" (capture d'une page web), "none" (terminal, schéma : déjà cadrés).
  projects: [
    {
      slug: "todo",
      title: "TODO App",
      kind: "Application web",
      status: "done",
      role: "Binôme · interface et déploiement",
      category: "Web",
      period: "Janvier → mai 2026",
      summary: "Une application de tâches livrée de bout en bout pour un atelier CI/CD, jusqu'au déploiement sur Scalingo.",
      problem: "Atelier fil conducteur : créer une application web avec Emilien Pavageau et la déployer en continu sur un hébergeur cloud.",
      solution: "Un serveur Express sert l'interface et expose /api/health pour vérifier que l'API répond. La configuration passe par des variables d'environnement et l'application tourne sur Scalingo.",
      contribution: "L'interface, le serveur Express qui la sert, le déploiement Scalingo et le module PostgreSQL. Emilien Pavageau a posé la structure de départ.",
      features: [
        "Ajout et suppression de tâches",
        "Indicateur de connexion à l'API, mis à jour au chargement",
        "Route de santé /api/health (statut, durée de fonctionnement, horodatage)",
      ],
      challenge: "Faire tourner la même application en local et sur Scalingo : port et base fournis par l'hébergeur, connexion PostgreSQL en SSL seulement en production.",
      tags: ["Node.js", "Express", "JavaScript", "PostgreSQL", "Scalingo"],
      repo: "https://github.com/NardenLaSouris/ATELIER-FIL-CONDUCTEUR---TODO-APP",
      demo: "",
      media: [
        { src: "/assets/projets/todo/app-taches.webp", alt: "TODO App : liste de trois tâches et indicateur « API connectée »", caption: "L'interface avec l'API connectée et trois tâches", frame: "browser", url: "localhost:3055", w: 1260, h: 1000 },
        { src: "/assets/projets/todo/app-mobile.webp", alt: "TODO App sur un écran de téléphone", caption: "La même page sur mobile", frame: "browser", url: "localhost:3055", w: 780, h: 1560 },
        { src: "/assets/projets/todo/api-health.webp", alt: "Réponse JSON de la route /api/health dans un terminal", caption: "La route de santé interrogée avec curl", frame: "none", w: 1434, h: 528 },
      ],
    },
    {
      slug: "galaxieat",
      title: "GalaxiEat",
      kind: "Base de données",
      status: "done",
      role: "Seul",
      category: "Données",
      period: "Février 2026",
      summary: "La base de données d'une chaîne de restaurants interplanétaire, de la modélisation aux requêtes d'analyse.",
      problem: "Exercice de modélisation relationnelle : représenter restaurants, personnel, carte, commandes et ingrédients, puis interroger la base.",
      solution: "Un script SQL qui crée 7 tables reliées par des clés étrangères, les remplit et enchaîne des requêtes d'analyse et de mise à jour.",
      contribution: "La modélisation, le script SQL et les requêtes.",
      features: [
        "7 tables, dont une table d'association à clé composite entre plats et ingrédients",
        "Jeu de données : 23 restaurants, 45 employés, une carte de plats",
        "Jointures sur trois tables, sous-requêtes, agrégats par catégorie",
      ],
      challenge: "Modéliser la relation plusieurs-à-plusieurs entre plats et ingrédients avec une table d'association et une clé primaire composite.",
      tags: ["SQL", "SQLite", "Modélisation"],
      repo: "https://github.com/NardenLaSouris/GalaxiEat",
      demo: "",
      media: [
        { src: "/assets/projets/galaxieat/schema.webp", alt: "Schéma relationnel des 7 tables de GalaxiEat avec clés primaires et étrangères", caption: "Schéma relationnel, généré depuis les CREATE TABLE du script", frame: "none", w: 1600, h: 1192 },
        { src: "/assets/projets/galaxieat/requetes.webp", alt: "Résultats de trois requêtes SQL : prix moyen par catégorie, plats au-dessus de la moyenne, total des ventes", caption: "Trois requêtes du script exécutées sur la base", frame: "none", w: 1298, h: 1424 },
      ],
    },
    {
      slug: "hangman",
      title: "Hangman Classic",
      kind: "Jeu en ligne de commande · Go",
      status: "done",
      statusNote: "mode en ligne expérimental",
      role: "Projet de formation",
      category: "Jeux",
      period: "Octobre 2025",
      summary: "Le jeu du pendu en Go, organisé en paquets, avec art ASCII et niveaux de difficulté.",
      problem: "Projet de formation en Go : écrire un jeu complet en terminal, du choix du mot jusqu'à la fin de partie.",
      solution: "Un menu en art ASCII, trois dictionnaires selon la difficulté, dix essais et le dessin du pendu qui avance à chaque erreur.",
      contribution: "",
      features: [
        "Trois niveaux de difficulté, chacun avec son dictionnaire",
        "Titres et lettres en art ASCII, trois polices disponibles",
        "Lettres déjà proposées affichées, saisies invalides refusées",
      ],
      challenge: "Découper le jeu en paquets Go séparés (logique, affichage, mots, configuration, mode en ligne) plutôt qu'en un seul fichier.",
      tags: ["Go", "Firebase"],
      repo: "https://github.com/NardenLaSouris/Hangman-classic",
      demo: "",
      media: [
        { src: "/assets/projets/hangman/partie.webp", alt: "Partie de pendu dans un terminal : lettres proposées et dessin du pendu", caption: "Une partie réelle, jusqu'au dernier essai", frame: "none", w: 1096, h: 1172 },
        { src: "/assets/projets/hangman/menu.webp", alt: "Menu du jeu avec le titre HANGMAN en art ASCII", caption: "Le menu principal", frame: "none", w: 1600, h: 506 },
      ],
    },
    {
      slug: "red",
      title: "Projet Red",
      kind: "Jeu en ligne de commande · Go",
      status: "done",
      role: "Projet de formation",
      category: "Jeux",
      period: "Octobre 2025",
      summary: "Un jeu de rôle en terminal : création de personnage, marché, forgeron et combats au tour par tour.",
      problem: "Projet de formation en Go : concevoir un jeu avec un personnage, un inventaire et un système de combat.",
      solution: "Un menu principal qui mène à la création de personnage, à ses statistiques, au marché, au forgeron, à l'inventaire et au combat.",
      contribution: "",
      features: [
        "Création de personnage : classe (Humain, Elfe, Nain) et nom vérifié",
        "Combat au tour par tour avec compétences et poison sur trois tours",
        "Inventaire, potions, marchand et forgeron",
      ],
      challenge: "Faire circuler l'état du personnage (points de vie, inventaire, argent, sorts) entre tous les menus du jeu.",
      tags: ["Go"],
      repo: "https://github.com/NardenLaSouris/Projet-red",
      demo: "",
      media: [
        { src: "/assets/projets/red/combat.webp", alt: "Combat dans le terminal : points de vie et menu des compétences", caption: "Un combat réel : tours, points de vie et compétences", frame: "none", w: 1164, h: 1248 },
        { src: "/assets/projets/red/stats.webp", alt: "Création d'un personnage puis affichage de ses statistiques", caption: "Création d'un personnage et ses statistiques", frame: "none", w: 1164, h: 1914 },
      ],
    },
  ],

  // Projets secondaires : plus courts, avec une capture si elle existe
  secondary: [
    {
      title: "RPG tour par tour",
      category: "Jeux",
      kind: "TypeScript",
      status: "done",
      role: "Équipe de trois · classe Prêtre",
      description: "Un jeu de rôle en terminal réalisé à trois : 6 classes, un donjon de 5 salles, un boss final.",
      contribution: "J'ai créé le dépôt et écrit la classe Prêtre (soin d'un allié). Le reste du jeu a été écrit par mes deux coéquipiers.",
      tags: ["TypeScript", "Deno"],
      repo: "https://github.com/NardenLaSouris/Projet_RPG_TypeScript",
      media: [
        { src: "/assets/projets/rpg/pretre.webp", alt: "Tour du Prêtre dans le RPG : actions Attaquer, Soigner, Objet", caption: "Le tour du Prêtre, la classe que j'ai écrite", frame: "none", w: 1130, h: 1702 },
        { src: "/assets/projets/rpg/equipe.webp", alt: "Équipe choisie et début d'un combat contre trois ennemis", caption: "Équipe de trois aventuriers face à trois ennemis", frame: "none", w: 1130, h: 1332 },
      ],
    },
    {
      title: "Ce portfolio",
      category: "Web",
      kind: "HTML, CSS, JavaScript",
      status: "ongoing",
      role: "Seul",
      description: "Sans framework : tout le contenu tient dans un fichier de configuration, servi par un petit serveur Node.js sans dépendance sur Clever Cloud, avec une préproduction séparée.",
      tags: ["HTML", "CSS", "JavaScript", "Node.js"],
      repo: "https://github.com/NardenLaSouris/portfolio-",
      media: [
        { src: "/assets/projets/portfolio/accueil.webp", alt: "Page d'accueil du portfolio en thème sombre", caption: "La page d'accueil", frame: "none", w: 1440, h: 900 },
        { src: "/assets/projets/portfolio/orion.webp", alt: "Schéma interactif de l'architecture d'ORION dans l'étude de cas", caption: "L'étude de cas ORION : schéma d'architecture interactif", frame: "none", w: 1440, h: 900 },
      ],
    },
  ],

  // Premiers projets : liste compacte
  early: [
    { title: "Puissance 4", note: "Python, programmation orientée objet · lycée", repo: "https://github.com/NardenLaSouris/connect-4-python" },
    { title: "Solveur de Sudoku", note: "Python, backtracking · lycée", repo: "https://github.com/NardenLaSouris/Sudoku-Solver-Python" },
    { title: "Pendu", note: "Python, bases du langage · lycée", repo: "https://github.com/NardenLaSouris/Hangman-Python" },
    { title: "Piscine Go", note: "Exercices d'algorithmique en Go · Nantes, 2025", repo: "https://github.com/NardenLaSouris/Piscine-go-nantes-2526" },
  ],

  // Parcours : reconstruit d'après les dates réelles des dépôts
  experience: [
    {
      period: "Depuis septembre 2026",
      title: "ORION, assistante personnelle locale",
      place: "Projet personnel",
      text: "Trois générations en deux mois, une V3 en production depuis le 4 novembre 2026 : architecture modulaire, autonomie contrôlée, supervision et déploiement outillé.",
      skills: ["Architecture logicielle", "IA locale", "Exploitation en production"],
    },
    {
      period: "2025 — 2026",
      title: "Formation en développement informatique",
      place: "Nantes", // ⚠️ à compléter : nom de l'école
      text: "Piscine Go, jeux en Go, base de données relationnelle, RPG en TypeScript en équipe de trois, application web déployée en continu en binôme.",
      skills: ["Go", "SQL", "Travail en équipe", "CI/CD"],
    },
    {
      period: "Lycée",
      title: "Premiers programmes",
      place: "Projets de lycée en Python",
      text: "Puissance 4 en programmation orientée objet, solveur de Sudoku, jeu du pendu.",
      skills: ["Python", "Algorithmique"],
    },
  ],
};
