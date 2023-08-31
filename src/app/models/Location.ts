export class Location {
  id: bigint;
  address: string;
  cityId: bigint;
  cityName: string;

  constructor(data: any) {
    this.id = data.id;
    this.address = data.address;
    this.cityId = data.cityId;
    this.cityName = data.cityName;
  }
}
