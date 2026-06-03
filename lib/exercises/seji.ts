import { Exercise } from "../types";

export const sejiMaths: Exercise[] = [
  { id: "se_m1", question: "Simplifier la fraction : 6/8", options: ["3/4", "2/3", "1/2", "4/6"], correct: 0 },
  { id: "se_m2", question: "Résoudre : 3x = 15, x = ?", options: ["4", "6", "5", "3"], correct: 2 },
  { id: "se_m3", question: "Quel est 25% de 80 ?", options: ["15", "25", "20", "30"], correct: 2 },
  { id: "se_m4", question: "1/2 + 1/4 = ?", options: ["2/6", "3/4", "1/3", "2/4"], correct: 1 },
  { id: "se_m5", question: "Si un article coûte 40€ avec 20% de réduction, il coûte ?", options: ["30€", "32€", "28€", "35€"], correct: 1 },
  { id: "se_m6", question: "Résoudre : 2x + 3 = 11, x = ?", options: ["3", "5", "4", "6"], correct: 2 },
  { id: "se_m7", question: "Quel est le PGCD de 12 et 18 ?", options: ["3", "9", "6", "4"], correct: 2 },
  { id: "se_m8", question: "3/5 × 10 = ?", options: ["5", "8", "6", "4"], correct: 2 },
  { id: "se_m9", question: "Un triangle a des angles de 60° et 80°. Le troisième angle ?", options: ["30°", "50°", "40°", "45°"], correct: 2 },
  { id: "se_m10", question: "(-3) × (-4) = ?", options: ["-12", "7", "12", "-7"], correct: 2 },
  { id: "se_m11", question: "2/3 + 1/6 = ?", options: ["3/9", "5/6", "4/9", "1/2"], correct: 1 },
  { id: "se_m12", question: "Résoudre : 5x - 2 = 13, x = ?", options: ["2", "4", "3", "5"], correct: 2 },
];

export const sejiFrancais: Exercise[] = [
  { id: "se_f1", question: "Conjuguer 'finir' au passé composé, 1ère personne du singulier :", options: ["Je finissais", "J'ai fini", "Je finirai", "Je finirais"], correct: 1 },
  { id: "se_f2", question: "Quel est le COD dans : 'Marie mange une pomme' ?", options: ["Marie", "mange", "une pomme", "Il n'y en a pas"], correct: 2 },
  { id: "se_f3", question: "Conjuguer 'aller' à l'imparfait, 3ème personne du pluriel :", options: ["Ils vont", "Ils iront", "Ils allaient", "Ils allèrent"], correct: 2 },
  { id: "se_f4", question: "Quel est le sens du préfixe 'im-' dans 'impossible' ?", options: ["Très", "Avant", "Contraire de", "Après"], correct: 2 },
  { id: "se_f5", question: "Quelle est la nature du mot 'rapidement' ?", options: ["Adjectif", "Verbe", "Adverbe", "Nom"], correct: 2 },
  { id: "se_f6", question: "Conjuguer 'prendre' au futur simple, 2ème personne du singulier :", options: ["Tu prenais", "Tu prendras", "Tu prends", "Tu pris"], correct: 1 },
  { id: "se_f7", question: "Dans 'Le livre que je lis est passionnant', que est...", options: ["Sujet", "Complément d'objet direct", "Complément d'objet indirect", "Adverbe"], correct: 1 },
  { id: "se_f8", question: "Quel est le participe passé de 'voir' ?", options: ["Voyé", "Vu", "Voit", "Voir"], correct: 1 },
  { id: "se_f9", question: "Quelle est la proposition subordonnée dans : 'Je sais qu'il viendra' ?", options: ["Je sais", "qu'il viendra", "il viendra", "Je sais qu'il"], correct: 1 },
  { id: "se_f10", question: "Le mot 'bienveillance' est de genre :", options: ["Masculin", "Féminin", "Les deux", "Neutre"], correct: 1 },
];

export const sejiAnglais: Exercise[] = [
  { id: "se_a1", question: "Choose the correct tense: 'She ___ to Paris last year.'", options: ["goes", "is going", "went", "has gone"], correct: 2 },
  { id: "se_a2", question: "What is the past participle of 'break'?", options: ["Breaked", "Broke", "Broken", "Breaking"], correct: 2 },
  { id: "se_a3", question: "Translate: 'Il pleuvait quand je suis sorti.'", options: ["It rains when I go out", "It was raining when I went out", "It rained when I went out", "It will rain when I go out"], correct: 1 },
  { id: "se_a4", question: "Choose the correct word: 'This is ___ book I told you about.'", options: ["a", "an", "the", "—"], correct: 2 },
  { id: "se_a5", question: "What does 'although' mean?", options: ["Parce que", "Donc", "Bien que / Même si", "Si"], correct: 2 },
  { id: "se_a6", question: "Which sentence is correct?", options: ["She don't like coffee", "She doesn't likes coffee", "She doesn't like coffee", "She not like coffee"], correct: 2 },
  { id: "se_a7", question: "What is the comparative of 'good'?", options: ["Gooder", "More good", "Better", "Best"], correct: 2 },
  { id: "se_a8", question: "Translate: 'J'aurais voulu venir.'", options: ["I wanted to come", "I would have liked to come", "I would like to come", "I will want to come"], correct: 1 },
  { id: "se_a9", question: "Fill in: 'If I ___ rich, I would travel the world.'", options: ["am", "was", "were", "be"], correct: 2 },
  { id: "se_a10", question: "What is the meaning of 'to come across'?", options: ["Traverser en courant", "Tomber sur / Rencontrer par hasard", "Dépasser", "Éviter"], correct: 1 },
];
