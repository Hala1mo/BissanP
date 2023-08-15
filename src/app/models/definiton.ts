import {Type} from "./type";

export class Definiton {
  uuid: bigint;
  name: string;
  enabled: number;
  frequency: number;
  description: string;
  type:Type;
  allowRecurring:boolean

  constructor(data: any) {
    this.uuid = data.uuid || '';
    this.enabled = data.enabled || 0;
    this.name = data.name || '';
    this.description = data.description || '';
    this.frequency = data.frequency || '';
this.type=data.type;
this.allowRecurring=data.allowRecurring;
  }
}

