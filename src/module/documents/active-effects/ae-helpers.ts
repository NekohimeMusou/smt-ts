import { getGame } from "../../smt-ts.js";
import { SmtActor } from "../actor/actor.js";
import { SmtItem } from "../item/item.js";

interface AECategory {
  type: "temporary" | "passive" | "inactive";
  label: string;
  effects: ActiveEffect[];
}

interface AECategories {
  temporary: AECategory;
  passive: AECategory;
  inactive: AECategory;
}

/**
 * Manage Active Effect instances through the Actor Sheet via effect control buttons.
 * @param {MouseEvent} event      The left-click event on the effect control
 * @param {Actor|Item} owner      The owning document which manages this effect
 */

export async function onManageActiveEffect(
  event: JQuery.ClickEvent,
  owner: SmtActor<CharacterClass> | SmtItem<ItemType>,
) {
  event.preventDefault();
  const a = $(event.currentTarget);
  const li = a.closest("li");

  const effectId = li.data("effectId") as string;

  const thing = owner.type;

  console.log(thing);

  const neko = owner.type;

  const effect = owner.effects.get(effectId) ?? null;

  const actor = ["fiend", "human", "demon"].includes(owner.type)
    ? owner
    : owner.parent!;

  switch (a.data("action")) {
    case "create":
      return await owner.createEmbeddedDocuments("ActiveEffect", [
        {
          name: getGame().i18n.localize("SMT.effects.newEffect"),
          icon: "icons/svg/aura.svg",
          origin: owner.uuid,
          duration: {
            rounds: li.data("effectType") === "temporary" ? 1 : undefined,
          },
          disabled: li.data("effectType") === "inactive",
        },
      ]);
    case "edit":
      return await effect?.sheet.render(true);
    case "delete":
      await owner.deleteEmbeddedDocuments("ActiveEffect", [effect?.id]);
      if (actor) await actor.sheet.render(false);
      return;
    case "toggle":
      await owner.updateEmbeddedDocuments("ActiveEffect", [
        { _id: effect?.id, disabled: !effect?.disabled },
      ]);
      if (actor) await actor?.sheet?.render(false);
      return;
  }
} /**
 * Prepare the data structure for Active Effects which are currently applied to an Actor or Item.
 * @param {ActiveEffect[]} effects    The array of Active Effect instances to prepare sheet data for
 * @return {object}                   Data for rendering
 */

export function prepareActiveEffectCategories(
  effects: Collection<ActiveEffect>,
): object {
  // Define effect header categories
  const categories: AECategories = {
    temporary: {
      type: "temporary",
      label: getGame().i18n.localize("SMT.effects.temporary"),
      effects: [],
    },
    passive: {
      type: "passive",
      label: getGame().i18n.localize("SMT.effects.passive"),
      effects: [],
    },
    inactive: {
      type: "inactive",
      label: getGame().i18n.localize("SMT.effects.inactive"),
      effects: [],
    },
  };

  // Iterate over active effects, classifying them into categories
  for (const e of effects) {
    if (e.disabled) categories.inactive.effects.push(e);
    else if (e.isTemporary) categories.temporary.effects.push(e);
    else categories.passive.effects.push(e);
  }
  return categories;
}
