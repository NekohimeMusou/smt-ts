declare global {
  interface DocumentClassConfig {
    Item: typeof SmtItem;
  }
}

export type Skill = SmtItem<"skill">;
export type Weapon = SmtItem<"weapon">;

export class SmtItem<T extends ItemType> extends Item<T> {}
