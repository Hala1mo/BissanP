
export class VisitType {
name: string ;
uuid: bigint;
constructor(data: any) {
  this.uuid = data.uuid || '';
  this.name = data.name || '';
}
}
