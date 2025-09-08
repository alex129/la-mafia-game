export default class Uuid {
  private readonly value: string;

  constructor(value?: string) {
    this.value = value || crypto.randomUUID();
  }

  getValue(): string {
    return this.value;
  }
}
