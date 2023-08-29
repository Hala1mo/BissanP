import {City} from "./City";

export class Address {
  addressLine1: string;
  addressLine2: string;
  zipcode: string;
  longitude: number;
  latitude: number;
  cityId : bigint;
  cityName: string;

  enabled: boolean;
  createdTime: string;
  lastModifiedTime: string;

  constructor(data: any) {
    this.addressLine1 = data.addressLine1 || '';
    this.addressLine2 = data.addressLine2 || '';
    this.zipcode = data.zipcode || '';
    this.longitude = data.longitude || 0;
    this.latitude = data.latitude || 0;
    this.cityId = data.cityId || 0;
    this.cityName = data.cityName || '';

    this.enabled = data.enabled || false;
    this.createdTime = data.createdTime || '';
    this.lastModifiedTime = data.lastModifiedTime || '';
  }
}
