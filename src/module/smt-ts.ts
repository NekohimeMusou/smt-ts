import { SMT } from "./config/config.js";
import { ACTORMODELS } from "./data-models/actor/actor-data-models.js";
import { ITEMMODELS } from "./data-models/item/item-data-models.js";
import { SmtActor } from "./documents/actor/actor.js";
import { SmtItem } from "./documents/item/item.js";
import { SmtActorSheet } from "./sheets/actor/actor-sheet.js";
import { SmtItemSheet } from "./sheets/item/item-sheet.js";

declare global {
  interface CONFIG {
    SMT: typeof SMT;
  }

  interface Game {
    smt: {
      SmtActor: typeof SmtActor;
      SmtItem: typeof SmtItem;
    };
  }
}

export function isCharacterClass(cls: string): cls is CharacterClass {
  return cls in CONFIG.SMT.characterClasses;
}

export function isItemType(cls: string): cls is ItemType {
  return cls in CONFIG.SMT.itemTypes;
}

export function getGame(): ReadyGame {
  if (game instanceof Game && game.ready) {
    return game;
  }

  throw new Error("game object not initialized yet!");
}

Hooks.once("init", async () => {
  console.log("SMT-TC | Initializing SMT: Tokyo Conception game system");

  // Global configuration
  CONFIG.ActiveEffect.legacyTransferral = false;
  CONFIG.SMT = SMT;

  registerDataModels();
  registerDocumentClasses();
  registerSheetApplications();
  await preloadHandlebarsTemplates();
});

function registerDataModels() {
  CONFIG.Actor.dataModels = ACTORMODELS;
  CONFIG.Item.dataModels = ITEMMODELS;
}

function registerDocumentClasses() {
  CONFIG.Actor.documentClass = SmtActor;
  CONFIG.Item.documentClass = SmtItem;
}

function registerSheetApplications() {
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("smt-ts", SmtActorSheet, {
    types: Object.keys(CONFIG.SMT.characterClasses),
    makeDefault: true,
  });

  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("smt-ts", SmtItemSheet, {
    types: Object.keys(CONFIG.SMT.itemTypes),
    makeDefault: true,
  });
}

async function preloadHandlebarsTemplates() {
  await loadTemplates(SMT.templatePaths);
}
