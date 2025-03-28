import { SmtActor } from "../actor/actor.js";
import { SmtItem } from "../item/item.js";

/**
 * Manage Active Effect instances through the Actor Sheet via effect control buttons.
 * @param {MouseEvent} event      The left-click event on the effect control
 * @param {Actor|Item} owner      The owning document which manages this effect
 */

export function onManageActiveEffect(
  event: JQuery.ClickEvent,
  owner: SmtActor<CharacterClass> | SmtItem<ItemType>,
) {
  event.preventDefault();
  const a = $(event.currentTarget);

  const test = owner.type;
}
