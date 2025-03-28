export class SmtActorSheet extends ActorSheet {
  override getData() {
    const items = this.actor.items;

    return { items };
  }
}
