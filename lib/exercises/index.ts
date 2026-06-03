import { ProfileId, Subject, Exercise } from "../types";
import { symaMaths, symaFrancais, symaAnglais } from "./syma";
import { sanyMaths, sanyFrancais, sanyAnglais } from "./sany";
import { sejiMaths, sejiFrancais, sejiAnglais } from "./seji";

const exercises: Record<ProfileId, Record<Subject, Exercise[]>> = {
  syma: { maths: symaMaths, francais: symaFrancais, anglais: symaAnglais },
  sany: { maths: sanyMaths, francais: sanyFrancais, anglais: sanyAnglais },
  seji: { maths: sejiMaths, francais: sejiFrancais, anglais: sejiAnglais },
};

export function getExercises(profileId: ProfileId, subject: Subject): Exercise[] {
  return exercises[profileId][subject];
}

export function getRandomExercises(profileId: ProfileId, subject: Subject, count = 10): Exercise[] {
  const all = [...exercises[profileId][subject]];
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }
  return all.slice(0, count);
}
