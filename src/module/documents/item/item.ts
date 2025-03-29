declare global {
  interface DocumentClassConfig {
    Item: typeof SmtItem;
  }
}

export type Skill = SmtItem<"skill">;

export class SmtItem<T extends ItemType> extends Item<T> {}
