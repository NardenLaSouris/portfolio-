// ============================================================
//  CONTENU DU PORTFOLIO — modifie uniquement ce fichier
//  pour personnaliser ton site (textes, liens, projets...).
// ============================================================
window.PORTFOLIO = {
  name: "NardenLaSouris",
  role: "Développeur web",
  tagline:
    "Je conçois des sites et des applications web rapides, accessibles et soignés — du design à la mise en production.",
  location: "France",
  available: true, // affiche le badge « Disponible pour des projets »
  email: "contact@exemple.fr", // ⚠️ remplace par ton adresse
  cv: "", // ex. "/assets/cv.pdf" (dépose le PDF dans public/assets/)

  // Pseudo GitHub : les dépôts publics sont chargés automatiquement
  github: "NardenLaSouris",
  githubRepoCount: 6,

  socials: [
    { label: "GitHub", url: "https://github.com/NardenLaSouris" },
    { label: "LinkedIn", url: "https://www.linkedin.com/" },
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
    { group: "Back-end", items: ["Node.js", "Express", "Go", "Python", "PHP", "REST API"] },
    { group: "Données", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"] },
    { group: "Outils & DevOps", items: ["Git", "GitHub", "Docker", "Linux", "Clever Cloud", "CI/CD"] },
  ],

  // Projets mis en avant (affichés avant les dépôts GitHub)
  projects: [
    {
      title: "Portfolio",
      description:
        "Ce site : HTML/CSS/JS sans framework, servi par un serveur Node.js sans dépendance et déployé sur Clever Cloud.",
      tags: ["HTML", "CSS", "JavaScript", "Node.js"],
      repo: "https://github.com/NardenLaSouris/portfolio-",
      demo: "",
    },
    {
      title: "Application de gestion de tâches",
      description:
        "Application web pour organiser ses tâches avec glisser-déposer, filtres et sauvegarde des données.",
      tags: ["React", "Node.js", "PostgreSQL"],
      repo: "",
      demo: "",
    },
    {
      title: "API REST",
      description:
        "API documentée avec authentification JWT, tests automatisés et déploiement continu.",
      tags: ["Express", "JWT", "Docker"],
      repo: "",
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
