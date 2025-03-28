const fields = foundry.data.fields;

const schema = {
  xp: new fields.NumberField({ integer: true, min: 0, initial: 0 }),
  macca: new fields.NumberField({ integer: true, min: 0 }),
  isNPC: new fields.BooleanField(),
  levelOverride: new fields.NumberField({ integer: true, min: 1 }),
};

export abstract class SmtBaseActorData<
  T extends Actor.Implementation,
> extends foundry.abstract.TypeDataModel<typeof schema, T> {
  static override defineSchema() {
    return schema;
  }
}
