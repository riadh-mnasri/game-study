import { Exercise } from "../types";

export const sejiMaths: Exercise[] = [
  // Fractions
  { id: "se_m1", question: "Simplifier : 6/8", options: ["3/4", "2/3", "1/2", "4/6"], correct: 0 },
  { id: "se_m2", question: "1/2 + 1/4 = ?", options: ["2/6", "3/4", "1/3", "2/4"], correct: 1 },
  { id: "se_m3", question: "3/5 × 10 = ?", options: ["5", "8", "6", "4"], correct: 2 },
  { id: "se_m4", question: "2/3 + 1/6 = ?", options: ["3/9", "5/6", "4/9", "1/2"], correct: 1 },
  { id: "se_m5", question: "Simplifier : 10/15", options: ["1/2", "3/5", "2/3", "4/5"], correct: 2 },
  { id: "se_m6", question: "1/3 + 1/3 = ?", options: ["1/6", "2/9", "2/3", "1/3"], correct: 2 },
  { id: "se_m7", question: "3/4 - 1/4 = ?", options: ["1/4", "2/8", "2/4", "1/2"], correct: 3 },
  { id: "se_m8", question: "Simplifier : 4/12", options: ["2/6", "1/4", "1/3", "2/4"], correct: 2 },
  { id: "se_m9", question: "5/8 + 1/8 = ?", options: ["5/16", "6/16", "6/8", "3/4"], correct: 2 },
  { id: "se_m10", question: "Simplifier : 9/12", options: ["2/3", "3/4", "4/5", "1/2"], correct: 1 },
  // Équations
  { id: "se_m11", question: "Résoudre : 3x = 15, x = ?", options: ["4", "6", "5", "3"], correct: 2 },
  { id: "se_m12", question: "Résoudre : 2x + 3 = 11, x = ?", options: ["3", "5", "4", "6"], correct: 2 },
  { id: "se_m13", question: "Résoudre : 5x - 2 = 13, x = ?", options: ["2", "4", "3", "5"], correct: 2 },
  { id: "se_m14", question: "Résoudre : x + 7 = 15, x = ?", options: ["6", "9", "8", "7"], correct: 2 },
  { id: "se_m15", question: "Résoudre : 4x = 28, x = ?", options: ["6", "8", "7", "9"], correct: 2 },
  { id: "se_m16", question: "Résoudre : 3x - 6 = 9, x = ?", options: ["4", "6", "5", "7"], correct: 2 },
  { id: "se_m17", question: "Résoudre : 2x + 10 = 20, x = ?", options: ["4", "6", "5", "8"], correct: 2 },
  { id: "se_m18", question: "Résoudre : x/3 = 4, x = ?", options: ["9", "15", "12", "8"], correct: 2 },
  // Pourcentages
  { id: "se_m19", question: "25% de 80 = ?", options: ["15", "25", "20", "30"], correct: 2 },
  { id: "se_m20", question: "Article à 40€ avec 20% de réduction ?", options: ["30€", "32€", "28€", "35€"], correct: 1 },
  { id: "se_m21", question: "10% de 150 = ?", options: ["10", "20", "15", "25"], correct: 2 },
  { id: "se_m22", question: "50% de 60 = ?", options: ["20", "40", "30", "35"], correct: 2 },
  { id: "se_m23", question: "75% de 100 = ?", options: ["70", "80", "75", "65"], correct: 2 },
  { id: "se_m24", question: "Un article coûte 60€. Avec 15% de réduction, il coûte ?", options: ["45€", "54€", "51€", "48€"], correct: 2 },
  // Géométrie
  { id: "se_m25", question: "Un triangle a des angles de 60° et 80°. Le 3ème angle ?", options: ["30°", "50°", "40°", "45°"], correct: 2 },
  { id: "se_m26", question: "Quel est le PGCD de 12 et 18 ?", options: ["3", "9", "6", "4"], correct: 2 },
  { id: "se_m27", question: "Aire d'un rectangle : longueur 8, largeur 5 ?", options: ["26 cm²", "30 cm²", "40 cm²", "45 cm²"], correct: 2 },
  { id: "se_m28", question: "Périmètre d'un carré de côté 6 cm ?", options: ["18 cm", "36 cm", "24 cm", "12 cm"], correct: 2 },
  { id: "se_m29", question: "La somme des angles d'un triangle est ?", options: ["90°", "270°", "180°", "360°"], correct: 2 },
  { id: "se_m30", question: "Aire d'un triangle : base 10 cm, hauteur 6 cm ?", options: ["60 cm²", "16 cm²", "30 cm²", "20 cm²"], correct: 2 },
  // Nombres relatifs
  { id: "se_m31", question: "(-3) × (-4) = ?", options: ["-12", "7", "12", "-7"], correct: 2 },
  { id: "se_m32", question: "(-5) + 3 = ?", options: ["8", "-8", "-2", "2"], correct: 2 },
  { id: "se_m33", question: "7 + (-10) = ?", options: ["3", "-3", "17", "-17"], correct: 1 },
  { id: "se_m34", question: "(-6) × 4 = ?", options: ["24", "-10", "-24", "10"], correct: 2 },
  { id: "se_m35", question: "(-8) - (-3) = ?", options: ["-11", "11", "-5", "5"], correct: 2 },
  // Proportionnalité
  { id: "se_m36", question: "Si 3 stylos coûtent 6€, combien coûtent 5 stylos ?", options: ["8€", "12€", "10€", "15€"], correct: 2 },
  { id: "se_m37", question: "Si 4 kg de farine coûtent 3,20€, combien coûte 1 kg ?", options: ["0,60€", "0,90€", "0,80€", "1,20€"], correct: 2 },
  // Puissances
  { id: "se_m38", question: "2³ = ?", options: ["6", "9", "8", "4"], correct: 2 },
  { id: "se_m39", question: "5² = ?", options: ["10", "15", "25", "20"], correct: 2 },
  { id: "se_m40", question: "10² = ?", options: ["20", "1000", "100", "200"], correct: 2 },
  // Statistiques
  { id: "se_m41", question: "La moyenne de 10, 20, 30 est ?", options: ["15", "25", "20", "18"], correct: 2 },
  { id: "se_m42", question: "La moyenne de 4, 8, 12, 16 est ?", options: ["8", "12", "10", "9"], correct: 2 },
  { id: "se_m43", question: "Quelle est la médiane de : 3, 7, 9, 11, 15 ?", options: ["7", "11", "9", "3"], correct: 2 },
  // Divers
  { id: "se_m44", question: "PGCD de 24 et 36 ?", options: ["6", "18", "12", "8"], correct: 2 },
  { id: "se_m45", question: "Résoudre : 6x + 4 = 22, x = ?", options: ["2", "4", "3", "5"], correct: 2 },

  // ── Niveau 4ème ────────────────────────────────────────────────
  { id: "se_m46", question: "Développer : (x + 3)² = ?", options: ["x² + 9", "x² + 6x + 9", "x² + 3x + 9", "2x + 6"], correct: 1 },
  { id: "se_m47", question: "Factoriser : x² - 9", options: ["(x-3)(x-3)", "(x+9)(x-1)", "(x+3)(x-3)", "(x-9)(x+1)"], correct: 2 },
  { id: "se_m48", question: "Développer : (2x - 1)(x + 4) = ?", options: ["2x² + 7x - 4", "2x² + 8x - 4", "2x² - 7x - 4", "2x² + 7x + 4"], correct: 0 },
  { id: "se_m49", question: "√144 = ?", options: ["11", "13", "12", "14"], correct: 2 },
  { id: "se_m50", question: "√225 = ?", options: ["14", "16", "15", "13"], correct: 2 },
  { id: "se_m51", question: "√64 = ?", options: ["6", "9", "8", "7"], correct: 2 },
  { id: "se_m52", question: "Théorème de Pythagore : triangle rectangle, a=3, b=4, c=?", options: ["5", "7", "6", "8"], correct: 0 },
  { id: "se_m53", question: "Théorème de Pythagore : a=5, b=12, c=?", options: ["11", "14", "13", "15"], correct: 2 },
  { id: "se_m54", question: "sin(30°) = ?", options: ["√3/2", "1", "1/2", "√2/2"], correct: 2 },
  { id: "se_m55", question: "cos(60°) = ?", options: ["√3/2", "1", "1/2", "0"], correct: 2 },
  { id: "se_m56", question: "tan(45°) = ?", options: ["0", "√3", "1/2", "1"], correct: 3 },
  { id: "se_m57", question: "Dans un triangle rectangle, sin(A) = côté opposé / ?", options: ["côté adjacent", "côté opposé", "hypoténuse", "périmètre"], correct: 2 },
  { id: "se_m58", question: "Une pièce : P(pile) = 1/2. Proba d'avoir face ?", options: ["1/4", "1/3", "1/2", "2/3"], correct: 2 },
  { id: "se_m59", question: "Dé à 6 faces : P(obtenir 3) = ?", options: ["1/3", "1/12", "1/6", "1/2"], correct: 2 },
  { id: "se_m60", question: "P(tirer une carte rouge dans un jeu de 52) = ?", options: ["1/4", "1/3", "1/2", "1/13"], correct: 2 },
  { id: "se_m61", question: "f(x) = 2x + 3. Quelle est f(4) ?", options: ["9", "12", "11", "10"], correct: 2 },
  { id: "se_m62", question: "f(x) = 3x - 1. Quelle est f(0) ?", options: ["3", "1", "-1", "0"], correct: 2 },
  { id: "se_m63", question: "f(x) = x² + 2. Quelle est f(3) ?", options: ["7", "12", "11", "9"], correct: 2 },
  { id: "se_m64", question: "Pente d'une droite passant par (0,1) et (2,5) ?", options: ["1", "3", "2", "4"], correct: 2 },
  { id: "se_m65", question: "Développer : (x+5)(x-5) = ?", options: ["x²+25", "x²-10x-25", "x²-25", "x²+10x-25"], correct: 2 },
  { id: "se_m66", question: "Résoudre : x² = 25, x = ?", options: ["±4", "±6", "±5", "±3"], correct: 2 },
  { id: "se_m67", question: "3⁻² = ?", options: ["-9", "1/6", "1/9", "-1/9"], correct: 2 },
  { id: "se_m68", question: "10⁻³ = ?", options: ["0,1", "0,01", "0,001", "0,0001"], correct: 2 },
  { id: "se_m69", question: "Médiane de : 2, 5, 7, 9, 12 ?", options: ["5", "9", "7", "6"], correct: 2 },
  { id: "se_m70", question: "Étendue de : 4, 8, 15, 6, 11 ?", options: ["9", "13", "11", "7"], correct: 2 },
  { id: "se_m71", question: "Factoriser : 2x² + 6x", options: ["2(x+3)", "x(2x+6)", "2x(x+3)", "2(x²+3x)"], correct: 2 },
  { id: "se_m72", question: "Résoudre : x² - 4 = 0, x = ?", options: ["±1", "±3", "±2", "±4"], correct: 2 },
  { id: "se_m73", question: "Dans un sac : 3 billes rouges, 2 bleues. P(rouge) = ?", options: ["2/5", "3/2", "3/5", "1/5"], correct: 2 },
  { id: "se_m74", question: "f(x) = -2x + 4 est une fonction : ?", options: ["Quadratique", "Constante", "Affine", "Exponentielle"], correct: 2 },
  { id: "se_m75", question: "cos(0°) = ?", options: ["0", "1/2", "1", "√3/2"], correct: 2 },
];

