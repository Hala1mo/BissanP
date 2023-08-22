export class Address {
  addressLine1: string;
  addressLine2: string;
  city: string;
  createdTime: string;
  lastModifiedTime: string;
  latitude: number;
  longitude: number;
  id: string;
  zipcode: string;
  precise:boolean;

  constructor(data: any) {
    this.addressLine1 = data.addressLine1 || '';
    this.addressLine2 = data.addressLine2 || '';
    this.city = data.city || '';
    this.createdTime = data.createdTime || '';
    this.lastModifiedTime = data.lastModifiedTime || '';
    this.latitude = data.latitude || 0;
    this.longitude = data.longitude || 0;
    this.id = data.id || '';
    this.zipcode = data.zipcode || '';
    this.precise=data.precise || false;
  }
}
