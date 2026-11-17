# Portfolio — Jules NEVEU

Portfolio personnel en HTML / CSS / JavaScript (sans framework), servi par un petit serveur Node.js **sans aucune dépendance**, prêt à être déployé sur [Clever Cloud](https://www.clever-cloud.com/).

## Fonctionnalités

- Sections : accueil, à propos, compétences, projets (avec filtres), parcours, contact
- Dépôts GitHub publics chargés automatiquement
- Charte visuelle Aureon (vert forêt, vert secondaire, crème, doré, noir profond ; titres en Michroma)
- Projet phare O.R.I.O.N. mis en avant
- Thème clair / sombre (mémorisé), responsive, animations discrètes, accessible
- Page 404, endpoint `/health`, en-têtes de sécurité

## Personnaliser

Tout le contenu est dans **`public/assets/config.js`** : nom, rôle, e-mail, réseaux, compétences, projets, parcours.
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
