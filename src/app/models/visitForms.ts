import {Customer} from "./Customer";

export class visitForms {
  id: bigint;
  date: string;
  comment: string;
  customers: Customer[];
  status:string;
  enabled: boolean;
  createdTime: string;
  lastModifiedTime: string;

  constructor(data: any) {
    this.id = data.id || '';
    this.date = data.date || '';
    this.comment = data.name || '';
    this.customers = data.customers || [];
    this.status=data.status;
    this.enabled = data.enabled || false;
    this.createdTime = data.createdTime || '';
    this.lastModifiedTime = data.lastModifiedTime || '';
  }
}
