import { SmtItem } from "../../../documents/item/item.js";

const fields = foundry.data.fields;

const schema = {
  description: new fields.HTMLField(),
};

export abstract class SmtBaseItemData<
  T extends SmtItem<ItemType>,
> extends foundry.abstract.TypeDataModel<typeof schema, T> {
  static override defineSchema() {
    return schema;
  }
}
