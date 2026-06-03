<div align="center">

# 🎓 RirousassLand — L'Aventure du Savoir

**Application éducative gamifiée pour enfants**  
Maths · Français · Anglais · Grande Section → 5ème

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-purple?logo=framer)](https://framer.com/motion)
[![License: MIT](https://img.shields.io/badge/License-MIT-green)](LICENSE)

</div>

---

## ✨ Présentation

RirousassLand transforme les révisions scolaires en véritable jeu d'aventure. Chaque enfant a son profil personnalisé, gagne des XP, débloques des badges et monte de niveau — tout en apprenant les maths, le français et l'anglais.

Conçu pour **3 niveaux simultanés** dans la même famille :

| Profil | Niveau | Matières |
|--------|--------|----------|
| 🌸 **Syma** | Grande Section | Comptage, lettres, couleurs en anglais |
| ⚡ **Sany** | CE2 | Calcul jusqu'à 100, tables, conjugaison |
| 🚀 **Seji** | 5ème | Fractions, équations, passé composé, anglais avancé |

---

## 🎮 Fonctionnalités

### Pour les enfants
- **Profils personnalisés** — emoji, couleurs et messages d'encouragement dédiés
- **Système XP & niveaux** — 10 XP par bonne réponse, bonus sur les combos
- **Streaks de combos** — bonus à chaque série de 3 bonnes réponses consécutives
- **3 cœurs (vies)** — la session s'arrête si on perd tous ses cœurs
- **Badges à débloquer** — 🌱 Premiers pas · 🗺️ Explorateur · 🏆 Champion
- **Confettis & sons** — feedback immédiat et récompense à chaque bonne réponse
- **Mascotte réactive** — elle change d'expression selon tes réponses
- **Écran de résultats** — 1 à 3 étoiles selon le score, confettis de victoire
- **Questions mélangées** — ordre aléatoire à chaque session pour ne jamais s'ennuyer

### Pour les parents
- **Dashboard dédié** — vue globale sur la progression de chaque enfant
- **Graphiques en anneau** — précision par matière (Maths / Français / Anglais)
- **Indicateurs colorés** — 🟢 Excellent · 🟡 Bien · 🔴 À revoir
- **Historique** — date de la dernière session, XP total, badges obtenus
- **Séries de jours** — nombre de jours consécutifs joués

---

## 🕹️ Comment jouer

```
1. Ouvrir l'application → choisir son profil
2. Sélectionner une matière (Maths, Français ou Anglais)
3. Répondre à 10 questions en appuyant sur A, B, C ou D
4. Collecter les XP, enchaîner les combos, débloquer des badges !
5. Voir son score final et recommencer pour faire mieux 🔄
```

---

## 🚀 Installation locale

### Prérequis
- Node.js 18+
- npm

### Démarrage

```bash
# Cloner le projet
git clone https://github.com/riadh-mnasri/game-study.git
cd game-study

# Installer les dépendances
npm install

# Lancer en développement (port 7777)
npm run dev
```

Ouvrir **http://localhost:7777** dans le navigateur.

### Build de production

```bash
npm run build
npm start
```

---

## 🏗️ Architecture

```
game-study/
├── app/
│   ├── page.tsx                    # Accueil — sélection de profil
│   ├── [profileId]/
│   │   ├── page.tsx                # Dashboard de l'enfant
│   │   └── [subject]/
│   │       └── page.tsx            # Session d'exercices
│   └── parent/
│       └── page.tsx                # Tableau de bord parent
│
├── components/
│   ├── Confetti.tsx                # Animation de confettis (canvas-confetti)
│   ├── SubjectCard.tsx             # Carte matière avec XP et badges
│   └── XpBar.tsx                   # Barre de progression XP
│
└── lib/
    ├── types.ts                    # Types TypeScript globaux
    ├── profiles.ts                 # Données des 3 profils
    ├── gameState.ts                # Logique XP, niveaux, badges (localStorage)
    ├── sounds.ts                   # Sons via Web Audio API (sans dépendance)
    └── exercises/
        ├── index.ts                # Sélection et mélange des exercices
        ├── syma.ts                 # 30 exercices GS (maths/français/anglais)
        ├── sany.ts                 # 30 exercices CE2
        └── seji.ts                 # 30 exercices 5ème
```

### Persistance des données

Toutes les données de progression sont stockées dans le **localStorage** du navigateur — aucun compte, aucun serveur, aucune donnée personnelle transmise. Chaque famille reste maître de ses données.

---

## ➕ Ajouter des exercices

Ouvrir le fichier correspondant au profil dans `lib/exercises/` et ajouter un objet `Exercise` :

```ts
// lib/exercises/sany.ts
{
  id: "sa_m13",           // identifiant unique
  question: "7 × 8 = ?",
  options: ["54", "56", "58", "52"],
  correct: 1,             // index de la bonne réponse (0-based)
}
```

Les questions sont automatiquement mélangées à chaque session — pas besoin de les trier.

---

## 🛠️ Stack technique

| Technologie | Usage |
|-------------|-------|
| **Next.js 16** (App Router) | Framework React fullstack |
| **TypeScript 5** | Typage statique |
| **Tailwind CSS 4** | Styles utilitaires |
| **Framer Motion 12** | Animations fluides (transitions, spring) |
| **canvas-confetti** | Effets de confettis |
| **Web Audio API** | Sons générés sans dépendance |
| **localStorage** | Persistance locale des données |
| **Nunito** (next/font) | Police arrondie, idéale pour les enfants |

---

## 🎨 Design

- **Boutons style Kahoot** — A=Bleu, B=Jaune, C=Rouge, D=Vert pour une reconnaissance immédiate
- **Fond sombre "mode jeu"** pendant les exercices pour la concentration
- **Feedback instantané** — confettis + son + XP flottant sur bonne réponse
- **Shake + son grave** sur mauvaise réponse (sans punition, juste un signal)
- **Transitions spring** entre chaque question via Framer Motion
- **Mascotte animée** qui réagit (😊 → 🥳 → 🔥 → 😬)

---

## 📄 Licence

MIT — libre d'utilisation, modification et distribution.

---

<div align="center">
Fait avec ❤️ pour Syma 🌸, Sany ⚡ et Seji 🚀
</div>
