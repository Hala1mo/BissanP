export class Contact {
  createdTime: string;
  email: string;
  enabled: number;
  firstName: string;
  lastModifiedTime: string;
  lastName: string;
  phoneNumber: string;
  uuid: string;

  constructor(data: any) {
    this.createdTime = data.createdTime || '';
    this.email = data.email || '';
    this.enabled = data.enabled || 0;
    this.firstName = data.firstName || '';
    this.lastModifiedTime = data.lastModifiedTime || '';
    this.lastName = data.lastName || '';
    this.phoneNumber = data.phoneNumber || '';
    this.uuid = data.uuid || '';
  }
}
