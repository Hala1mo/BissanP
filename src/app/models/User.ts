export class User {
  username: string;
  firstName: string;
  lastName: string;
  accessLevel: number;
  enabled: boolean;


  constructor(data: any) {
    this.firstName = data.firstName || '';
    this.lastName = data.lastName || '';
    this.username = data.username || '';
    this.accessLevel = data.accessLevel || '';
    this.enabled = data.enabled || false;
  }
}
