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

## Captures des projets

- Les captures sont dans `public/assets/projets/<projet>/`, en WebP, et sont listées dans le champ `media` de chaque projet de `public/assets/config.js` (`src`, `alt`, `caption`, `frame`, `w`, `h`).
- `frame: "browser"` ajoute un cadre de navigateur (capture d'une page web) ; `frame: "none"` laisse l'image telle quelle (terminal, schéma).
- Toutes les captures sont réelles : applications lancées en local, parties jouées dans un vrai terminal, requêtes exécutées sur la base, schéma lu dans le script SQL.
- Visage d'ORION animé : `public/orion-visage/` est une copie de la page réelle du visage (`orion/face/static` du dépôt ORION), sans flux d'événements ; l'étude de cas lui donne son état par `OrionFace.setVisualState()`. Pour la mettre à jour, recopier `face.js`, `face.css` et `michroma.woff2`.
- Captures d'ORION Control : déposer les images dans `public/assets/orion/` et les lister dans `SHOTS`, en haut de `public/assets/orion.js`. La première s'affiche en grand, les autres en galerie.

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

## Préproduction

Deux branches, deux applications Clever Cloud :

| Branche   | Application Clever Cloud | Rôle |
|-----------|--------------------------|------|
| `preprod` | `portfolio-preprod`      | Vérifier les changements avant la mise en ligne |
| `main`    | `portfolio`              | Site public |

Mise en place (une seule fois) :

1. Console Clever Cloud → **Create** → **an application** → **Node.js**, relie le même dépôt GitHub, branche **`preprod`**.
2. Dans **Environment variables** de cette application, ajoute `SITE_ENV` = `preprod`, puis redéploie.
   Le site affiche alors un bandeau « Pré-production » et demande aux moteurs de recherche de ne pas l'indexer.

Cycle de travail :

1. Les modifications sont poussées sur `preprod` → vérification sur l'adresse `…cleverapps.io` de la préprod.
2. Une fois validées, on fusionne `preprod` dans `main` → le site public se met à jour.

```bash
git checkout main && git merge --ff-only preprod && git push origin main
```
