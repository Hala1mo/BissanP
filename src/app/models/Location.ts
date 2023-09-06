export class Location {
  id: bigint;
  address: string;
  cityId: bigint;
  cityName: string;
  longitude: number;
  latitude: number

  constructor(data: any) {
    this.id = data.id;
    this.address = data.address;
    this.cityId = data.cityId;
    this.cityName = data.cityName;
    this.longitude = data.longitude;
    this.latitude = data.latitude;
  }
}
