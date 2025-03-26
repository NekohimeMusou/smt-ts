const fields = foundry.data.fields;

const schema = {
  description: new fields.HTMLField(),
};

export default class SmtBaseItemData extends foundry.abstract.TypeDataModel<
  typeof schema,
  Actor
> {
  static override defineSchema() {
    return schema;
  }
}
