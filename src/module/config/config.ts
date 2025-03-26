import { templatePaths } from "./templates.js";

/**
 * Global Constants
 */
const characterClasses = {
  fiend: "TYPES.Actor.fiend",
  demon: "TYPES.Actor.demon",
  human: "TYPES.Actor.human",
} as const;

const itemTypes = {
  skill: "TYPES.Item.skill",
} as const;

const stats = {
  st: "SMT.stats.st.short",
  ma: "SMT.stats.ma.short",
  vi: "SMT.stats.vi.short",
  ag: "SMT.stats.ag.short",
  lu: "SMT.stats.lu.short",
} as const;

/**
 * Class Constants
 */
const fiendLevelTable = Array(101)
  .fill(0)
  .map((_, index) => Math.pow(index, 3));
const demonLevelTable = fiendLevelTable.map((xp) => Math.floor(xp * 1.3));
const humanLevelTable = fiendLevelTable.map((xp) => Math.floor(xp * 0.8));

export const SMT = {
  templatePaths,
  characterClasses,
  itemTypes,
  stats,
  levelTables: {
    fiend: fiendLevelTable,
    demon: demonLevelTable,
    human: humanLevelTable,
  },
} as const;
