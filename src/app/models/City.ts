import {Location} from "./Location";

export class City {
  name: string;
  id: bigint;
  locations: Location[];

  constructor(data: any) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.locations = data.locations || [];
  }
}
