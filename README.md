# Portfolio — Jules NEVEU

Portfolio personnel en HTML / CSS / JavaScript (sans framework), servi par un petit serveur Node.js **sans aucune dépendance**, prêt à être déployé sur [Clever Cloud](https://www.clever-cloud.com/).

## Fonctionnalités

- Sections : accueil, profil, projets, compétences, parcours, contact
- Projet phare O.R.I.O.N. (problème, solution, architecture), projets principaux (contexte / réalisation) et secondaires, filtres par catégorie
- Autres dépôts GitHub publics chargés automatiquement (liste d'exclusion dans la config)
- Palette : vert forêt `#0F3D2E`, vert sauge `#86A18B`, charbon `#1A1C1B`, crème `#F4EFE4`, or sauvage `#C4A96A` ; titres en Michroma
- Thème clair / sombre (mémorisé), responsive (mobile, tablette, desktop), animations discrètes qui respectent « réduire les animations »
- SEO : balises Open Graph, image de partage, données structurées, `robots.txt`
- Serveur : compression gzip, page 404, endpoint `/health`, en-têtes de sécurité

## Personnaliser

Tout le contenu est dans **`public/assets/config.js`** : nom, rôle, accroche, e-mail, réseaux, compétences, projets, parcours.
Pour ajouter un CV, dépose `cv.pdf` dans `public/assets/` et mets `cv: "/assets/cv.pdf"`.

## Lancer en local

```bash
npm start
# → http://localhost:8080
```

## Déployer sur Clever Cloud

1. Console Clever Cloud → **Create** → **an application** → **Create a brand new app**.
2. Choisis **Node.js**, puis connecte le dépôt GitHub `portfolio-` (ou déploiement via Git).
3. Branche de déploiement : **`main`**. Aucune variable d'environnement n'est nécessaire (le port est fourni par Clever Cloud via `PORT`).
4. Une taille **nano** ou **XS** suffit largement.
5. Clever Cloud détecte `package.json`, exécute `npm install` puis `npm start`.

Déploiement en ligne de commande (optionnel) :

```bash
npm i -g clever-tools
clever login
clever create --type node portfolio
clever deploy
```

Ensuite, ajoute ton nom de domaine dans l'onglet **Domain names** de l'application.
