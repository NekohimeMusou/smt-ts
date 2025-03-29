import { ITEMMODELS } from "./data-models/item/item-data-models.js";
import { SmtItem } from "./documents/item/item.js";

declare global {
  interface Game {
    smt: {
      SmtItem: typeof SmtItem;
    };
  }

  type ItemType = "skill";
}

Hooks.once("init", () => {
  console.log("SMT-TC | Initializing SMT: Tokyo Conception game system");

  registerDataModels();
  registerDocumentClasses();
});

function registerDataModels() {
  CONFIG.Item.dataModels = ITEMMODELS;
}

function registerDocumentClasses() {
  CONFIG.Item.documentClass = SmtItem;
}
