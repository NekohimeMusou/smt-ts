declare global {
  interface DocumentClassConfig {
    Actor: typeof SmtActor;
  }
}

export type SmtCharacter = FiendActor | DemonActor | HumanActor;

export type FiendActor = SmtActor<"fiend">;
export type DemonActor = SmtActor<"demon">;
export type HumanActor = SmtActor<"human">;

export class SmtActor<T extends CharacterClass> extends Actor<T> {}
