# Portfolio et Présentation - Informatique Quantique & Cryptographie

Ce projet regroupe deux pages web distinctes réalisées dans le cadre d'un projet de fin d'année (L2 IT & Management) par Mathis & Nathan. 
Il aborde l'informatique quantique et ses implications sur la cybersécurité (cryptographie post-quantique).

## Structure du Projet

- `portfolio.html` : Une landing page cinématique immersive pour présenter l'équipe et le sujet.
- `presentation.html` : Un support visuel animé sous forme de diapositives.
- `css/` : Fichiers de styles (incluant `webslides.css`, `style.css`, `portfolio.css`).
- `js/` : Scripts d'animation et de logique (ex: `portfolio.js`, `webslides.min.js`).
- `assets/` : Ressources graphiques et configuration (favicons, configuration particules).

---

## 📄 Les Requirements (Prérequis) par page

Afin de faciliter la maintenance et la compréhension, voici les prérequis techniques, dépendances et exigences pour chaque page de manière séparée.

### 1. Requirements pour la page Portfolio (`portfolio.html`)

La page portfolio est conçue comme une expérience cinématique fluide. Elle utilise des animations avancées au défilement pour présenter les défis de la cryptographie post-quantique.

**Stack Technique & Dépendances :**
- **Langages :** HTML5, CSS3 (`style.css`, `portfolio.css`), Vanilla JavaScript (`portfolio.js`).
- **Moteur d'animation (Scroll) :** [GSAP (GreenSock)](https://gsap.com/) avec le plugin `ScrollTrigger`.
  - Chargé via CDN (version 3.12.2).
- **Icônes :** [Lucide Icons](https://lucide.dev/).
  - Chargement du script via CDN (unpkg) et initialisation en fin de document via `lucide.createIcons()`.

**Fonctionnalités & Éléments spécifiques :**
- **Canvas d'arrière-plan (`#quantum-bg`) :** Utilisé pour générer des particules ou "blobs" organiques en arrière-plan (géré par javascript).
- **Curseur personnalisé (`#custom-cursor`) :** Un élément div stylisé et animé via javascript pour remplacer le curseur natif.
- **Micro-interactions CSS :** Utilisation de lueur (`card-glow`), d'effets de brouillage sur les textes (`scramble-text`), de cartes magnétiques (`magnetic-card`) et d'une navbar sticky fluide (`sticky-nav`).
- **Structure de la page :** Sections spécifiques incluant Hero, The Team, Quantum Case avec visualiseur Qubit (superposition orbitale animée en pur CSS/JS), Analysis (avec menu latéral fixe pour observer la menace cryptographique), Solutions et Reflection.

---

### 2. Requirements pour la page Présentation (`presentation.html`)

La page présentation sert de support visuel scénarisé. Elle a été construite pour remplacer PowerPoint avec des standards du web, permettant la navigation au clavier ou au défilement.

**Stack Technique & Dépendances :**
- **Langages :** HTML5, CSS3, Vanilla JavaScript.
- **Framework de Slides :** [WebSlides](https://webslides.tv/).
  - Fichier `webslides.css` local, et script d'initialisation manuel avec options (`slideOffset`, `navigateOnScroll`, etc.).
- **Animations de Background quantique :** [Particles.js](https://vincentgarreau.com/particles.js/) par Vincent Garreau.
  - Construit sur le conteneur `#particles-js`.
  - Nécessite le fichier de configuration JSON (`assets/particles/particles.json`).
- **Animations d'entrée (Typographie/Images) :** [Animate.css](https://animate.style) (version 4.1.1).
  - Fournit les classes utilitaires prêtes à l'emploi (`animate__animated`, etc.)

**Fonctionnalités & Éléments spécifiques :**
- **Architecture des diapositives :** Chaque diapositive est encadrée par une balise `<section>` parente dans un conteneur `<article id="webslides">`.
- **Compatibilité iOS et OS :** Balises Meta intégrées pour masquer la barre de navigation (PWA-like) sur les appareils Apple et paramétrer la couleur spécifique sous Windows (`msapplication-TileColor`).
- **Favicons complets :** Fichiers locaux (`apple-touch-icon`, `site.webmanifest`, favicons 16x16 et 32x32) basés sur les assets du projet.
- **Modèles de tableau (`table`) :** Utilisés pour la comparaison des algorithmes cryptographiques actuels et PQC (Post-Quantum Cryptography).
- **Grilles (`grid sm`, `grid ms`) :** Utilisation de classes utilitaires (`alignright`, `aligncenter`, `column`) pour structurer facilement les informations de manière asymétrique, caractéristique du design de webslide.
