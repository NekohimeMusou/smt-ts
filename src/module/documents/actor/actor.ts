declare global {
  interface DocumentClassConfig {
    Actor: typeof SmtActor;
  }
}

export type FiendActor = SmtActor<"fiend">;
export type DemonActor = SmtActor<"demon">;
export type HumanActor = SmtActor<"human">;

export class SmtActor<T> extends Actor<
  T extends CharacterClass ? CharacterClass : never
> {
  declare type: CharacterClass;
}
