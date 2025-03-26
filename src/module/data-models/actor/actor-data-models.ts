import { DemonData } from "./types/demon.js";
import { FiendData } from "./types/fiend.js";
import { HumanData } from "./types/human.js";

export const ACTORMODELS = {
  fiend: FiendData,
  demon: DemonData,
  human: HumanData,
} as const;
