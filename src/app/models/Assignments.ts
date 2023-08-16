import {Contact} from "./Contact";
import {Customer} from "./Customer";

export class Assignments{

  comment: string ;
  uuid: bigint;
  date:string;
  enabled: number;
  customer: Customer[];

  constructor(data: any) {
    this.uuid = data.uuid || '';
    this.comment = data.name || '';
    this.date=data.date;
    this.enabled=data.enabled;
    this.customer=data.customer
  }
}
