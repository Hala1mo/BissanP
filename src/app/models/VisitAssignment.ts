import {Customer} from "./Customer";
import {User} from "./User";
import {VisitType} from "./VisitType";

export class VisitAssignment {
  id: bigint;
  date: string;
  comment: string;
  user: User;
  visitType: VisitType;
  customers: Customer[];

  enabled: boolean;
  createdTime: string;
  lastModifiedTime: string;

  constructor(data: any) {
    this.id = data.id || '';
    this.date = data.date || '';
    this.comment = data.name || '';
    this.user = data.user || {};
    this.visitType = data.visitType || {};
    this.customers = data.customers || [];

    this.enabled = data.enabled || false;
    this.createdTime = data.createdTime || '';
    this.lastModifiedTime = data.lastModifiedTime || '';
  }
}
