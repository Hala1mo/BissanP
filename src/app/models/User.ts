export class User {
  firstName: string;
  lastName: string;
  username:string;


  constructor(data: any) {
    this.firstName = data.firstName || '';
    this.lastName=data.lastName || '';
    this.username=data.username || '';

  }
}
