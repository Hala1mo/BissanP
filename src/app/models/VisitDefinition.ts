import {VisitType} from "./VisitType";

export class VisitDefinition {
    id: bigint;
    name: string;
    enabled: number;
    frequency: number;
    description: string;
    type: VisitType;
    allowRecurring: boolean

    constructor(data: any) {
        this.id = data.id || '';
        this.enabled = data.enabled || 0;
        this.name = data.name || '';
        this.description = data.description || '';
        this.frequency = data.frequency || '';
        this.type = data.type || null;
        this.allowRecurring = data.allowRecurring || false;
    }
}

