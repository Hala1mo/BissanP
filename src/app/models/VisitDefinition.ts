import {VisitType} from "./VisitType";
import {VisitAssignment} from "./VisitAssignment";

export class VisitDefinition {
  id: bigint;
  name: string;
  description: string;
  frequency: number;
  allowRecurring: boolean
  visitType: VisitType;
  cityId: bigint;
  cityName: string;
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
    this.visitType = data.visitType || {};
    this.cityId = data.cityId || 0;
    this.cityName = data.cityName || ''
    this.visitAssignments = data.visitAssignments || [];

    this.enabled = data.enabled || false;
    this.createdTime = data.createdTime || '';
    this.lastModifiedTime = data.lastModifiedTime || '';
  }
}

