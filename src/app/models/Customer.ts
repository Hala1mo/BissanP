import {Contact} from "./Contact";
import {Address} from "./Address";

export class Customer {
  createdTime: string;
  enabled: boolean;
  lastModifiedTime: string;
  name: string;
  id: bigint;
  contacts: Contact[]; // Array of Contact objects
  address: Address; // Address object

  constructor(data: any) {
    this.createdTime = data.createdTime || '';
    this.enabled = data.enabled || false;
    this.lastModifiedTime = data.lastModifiedTime || '';
    this.name = data.name || '';
    this.id = data.id || '';
    this.contacts = (data.contacts || []).map((contactData: any) => new Contact(contactData));
    this.address = new Address(data.address || {});
  }
}
