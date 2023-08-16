export class Contact {

  email: string;
  enabled: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  uuid: bigint;
  checkedVisits: string[] = [];

  constructor(data: any) {
    this.firstName = data.firstName || '';
    this.lastName = data.lastName || '';
    this.email = data.email || '';
    this.enabled = data.enabled || 0;

    this.phoneNumber = data.phoneNumber || '';
    this.uuid = data.uuid || '';
    this.checkedVisits = data.visitTypes;
  }
}
