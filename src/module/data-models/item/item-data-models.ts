import { SkillData } from "./types/skill.js";

declare global {
  interface DataModelConfig {
    Item: {
      skill: typeof SkillData;
    };
  }
}

export const ITEMMODELS = {
  skill: SkillData,
} as const;
