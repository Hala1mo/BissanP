import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {link} from "../models/link";



interface customerTDO {
  name: string;
  addressLine1: string;
  addressLine2: string;
  latitude: number | null;
  longitude: number | null;
  precise: boolean;
  zipcode: string;
  cityId: number | null;
}


interface contactTDO {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  types: {
    id: string;
  };
}

@Injectable({
  providedIn: 'root'
})


export class RegistrationService {


  private _customers_url = link.urlIP+'/customers';
  private _contacts_url = link.urlIP+'/contacts';
  private _city_url = link.urlIP+'/cities';


  constructor(private _http: HttpClient) {
  }


  registerCustomer(customerData: any) {
    const customerPayload: customerTDO = {
      name: customerData.name,
      addressLine1: customerData.addressLine1,
      addressLine2: customerData.addressLine2,
      latitude: customerData.latitude,
      longitude: customerData.longitude,
      precise: customerData.precise,
      zipcode: customerData.zipcode,
      cityId: customerData.cityId,
    }

    return this._http.post<any>(this._customers_url, customerPayload)
      .pipe(
      );
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
    // Send a GET request to the server to fetch user data
    return this._http.get<any>(this._customers_url);
  }


  AddnewContact(id: bigint, contactDetails: any) {
    const _urlDetails = `${this._customers_url}/${id}/contacts`;


    const newContact: contactTDO = {
      firstName: contactDetails.firstName,
      lastName: contactDetails.lastName,
      phoneNumber: contactDetails.phoneNumber,
      email: contactDetails.email,
      types:
        contactDetails.types

    };

    console.log(newContact);

    return this._http.post<any>(_urlDetails, newContact)
      .pipe(
      );
  }

  updateContactData(conId: bigint, updatedContactData: any): Observable<any> {
    const updateUrl = `${this._contacts_url}/${conId}`; // Adjust the URL endpoint as needed


    const editContactPayload: contactTDO = {
      firstName: updatedContactData.firstName,
      lastName: updatedContactData.lastName,
      phoneNumber: updatedContactData.phoneNumber,
      email: updatedContactData.email,
      types:
      updatedContactData.types

    };

    return this._http.put<any>(updateUrl, editContactPayload);
  }

  updateCustomerData(id: bigint, updatedCustomerData: any): Observable<any> {
    const updateUrl = `${this._customers_url}/${id}`; // Adjust the URL endpoint as needed


    const customerPayload: customerTDO = {
      name: updatedCustomerData.name,
      addressLine1: updatedCustomerData.addressLine1,
      addressLine2: updatedCustomerData.addressLine2,
      latitude: updatedCustomerData.latitude,
      longitude: updatedCustomerData.longitude,
      precise: updatedCustomerData.precise,
      zipcode: updatedCustomerData.zipcode,
      cityId: updatedCustomerData.cityId,
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

  fetchCityData(): Observable<any> {
    return this._http.get<any>(this._city_url);
  }
}