export const sejiFrancais: Exercise[] = [
  // Conjugaison — passé composé
  { id: "se_f1", question: "Conjuguer 'finir' au passé composé, 1ère pers. sing.", options: ["Je finissais", "J'ai fini", "Je finirai", "Je finirais"], correct: 1 },
  { id: "se_f2", question: "Conjuguer 'aller' à l'imparfait, 3ème pers. pluriel.", options: ["Ils vont", "Ils iront", "Ils allaient", "Ils allèrent"], correct: 2 },
  { id: "se_f3", question: "Conjuguer 'prendre' au futur simple, 2ème pers. sing.", options: ["Tu prenais", "Tu prendras", "Tu prends", "Tu pris"], correct: 1 },
  { id: "se_f4", question: "Quel est le participe passé de 'voir' ?", options: ["Voyé", "Vu", "Voit", "Voir"], correct: 1 },
  { id: "se_f5", question: "Conjuguer 'venir' au passé composé, 3ème pers. sing.", options: ["Il venait", "Il vint", "Il est venu", "Il viendra"], correct: 2 },
  { id: "se_f6", question: "Conjuguer 'être' à l'imparfait, 1ère pers. plur.", options: ["Nous sommes", "Nous serons", "Nous étions", "Nous fûmes"], correct: 2 },
  { id: "se_f7", question: "Conjuguer 'avoir' au conditionnel présent, 1ère pers. sing.", options: ["J'ai", "J'avais", "J'aurais", "J'aurai"], correct: 2 },
  { id: "se_f8", question: "Conjuguer 'faire' au passé composé, 2ème pers. plur.", options: ["Vous faisiez", "Vous ferez", "Vous avez fait", "Vous fîtes"], correct: 2 },
  { id: "se_f9", question: "Conjuguer 'savoir' au subjonctif présent, 3ème pers. sing.", options: ["Il sait", "Il sache", "Il savait", "Il saura"], correct: 1 },
  { id: "se_f10", question: "Conjuguer 'mettre' au futur simple, 1ère pers. sing.", options: ["Je mets", "Je mettais", "Je mettrai", "Je mis"], correct: 2 },
  // Grammaire — analyse
  { id: "se_f11", question: "Quel est le COD dans : 'Marie mange une pomme' ?", options: ["Marie", "mange", "une pomme", "Il n'y en a pas"], correct: 2 },
  { id: "se_f12", question: "Dans 'Le livre que je lis est passionnant', que est...", options: ["Sujet", "COD", "COI", "Adverbe"], correct: 1 },
  { id: "se_f13", question: "Quelle est la nature du mot 'rapidement' ?", options: ["Adjectif", "Verbe", "Adverbe", "Nom"], correct: 2 },
  { id: "se_f14", question: "Dans 'Je pense à toi', 'à toi' est...", options: ["COD", "COI", "Sujet", "Attribut"], correct: 1 },
  { id: "se_f15", question: "Dans 'Il semble fatigué', 'fatigué' est...", options: ["COD", "COI", "Attribut du sujet", "Épithète"], correct: 2 },
  { id: "se_f16", question: "Quelle est la fonction de 'beau' dans 'un beau paysage' ?", options: ["Attribut", "COD", "Épithète", "Apposition"], correct: 2 },
  { id: "se_f17", question: "Dans 'Je sais qu'il viendra', la proposition subordonnée est ?", options: ["Je sais", "qu'il viendra", "il viendra", "Je sais qu'il"], correct: 1 },
  { id: "se_f18", question: "Quelle est la nature de 'que' dans 'Je crois que tu as raison' ?", options: ["Pronom relatif", "Adverbe", "Conjonction de subordination", "Déterminant"], correct: 2 },
  // Vocabulaire — préfixes, suffixes
  { id: "se_f19", question: "Quel est le sens du préfixe 'im-' dans 'impossible' ?", options: ["Très", "Avant", "Contraire de", "Après"], correct: 2 },
  { id: "se_f20", question: "Quel est le sens du suffixe '-eur' dans 'chanteur' ?", options: ["Action", "Qui chante", "Résultat", "Lieu"], correct: 1 },
  { id: "se_f21", question: "Quel est le sens du préfixe 'anti-' dans 'antibrouillard' ?", options: ["Avec", "Contre", "Sans", "Avant"], correct: 1 },
  { id: "se_f22", question: "Quel est la famille du mot 'chaud' ?", options: ["Chaleur, chauffer, brûler", "Chaleur, chauffer, réchauffer", "Tiède, chaud, brûlant", "Feu, ardeur, flamme"], correct: 1 },
  { id: "se_f23", question: "Quel est le sens du préfixe 'bi-' dans 'bicyclette' ?", options: ["Un seul", "Trois", "Deux", "Plusieurs"], correct: 2 },
  // Figures de style
  { id: "se_f24", question: "'Il pleut des cordes' est une...", options: ["Métaphore", "Comparaison", "Hyperbole", "Personnification"], correct: 0 },
  { id: "se_f25", question: "'La lune souriait dans le ciel' est une...", options: ["Métaphore", "Comparaison", "Personnification", "Hyperbole"], correct: 2 },
  { id: "se_f26", question: "'Il est aussi rapide qu'un cheetah' est une...", options: ["Métaphore", "Comparaison", "Personnification", "Hyperbole"], correct: 1 },
  { id: "se_f27", question: "'J'ai attendu une éternité' est une...", options: ["Métaphore", "Litote", "Hyperbole", "Comparaison"], correct: 2 },
  // Orthographe
  { id: "se_f28", question: "Quelle est la bonne orthographe ?", options: ["Ils se sont disputer", "Ils se sont disputés", "Ils se sont disputé", "Ils se sont disputées"], correct: 1 },
  { id: "se_f29", question: "Quelle est la bonne orthographe ?", options: ["Elle s'est habillé", "Elle s'est habillés", "Elle s'est habillée", "Elle s'est habillées"], correct: 2 },
  { id: "se_f30", question: "Quelle est la bonne orthographe ?", options: ["Les filles sont partis", "Les filles sont partie", "Les filles sont parties", "Les filles sont parti"], correct: 2 },
  // Propositions subordonnées
  { id: "se_f31", question: "Dans 'Je pars quand il arrive', la subordonnée est de temps ou de cause ?", options: ["Cause", "But", "Temps", "Conséquence"], correct: 2 },
  { id: "se_f32", question: "'Bien qu'il fasse froid, il sort' — la subordonnée exprime ?", options: ["La cause", "La concession", "Le but", "La condition"], correct: 1 },
  { id: "se_f33", question: "'S'il pleut, je reste' — la subordonnée exprime ?", options: ["La cause", "Le temps", "La condition", "La concession"], correct: 2 },
  // Passif / actif
  { id: "se_f34", question: "'Le chat mange la souris.' Mettre à la voix passive :", options: ["La souris est mangée par le chat", "La souris mange le chat", "Le chat est mangé par la souris", "La souris a été mangée"], correct: 0 },
  { id: "se_f35", question: "'La maison a été construite par des ouvriers.' Mettre à la voix active :", options: ["Des ouvriers construisaient la maison", "La maison construit les ouvriers", "Des ouvriers ont construit la maison", "Les ouvriers construisent la maison"], correct: 2 },
  // Genre des mots
  { id: "se_f36", question: "Le mot 'bienveillance' est de genre :", options: ["Masculin", "Féminin", "Les deux", "Neutre"], correct: 1 },
  { id: "se_f37", question: "Quel est le féminin de 'vieux' ?", options: ["Vieille", "Vieiles", "Vieusse", "Vieue"], correct: 0 },
  // Niveaux de langue
  { id: "se_f38", question: "'Bouquin' est un synonyme familier de :", options: ["Crayon", "Livre", "Cahier", "Journal"], correct: 1 },
  { id: "se_f39", question: "Quel est le registre de langue de 'se barrer' (partir) ?", options: ["Soutenu", "Courant", "Familier", "Technique"], correct: 2 },
  // Ponctuation avancée
  { id: "se_f40", question: "À quoi sert le point-virgule ?", options: ["Énumérer des éléments courts", "Séparer deux propositions liées", "Indiquer une interruption", "Introduire une citation"], correct: 1 },
  // Révision générale
  { id: "se_f41", question: "Conjuguer 'pouvoir' au présent, 1ère pers. plur.", options: ["Nous pouvons", "Nous pouvions", "Nous pourrons", "Nous pouviez"], correct: 0 },
  { id: "se_f42", question: "Quel est le participe passé de 'naître' ?", options: ["Né", "Nait", "Naissé", "Natif"], correct: 0 },
  { id: "se_f43", question: "Dans 'Il est parti tôt', 'tôt' est un :", options: ["Adjectif", "Nom", "Adverbe", "Verbe"], correct: 2 },
  { id: "se_f44", question: "Conjuguer 'recevoir' au futur, 3ème pers. plur.", options: ["Ils reçoivent", "Ils recevaient", "Ils recevront", "Ils auraient reçu"], correct: 2 },
  { id: "se_f45", question: "Quel est l'antonyme de 'vaillant' ?", options: ["Fort", "Courageux", "Brave", "Lâche"], correct: 3 },
];

