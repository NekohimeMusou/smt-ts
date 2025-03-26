import { SkillData } from "./types/skill.js";
import { WeaponData } from "./types/weapon.js";

declare global {
  interface DataModelConfig {
    Item: {
      skill: typeof SkillData;
      weapon: typeof WeaponData;
    };
  }
}

export const ITEMMODELS = {
  skill: SkillData,
  weapon: WeaponData,
} as const;
