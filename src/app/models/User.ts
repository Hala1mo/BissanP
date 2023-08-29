export class User {
  username: string;
  firstName: string;
  lastName: string;
  accessLevel: number;

  enabled: boolean;
  createdTime: string;
  lastModifiedTime: string;


  constructor(data: any) {
    this.username = data.username || '';
    this.firstName = data.firstName || '';
    this.lastName = data.lastName || '';
    this.accessLevel = data.accessLevel || '';

    this.enabled = data.enabled || false;
    this.createdTime = data.createdTime || '';
    this.lastModifiedTime = data.lastModifiedTime || '';
  }
}
