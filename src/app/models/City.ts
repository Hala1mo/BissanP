

export class City {
  name: string;
  id: bigint;

  constructor(data: any) {
    this.id = data.id || '';
    this.name = data.name || '';
  }
}
