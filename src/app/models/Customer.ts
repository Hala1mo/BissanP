import {Contact} from "./Contact";
import {Location} from "./Location";

export class Customer {
  id: bigint;
  name: string;
  location: Location; // Address object
  contacts: Contact[]; // Array of Contact objects

  enabled: boolean;
  createdTime: string;
  lastModifiedTime: string;

  constructor(data: any) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.location = data.location || {};
    this.contacts = data.contacts || [];

    this.enabled = data.enabled || false;
    this.createdTime = data.createdTime || '';
    this.lastModifiedTime = data.lastModifiedTime || '';
  }
}
