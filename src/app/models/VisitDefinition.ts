import {VisitType} from "./VisitType";

export class VisitDefinition {
  createdTime: string;
  lastModifiedTime: string;
  id: bigint;
  name: string;
  description: string;
  type: VisitType;
  frequency: number;
  allowRecurring: boolean
  enabled: number;
  visitAssignments: VisitType[];

  constructor(data: any) {
    this.createdTime = data.createdTime || '';
    this.lastModifiedTime = data.lastModifiedTime || '';
    this.id = data.id || '';
    this.name = data.name || '';
    this.description = data.description || '';
    this.type = data.type || null;
    this.frequency = data.frequency || '';
    this.allowRecurring = data.allowRecurring || false;
    this.enabled = data.enabled || 0;
    this.visitAssignments = data.visitAssignments || [];
  }
}

