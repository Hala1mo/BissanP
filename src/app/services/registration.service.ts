import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {link} from "../models/link";
import {Customer} from "../models/Customer";


interface CustomerDTO {
  name: string;
  locationId: number | null;
  latitude: number | null;
  longitude: number | null;
}

interface ContactDTO {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  visitTypes: {
    id: string;
  };
}

@Injectable({
  providedIn: 'root'
})


export class RegistrationService {


  private _customers_url = link.urlIP + '/customers';
  private _contacts_url = link.urlIP + '/contacts';
  private _locations_url = link.urlIP + "/locations";
  private _visit_assignments = link.urlIP + "/visit_assignments"

  constructor(private _http: HttpClient) {
  }


  registerCustomer(customerData: any) {
    const customerPayload: CustomerDTO = {
      name: customerData.name,
      locationId: customerData.locationId,
      latitude: customerData.latitude,
      longitude: customerData.longitude,
    }

    return this._http.post<any>(this._customers_url, customerPayload).pipe();
  }

  updateEnabledStatusCustomer(id: bigint): Observable<any> {
    const updateUrl = `${this._customers_url}/${id}/endis`; // Adjust the URL endpoint as needed
    const body = "";

    return this._http.put<any>(updateUrl, body);
  }

  updateEnabledStatusContact(id: bigint): Observable<any> {
    const updateUrl = `${this._contacts_url}/${id}/endis`; // Adjust the URL endpoint as needed
    const body = "";

    return this._http.put<any>(updateUrl, body);
  }

  fetchCustomers() {
    let url = `${this._customers_url}/all`;

    return this._http.get<Customer[]>(url);
  }

  fetchCustomersInLocation(locationId: bigint) {
    let url = `${this._locations_url}/${locationId}/customers`;

    return this._http.get<Customer[]>(url);
  }


  addNewContact(id: bigint, contactDetails: any) {
    const _urlDetails = `${this._customers_url}/${id}/contacts`;

    const newContact: ContactDTO = {
      firstName: contactDetails.firstName,
      lastName: contactDetails.lastName,
      phoneNumber: contactDetails.phoneNumber,
      email: contactDetails.email,
      visitTypes: contactDetails.visitTypes
    };

    return this._http.post<any>(_urlDetails, newContact).pipe();
  }

  addNewContactAndAssignCustomer(customerId: bigint, assignmentId: bigint, contactDetails: any) {
    let url = `${this._visit_assignments}/${assignmentId}/customers/${customerId}/contacts`

    const newContact: ContactDTO = {
      firstName: contactDetails.firstName,
      lastName: contactDetails.lastName,
      phoneNumber: contactDetails.phoneNumber,
      email: contactDetails.email,
      visitTypes: contactDetails.visitTypes
    };

    return this._http.post(url, newContact);
  }

  updateContactData(conId: bigint, updatedContactData: any): Observable<any> {
    const updateUrl = `${this._contacts_url}/${conId}`; // Adjust the URL endpoint as needed

    const editContactPayload: ContactDTO = {
      firstName: updatedContactData.firstName,
      lastName: updatedContactData.lastName,
      phoneNumber: updatedContactData.phoneNumber,
      email: updatedContactData.email,
      visitTypes: updatedContactData.visitTypes
    };

    return this._http.put<any>(updateUrl, editContactPayload);
  }

  updateCustomerData(id: bigint, updatedCustomerData: any): Observable<any> {
    const updateUrl = `${this._customers_url}/${id}`; // Adjust the URL endpoint as needed

    const customerPayload: CustomerDTO = {
      name: updatedCustomerData.name,
      locationId: updatedCustomerData.locationId,
      latitude: updatedCustomerData.latitude,
      longitude: updatedCustomerData.longitude,
    }

    return this._http.put<any>(updateUrl, customerPayload);
  }

  fetchCustomerDetails(id: bigint): Observable<any> {
    const _urlDetails = `${this._customers_url}/${id}`;
    return this._http.get<any>(_urlDetails);
  }

  searchCustomers(name?: string, enabled?: string, city?: string, location?: string) {
    let params = new HttpParams();

    if (name)
      params = params.set('name', name);
    if (city)
      params = params.set('city', city);
    if (location)
      params = params.set('location', location);
    if (enabled !== undefined)
      params = params.set('enabled', enabled);

    return this._http.get<Customer[]>(`${this._customers_url}/search`, {params}).pipe();
  }


}