export const sejiAnglais: Exercise[] = [
  // Temps verbaux
  { id: "se_a1", question: "Choose the correct tense: 'She ___ to Paris last year.'", options: ["goes", "is going", "went", "has gone"], correct: 2 },
  { id: "se_a2", question: "What is the past participle of 'break'?", options: ["Breaked", "Broke", "Broken", "Breaking"], correct: 2 },
  { id: "se_a3", question: "Translate: 'Il pleuvait quand je suis sorti.'", options: ["It rains when I go out", "It was raining when I went out", "It rained when I went out", "It will rain when I go out"], correct: 1 },
  { id: "se_a4", question: "Choose: 'This is ___ book I told you about.'", options: ["a", "an", "the", "—"], correct: 2 },
  { id: "se_a5", question: "What does 'although' mean?", options: ["Parce que", "Donc", "Bien que / Même si", "Si"], correct: 2 },
  { id: "se_a6", question: "Which sentence is correct?", options: ["She don't like coffee", "She doesn't likes coffee", "She doesn't like coffee", "She not like coffee"], correct: 2 },
  { id: "se_a7", question: "What is the comparative of 'good'?", options: ["Gooder", "More good", "Better", "Best"], correct: 2 },
  { id: "se_a8", question: "Translate: 'J'aurais voulu venir.'", options: ["I wanted to come", "I would have liked to come", "I would like to come", "I will want to come"], correct: 1 },
  { id: "se_a9", question: "Fill in: 'If I ___ rich, I would travel the world.'", options: ["am", "was", "were", "be"], correct: 2 },
  { id: "se_a10", question: "What is the meaning of 'to come across'?", options: ["Traverser en courant", "Tomber sur / Rencontrer par hasard", "Dépasser", "Éviter"], correct: 1 },
  // Voix passive
  { id: "se_a11", question: "Put into passive: 'Shakespeare wrote Hamlet.'", options: ["Hamlet is written by Shakespeare", "Hamlet wrote Shakespeare", "Hamlet was written by Shakespeare", "Shakespeare has written Hamlet"], correct: 2 },
  { id: "se_a12", question: "Which is passive voice? ", options: ["She reads the book", "The book is read by her", "She is reading the book", "She has read the book"], correct: 1 },
  // Verbes irréguliers
  { id: "se_a13", question: "Past tense of 'go' ?", options: ["Goed", "Gone", "Went", "Goes"], correct: 2 },
  { id: "se_a14", question: "Past tense of 'see' ?", options: ["Seed", "Seen", "Saw", "Sees"], correct: 2 },
  { id: "se_a15", question: "Past tense of 'eat' ?", options: ["Eated", "Ate", "Eaten", "Eats"], correct: 1 },
  { id: "se_a16", question: "Past tense of 'write' ?", options: ["Writed", "Written", "Wrote", "Writes"], correct: 2 },
  { id: "se_a17", question: "Past tense of 'think' ?", options: ["Thinked", "Thought", "Thinks", "Thunk"], correct: 1 },
  { id: "se_a18", question: "Past tense of 'buy' ?", options: ["Buyed", "Bought", "Buys", "Boughted"], correct: 1 },
  // Conditionnel
  { id: "se_a19", question: "'If it rains, I ___ stay home.' (1st conditional)", options: ["would", "will", "should", "might"], correct: 1 },
  { id: "se_a20", question: "'If I were a bird, I ___ fly.' (2nd conditional)", options: ["will", "would", "can", "should"], correct: 1 },
  { id: "se_a21", question: "Which is a 2nd conditional?", options: ["If it rains, I will stay", "If I were rich, I would travel", "If I was there, I saw it", "I would go if it rains"], correct: 1 },
  // Articles et déterminants
  { id: "se_a22", question: "Choose the correct article: '___ honest man'", options: ["A", "An", "The", "—"], correct: 1 },
  { id: "se_a23", question: "Choose: 'I play ___ guitar.'", options: ["a", "an", "the", "—"], correct: 2 },
  { id: "se_a24", question: "Choose: 'She is ___ engineer.'", options: ["a", "an", "the", "—"], correct: 1 },
  // Discours indirect
  { id: "se_a25", question: "Direct: 'I am happy.' → Indirect: 'He said he ___ happy.'", options: ["is", "was", "were", "will be"], correct: 1 },
  { id: "se_a26", question: "Direct: 'I will come.' → Indirect: 'She said she ___ come.'", options: ["will", "would", "should", "can"], correct: 1 },
  // Vocabulaire avancé
  { id: "se_a27", question: "What does 'nevertheless' mean?", options: ["Par conséquent", "Cependant / Néanmoins", "De plus", "En résumé"], correct: 1 },
  { id: "se_a28", question: "What does 'to take for granted' mean?", options: ["Obtenir gratuitement", "Considérer comme acquis", "Remercier quelqu'un", "Travailler dur"], correct: 1 },
  { id: "se_a29", question: "What is the superlative of 'bad'?", options: ["Baddest", "Most bad", "Worst", "Worse"], correct: 2 },
  { id: "se_a30", question: "What is the superlative of 'far'?", options: ["Farthest", "More far", "Farrer", "Most far"], correct: 0 },
  // Prépositions avancées
  { id: "se_a31", question: "She has been living here ___ 2020.", options: ["for", "during", "since", "ago"], correct: 2 },
  { id: "se_a32", question: "I haven't seen him ___ three years.", options: ["since", "ago", "for", "during"], correct: 2 },
  // Questions tags
  { id: "se_a33", question: "'She is French, ___ she?'", options: ["isn't", "is", "wasn't", "doesn't"], correct: 0 },
  { id: "se_a34", question: "'They don't like it, ___ they?'", options: ["don't", "do", "didn't", "are"], correct: 1 },
  // Phrasal verbs
  { id: "se_a35", question: "What does 'to give up' mean?", options: ["Offrir", "Abandonner", "Distribuer", "Monter"], correct: 1 },
  { id: "se_a36", question: "What does 'to look forward to' mean?", options: ["Regarder devant", "Se souvenir de", "Avoir hâte de", "Chercher à"], correct: 2 },
  { id: "se_a37", question: "What does 'to run out of' mean?", options: ["Courir loin de", "Manquer de / Ne plus avoir de", "Sortir en courant", "Dépenser trop"], correct: 1 },
  // Present perfect
  { id: "se_a38", question: "'I ___ never been to Japan.' Complete.", options: ["did", "was", "have", "had"], correct: 2 },
  { id: "se_a39", question: "Which uses present perfect correctly?", options: ["I have seen him yesterday", "I have seen him last year", "I have seen him recently", "I have seen him in 2020"], correct: 2 },
  // Traduction complexe
  { id: "se_a40", question: "Translate: 'Plus je travaille, plus j'apprends.'", options: ["More I work, more I learn", "The more I work, the more I learn", "I work more and more to learn", "While working I learn more"], correct: 1 },
  { id: "se_a41", question: "Translate: 'On m'a dit que tu partais.'", options: ["Someone told me you're leaving", "I was told that you were leaving", "They said to me you leave", "I have been told you left"], correct: 1 },
  // Vocabulaire thématique
  { id: "se_a42", question: "What is 'réchauffement climatique' in English?", options: ["Air pollution", "Natural disaster", "Global warming", "Climate change"], correct: 2 },
  { id: "se_a43", question: "What does 'to be on the fence' mean?", options: ["Être prudent", "Ne pas avoir d'opinion tranchée", "Être en danger", "Faire la frontière"], correct: 1 },
  { id: "se_a44", question: "What does 'breach' mean in a formal context?", options: ["Plage", "Rupture / Violation", "Discours", "Accord"], correct: 1 },
  { id: "se_a45", question: "'Despite his efforts, he failed.' Quel est le sens de 'despite' ?", options: ["Grâce à", "À cause de", "Malgré", "Avant"], correct: 2 },
];
