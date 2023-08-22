import {Customer} from "./Customer";

export class VisitAssignment {

  comment: string ;
  id: bigint;
  date:string;
  enabled: number;
  customer: Customer[];

  constructor(data: any) {
    this.id = data.id || '';
    this.comment = data.name || '';
    this.date=data.date;
    this.enabled=data.enabled;
    this.customer=data.customer
  }
}
