export class VisitType {
  id: bigint;
  name: string;

  enabled: boolean;
  createdTime: string;
  lastModifiedTime: string;

  constructor(data: any) {
    this.id = data.id || '';
    this.name = data.name || '';

    this.enabled = data.enabled || false;
    this.createdTime = data.createdTime || '';
    this.lastModifiedTime = data.lastModifiedTime || '';
  }
}

