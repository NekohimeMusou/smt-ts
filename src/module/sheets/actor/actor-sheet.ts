export class SmtActorSheet extends ActorSheet {
  override async getData() {
    const context = super.getData();
    const system = this.actor.system;
    const rollData = this.actor.getRollData();

    const items = this.actor.items;

    const type = this.actor.type;

    await foundry.utils.mergeObject(context, {
      system,
      rollData,
      items,
    });
    return context;
  }
}
