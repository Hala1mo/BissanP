import {VisitType} from "./VisitType";
import {VisitAssignment} from "./VisitAssignment";
import {Location} from "./Location";

export class VisitDefinition {
  id: bigint;
  name: string;
  description: string;
  frequency: number;
  allowRecurring: boolean
  location: Location;
  visitType: VisitType;
  visitAssignments: VisitAssignment[];

  enabled: boolean;
  createdTime: string;
  lastModifiedTime: string;

  constructor(data: any) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.description = data.description || '';
    this.frequency = data.frequency || '';
    this.allowRecurring = data.allowRecurring || false;
    this.location = data.location || {};
    this.visitType = data.visitType || {};
    this.visitAssignments = data.visitAssignments || [];

    this.enabled = data.enabled || false;
    this.createdTime = data.createdTime || '';
    this.lastModifiedTime = data.lastModifiedTime || '';
  }
}

