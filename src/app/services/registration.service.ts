import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {link} from "../models/link";


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
  private _city_url = link.urlIP + '/cities';


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

  fetchCustomerData(): Observable<any> {
    let url = `${this._customers_url}/all`;

    return this._http.get<any>(url);
  }


  addNewContact(id: bigint, contactDetails: any) {
    const _urlDetails = `${this._customers_url}/${id}/contacts`;


    const newContact: ContactDTO = {
      firstName: contactDetails.firstName,
      lastName: contactDetails.lastName,
      phoneNumber: contactDetails.phoneNumber,
      email: contactDetails.email,
      visitTypes:
      contactDetails.types
    };

    return this._http.post<any>(_urlDetails, newContact).pipe();
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

  searchCustomers(query: string): Observable<any> {
    const _urlDetails = `${this._customers_url}/search?query=${query}`;
    return this._http.get<any>(_urlDetails);
  }

}
