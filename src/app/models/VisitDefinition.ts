import {VisitType} from "./VisitType";
import {City} from "./City";

export class VisitDefinition {
  createdTime: string;
  lastModifiedTime: string;
  id: bigint;
  name: string;
  description: string;
  type: VisitType;
  city:City;
  frequency: number;
  allowRecurring: boolean
  enabled: boolean;
  visitAssignments: VisitType[];

  constructor(data: any) {
    this.createdTime = data.createdTime || '';
    this.lastModifiedTime = data.lastModifiedTime || '';
    this.id = data.id || '';
    this.name = data.name || '';
    this.description = data.description || '';
    this.type = data.type || null;
    this.city = data.city || null;
    this.frequency = data.frequency || '';
    this.allowRecurring = data.allowRecurring || false;
    this.enabled = data.enabled || false;
    this.visitAssignments = data.visitAssignments || [];
  }
}

