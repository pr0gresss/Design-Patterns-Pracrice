export class LegacyResource {
  constructor(private name: string) {}

  execute(): void {
    console.log(`Legacy resource ${this.name} executing`)
  }

  getName(): string {
    return this.name
  }
}
