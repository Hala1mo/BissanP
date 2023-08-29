import {VisitType} from "./VisitType";

export class Contact {
  id: bigint;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  visitTypes: VisitType[] = [];

  enabled: boolean;
  createdTime: string;
  lastModifiedTime: string;

  constructor(data: any) {
    this.id = data.id || '';
    this.firstName = data.firstName || '';
    this.lastName = data.lastName || '';
    this.email = data.email || '';
    this.phoneNumber = data.phoneNumber || '';
    this.visitTypes = data.visitTypes || [];

    this.enabled = data.enabled || false;
    this.createdTime = data.createdTime || '';
    this.lastModifiedTime = data.lastModifiedTime || '';
  }
}
