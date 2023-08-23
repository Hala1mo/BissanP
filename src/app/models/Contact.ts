import {VisitType} from "./VisitType";

export class Contact {

  email: string;
  enabled: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  id: bigint;
  visitTypes: VisitType[] = [];

  constructor(data: any) {
    this.firstName = data.firstName || '';
    this.lastName = data.lastName || '';
    this.email = data.email || '';
    this.enabled = data.enabled || 0;

    this.phoneNumber = data.phoneNumber || '';
    this.id = data.id || '';
    this.visitTypes = data.visitTypes;
  }
}
