import { SMT } from "./config/config.js";
import { ACTORMODELS } from "./data-models/actor/actor-data-models.js";
import { ITEMMODELS } from "./data-models/item/item-data-models.js";
import { SmtActor } from "./documents/actor/actor.js";
import { SmtItem } from "./documents/item/item.js";

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
  await preloadHandlebarsTemplates();
});

function registerDataModels() {
  CONFIG.Actor.dataModels = ACTORMODELS;
  CONFIG.Item.dataModels = ITEMMODELS;
}

async function preloadHandlebarsTemplates() {
  await loadTemplates(SMT.templatePaths);
}
