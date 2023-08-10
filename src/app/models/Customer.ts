import {Contact} from "./Contact";
import {Address} from "./Address";

export class Customer {
  createdTime: string;
  enabled: number;
  lastModifiedTime: string;
  name: string;
  uuid: bigint;
  contacts: Contact[]; // Array of Contact objects
  address: Address; // Address object

  constructor(data: any) {
    this.createdTime = data.createdTime || '';
    this.enabled = data.enabled || 0;
    this.lastModifiedTime = data.lastModifiedTime || '';
    this.name = data.name || '';
    this.uuid = data.uuid || '';
    this.contacts = (data.contacts || []).map((contactData: any) => new Contact(contactData));
    this.address = new Address(data.address || {});
  }
}
