import { DemonData } from "./types/demon.js";
import { FiendData } from "./types/fiend.js";
import { HumanData } from "./types/human.js";

declare global {
  interface DataModelConfig {
    Actor: {
      fiend: typeof FiendData;
      demon: typeof DemonData;
      human: typeof HumanData;
    };
  }
}

export const ACTORMODELS = {
  fiend: FiendData,
  demon: DemonData,
  human: HumanData,
} as const;
