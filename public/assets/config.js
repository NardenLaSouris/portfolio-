// ============================================================
//  CONTENU DU PORTFOLIO — modifie uniquement ce fichier
//  pour personnaliser ton site (textes, liens, projets...).
// ============================================================
window.PORTFOLIO = {
  name: "Jules NEVEU",
  role: "Développeur web",
  tagline:
    "Je conçois des sites et des applications web rapides, accessibles et soignés — du design à la mise en production.",
  location: "France",
  available: true, // affiche le badge « Disponible pour des projets »
  email: "neveu.jules58@gmail.com",
  cv: "", // ex. "/assets/cv.pdf" (dépose le PDF dans public/assets/)

  // Pseudo GitHub : les dépôts publics sont chargés automatiquement
  github: "NardenLaSouris",
  githubRepoCount: 6,

  socials: [
    { label: "GitHub", url: "https://github.com/NardenLaSouris" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/jules-neveu-167645258" },
  ],

  about: [
    "Passionné par le développement web, j'aime transformer une idée en un produit concret, utile et agréable à utiliser.",
    "Je travaille aussi bien sur le front-end que sur le back-end, avec une attention particulière portée à la performance, à l'accessibilité et à la qualité du code.",
  ],

  stats: [
    { value: "10+", label: "projets réalisés" },
    { value: "3", label: "années de pratique" },
    { value: "∞", label: "curiosité" },
  ],

  skills: [
    { group: "Front-end", items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Vue.js"] },
    { group: "Back-end", items: ["Python", "Node.js", "Express", "Go", "PHP", "REST API"] },
    { group: "IA & systèmes", items: ["LLM locaux (Ollama)", "Whisper (STT)", "Piper (TTS)", "Domotique", "systemd", "Cedar"] },
    { group: "Données", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"] },
    { group: "Outils & DevOps", items: ["Git", "GitHub", "Docker", "Linux", "Clever Cloud", "CI/CD"] },
  ],

  // Projet phare, affiché en grand en haut de la section Projets
  featured: {
    title: "O.R.I.O.N.",
    status: "Projet en cours",
    subtitle: "Assistant vocal 100 % local — univers Aureon",
    description:
      "ORION est un assistant vocal que je développe pour ma maison : on dit « Orion », il répond « Oui, monsieur ? », comprend la demande et agit — sans aucun service dans le cloud. Tout tourne sur trois machines de mon réseau : un mini-PC Linux qui orchestre, un PC portable avec RTX 4070 pour le modèle de langage, et mon PC principal comme terminal audio.",
    highlights: [
      "Chaîne vocale complète : mot de réveil, transcription (faster-whisper), LLM local (Ollama / Qwen), synthèse vocale Piper avec une voix entraînée sur mesure",
      "Sécurité : le LLM ne fait que proposer ; chaque action passe par un Core qui valide, applique des politiques Cedar et demande confirmation",
      "Commandes instantanées sans LLM (0,2 ms) : lumières, musique Spotify, minuteurs, rappels, agenda, météo",
      "Mode dégradé si le GPU est hors ligne, contexte conversationnel, mémoire explicite, routines programmées",
      "Écosystème : visage animé, application ORION Control, agent Windows, application mobile",
    ],
    tags: ["Python", "LLM local", "Whisper", "Piper", "Cedar", "Expo / React Native", "Linux"],
    repo: "", // dépôt privé
    demo: "",
  },

  // Autres projets mis en avant (affichés avant les dépôts GitHub)
  projects: [
    {
      title: "Portfolio",
      description:
        "Ce site : HTML/CSS/JS sans framework aux couleurs de la charte Aureon, servi par un serveur Node.js sans dépendance et déployé sur Clever Cloud.",
      tags: ["HTML", "CSS", "JavaScript", "Node.js"],
      repo: "https://github.com/NardenLaSouris/portfolio-",
      demo: "",
    },
  ],

  experience: [
    {
      period: "2025 — Aujourd'hui",
      title: "Développeur web",
      place: "Freelance / projets personnels",
      text: "Conception et développement de sites et d'applications web, de la maquette au déploiement.",
    },
    {
      period: "2023 — 2025",
      title: "Formation en développement",
      place: "École / université",
      text: "Algorithmique, développement web full-stack, bases de données et gestion de projet.",
    },
  ],
};
