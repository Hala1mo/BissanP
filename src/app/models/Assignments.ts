export class Assignments{

  comment: string ;
  uuid: bigint;
  date:string;
  enabled: number;
  constructor(data: any) {
    this.uuid = data.uuid || '';
    this.comment = data.name || '';
    this.date=data.date;
    this.enabled=data.enabled;
  }
}
