import {Contact} from "./Contact";
import {Address} from "./Address";

export class Customer {
  id: bigint;
  name: string;
  address: Address; // Address object
  contacts: Contact[]; // Array of Contact objects

  enabled: boolean;
  createdTime: string;
  lastModifiedTime: string;

  constructor(data: any) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.address = data.address || {};
    this.contacts = data.contacts || [];

    this.enabled = data.enabled || false;
    this.createdTime = data.createdTime || '';
    this.lastModifiedTime = data.lastModifiedTime || '';
  }
}
