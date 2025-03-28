declare global {
  interface DocumentClassConfig {
    Item: typeof SmtItem;
  }
}

export type Skill = SmtItem<"skill">;
export type Weapon = SmtItem<"weapon">;

// @ts-expect-error Transient recursion error
export class SmtItem<T extends ItemType> extends Item<T> {}
