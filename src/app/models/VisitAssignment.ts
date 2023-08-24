import {Customer} from "./Customer";

export class VisitAssignment {

  comment: string ;
  id: bigint;
  date:string;
  enabled: boolean;
  customer: Customer[];

  constructor(data: any) {
    this.id = data.id || '';
    this.comment = data.name || '';
    this.date=data.date;
    this.enabled=data.enabled || false;
    this.customer=data.customer
  }
}
