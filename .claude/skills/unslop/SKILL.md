---
name: unslop
description: Relit les textes visibles du site (ou les fichiers indiqués) et réécrit les tournures qui sonnent « générées par une IA » en gardant exactement les mêmes faits. À utiliser quand l'utilisateur tape /unslop ou demande de rendre un texte plus naturel, moins générique, moins « IA ».
---

# /unslop — rendre les textes naturels

Objectif : un texte qu'une personne aurait pu écrire elle-même, simple et précis. On change la forme, jamais le fond.

## Où chercher

Sans autre indication, relire tout le texte visible par un visiteur :
- `public/assets/config.js` (accroche, profil, projets, parcours, compétences)
- `public/index.html` (titres, sous-titres, métadonnées `description` et `og:*`)
- les libellés écrits dans `public/assets/app.js` et `public/404.html`

Si l'utilisateur donne des fichiers ou un passage, se limiter à ceux-là.

## Ce qu'on corrige

- **Tirets cadratins (—) dans les phrases** : remplacer par un point, deux-points, une virgule ou des parenthèses. Les garder seulement pour les plages de dates (« 2023 — 2025 ») et le titre de la page.
- **Formules toutes faites** : « de bout en bout », « qui marchent vraiment », « passionné par », « transformer une idée en produit », « au service de », « véritable », « solution innovante », « allier X et Y »… Les remplacer par le fait concret qu'elles cachent, ou les supprimer.
- **Énumérations en trois temps** décoratives (« la donnée, la logique, l'interface ») : garder seulement si chaque élément apporte une information.
- **Phrases nominales en rafale** (« Aucun shell, aucune commande libre. ») : en faire une phrase avec un sujet et un verbe.
- **Titres de section à effet** (« Échangeons », « Réalisations », « Comprendre un système… ») : préférer des titres simples (« Me contacter », « Mes projets »).
- **Constructions « de X jusqu'à Y »** et accroches en entonnoir : dire directement les choses.
- **Superlatifs et promesses** non prouvés (« premium », « robuste », « performant ») : supprimer, ou remplacer par un chiffre ou un fait vérifiable s'il existe déjà.
- **Jargon gonflé** (« orchestrer », « piloté par », « écosystème ») quand un mot courant suffit.

## Règles

1. **Ne rien inventer** : aucun fait, chiffre, date, expérience ou fonctionnalité nouvelle. En cas de doute sur un fait, garder la formulation d'origine et le signaler.
2. Garder la même langue, le même registre (je / vous) et à peu près la même longueur.
3. Ne pas toucher aux noms propres, noms de technologies, URLs, adresses e-mail ni au code.
4. Vérifier que la page s'affiche toujours (pas de guillemets cassés dans `config.js` : `node --check public/assets/config.js`).
5. À la fin, lister les phrases modifiées (avant → après) en quelques lignes, et signaler tout passage qui reste douteux sur le fond.
