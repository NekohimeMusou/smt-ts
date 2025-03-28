import { isCharacterClass } from "../../../smt-ts.js";

const fields = foundry.data.fields;

const stats = new fields.SchemaField({
  st: new fields.SchemaField({
    base: new fields.NumberField({ integer: true, min: 1, initial: 1 }),
    lv: new fields.NumberField({ integer: true, min: 0 }),
    mgt: new fields.NumberField({ integer: true, min: 0 }),
    value: new fields.NumberField({ integer: true, min: 1 }),
    derivedTN: new fields.StringField({ initial: "phys", readonly: true }),
  }),
  ma: new fields.SchemaField({
    base: new fields.NumberField({ integer: true, min: 1, initial: 1 }),
    lv: new fields.NumberField({ integer: true, min: 0 }),
    mgt: new fields.NumberField({ integer: true, min: 0 }),
    value: new fields.NumberField({ integer: true, min: 1 }),
    derivedTN: new fields.StringField({ initial: "mag", readonly: true }),
  }),
  vi: new fields.SchemaField({
    base: new fields.NumberField({ integer: true, min: 1, initial: 1 }),
    lv: new fields.NumberField({ integer: true, min: 0 }),
    mgt: new fields.NumberField({ integer: true, min: 0 }),
    value: new fields.NumberField({ integer: true, min: 1 }),
    derivedTN: new fields.StringField({ initial: "save", readonly: true }),
  }),
  ag: new fields.SchemaField({
    base: new fields.NumberField({ integer: true, min: 1, initial: 1 }),
    lv: new fields.NumberField({ integer: true, min: 0 }),
    mgt: new fields.NumberField({ integer: true, min: 0 }),
    value: new fields.NumberField({ integer: true, min: 1 }),
    derivedTN: new fields.StringField({ initial: "dodge", readonly: true }),
  }),
  lu: new fields.SchemaField({
    base: new fields.NumberField({ integer: true, min: 1, initial: 1 }),
    lv: new fields.NumberField({ integer: true, min: 0 }),
    mgt: new fields.NumberField({ integer: true, min: 0 }),
    value: new fields.NumberField({ integer: true, min: 1 }),
    derivedTN: new fields.StringField({
      initial: "negotiation",
      readonly: true,
    }),
  }),
});

const resources = {
  hp: new fields.SchemaField({
    max: new fields.NumberField({ integer: true }),
    value: new fields.NumberField({ integer: true, initial: 1 }),
    multiplier: new fields.NumberField({ integer: true, min: 1, initial: 1 }),
  }),
  mp: new fields.SchemaField({
    max: new fields.NumberField({ integer: true }),
    value: new fields.NumberField({ integer: true }),
    multiplier: new fields.NumberField({ integer: true, min: 1, initial: 1 }),
  }),
  fp: new fields.SchemaField({
    max: new fields.NumberField({ integer: true }),
    value: new fields.NumberField({ integer: true }),
  }),
};

const tn = new fields.SchemaField({
  st: new fields.NumberField({ integer: true }),
  ma: new fields.NumberField({ integer: true }),
  vi: new fields.NumberField({ integer: true }),
  ag: new fields.NumberField({ integer: true }),
  lu: new fields.NumberField({ integer: true }),
  phys: new fields.NumberField({ integer: true }),
  mag: new fields.NumberField({ integer: true }),
  save: new fields.NumberField({ integer: true }),
  dodge: new fields.NumberField({ integer: true }),
  negotiation: new fields.NumberField({ integer: true }),
  gun: new fields.NumberField({ integer: true }),
});

const power = new fields.SchemaField({
  phys: new fields.NumberField({ integer: true, min: 0 }),
  mag: new fields.NumberField({ integer: true, min: 0 }),
  gun: new fields.NumberField({ integer: true, min: 0 }),
});

const resist = new fields.SchemaField({
  phys: new fields.NumberField({ integer: true, min: 0 }),
  mag: new fields.NumberField({ integer: true, min: 0 }),
});

const bioData = {
  notes: new fields.HTMLField(),
};

const schema = {
  stats,
  ...resources,
  tn,
  power,
  resist,
  ...bioData,
  xp: new fields.NumberField({ integer: true, min: 0, initial: 0 }),
  macca: new fields.NumberField({ integer: true, min: 0 }),
  isNPC: new fields.BooleanField(),
  levelOverride: new fields.NumberField({ integer: true, min: 1 }),
};

export abstract class SmtBaseActorData<
  T extends Actor.Implementation,
> extends foundry.abstract.TypeDataModel<typeof schema, T> {
  get pcLevel() {
    const actor = this.parent;
    if (isCharacterClass(actor.type)) {
      const levelTable = CONFIG.SMT.levelTables[actor.type];

      const xp = this.xp ?? 0;

      return Math.max(
        levelTable.findLastIndex((tableXp) => tableXp < xp + 1),
        1,
      );
    }

    throw new Error("Invalid character class.");
  }

  static override defineSchema() {
    return schema;
  }
}
