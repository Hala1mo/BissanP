import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router'; // Import ActivatedRoute
import {RegistrationService} from '../../../services/registration.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Customer} from '../../../models/Customer';
import {MatCheckboxChange} from "@angular/material/checkbox";
import {DefinitionService} from "../../../services/definition.service";
import {nameValidator, telValidator} from "../../../shared/Name.validators";

@Component({
    selector: 'app-details',
    templateUrl: './customer-details.component.html',
    styleUrls: ['./customer-details.component.css'],
})
export class CustomerDetailsComponent implements OnInit {
    customerDetails: Customer | null = null;
    registrationForm!: FormGroup;
    selectedContact: any;// To store the selected user for editing
    isEditMode = false; // Toggle between add and edit modes
    TypesData: any[] = [];
    types: any[] = [];
    editForm!: FormGroup;

    private selectedids: string[] = [];

    constructor(
        private _snackBar: MatSnackBar,
        private route: ActivatedRoute, // Use ActivatedRoute here
        private VisitServices: DefinitionService,
        private _registrationService: RegistrationService,
        private fb: FormBuilder
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe((params) => {
            const id = params['id'];
            if (id) {
                this.fetchCustomerDetails(id);
            }
            this.fetchvisitTypes();
        });
        this.registrationForm = this.fb.group({
            firstName: ['', [Validators.required, nameValidator]],
            lastName: ['', [Validators.required, nameValidator]],
            phoneNumber: ['', [Validators.required, telValidator]],
            email: ['', [Validators.required, Validators.email]],
            Types: this.fb.group({
                id: ['']
            }),
        });
    }


    buildTypesForm() {
        const typesForm = this.fb.group({});

        console.log("this.TypesData", this.selectedContact);
        this.TypesData.forEach(type => {
            typesForm.addControl(type.id, new FormControl(false));
        });

        console.log("typesForm", typesForm);
        return typesForm;
    }


    fetchCustomerDetails(id: bigint) {
        this._registrationService.fetchCustomerDetails(id).subscribe(
            (data) => {
                console.log('Fetched details data:', data);
                this.customerDetails = new Customer(data); // Create a new Customer object
                console.log("this.customerDetails", this.customerDetails);
            },
            (error) => {
                console.error('Error fetching customer data:', error);
            }
        );
    }

    onSubmit(id: any) {
        const formData = this.registrationForm.value;
        const selectedTypes = this.selectedids.map((id: any) => ({id}));
        formData.types = selectedTypes;
        formData.Types = selectedTypes;

        delete formData.name;
        delete formData.undefined;
        delete formData.id;
        delete formData.createdTime;
        delete formData.lastModifiedTime;

        console.log(formData);

        this._registrationService.AddnewContact(id, formData).subscribe(
            (res) => {
                console.log('Registration successful:', res);
                this.registrationForm.reset();
                this.fetchCustomerDetails(id);

            },
            (error) => {
                console.error('Registration failed:', error);
                if (error.error && error.error.errors && error.error.errors.length > 0) {
                    const errorMessage = error.error.errors[0];
                    console.log('Error message:', errorMessage);
                    this._snackBar.open(errorMessage, '', {
                        duration: 3000
                    });
                }
            }
        );
    }


    populateEditForm(contact: any) {
        console.log("jmdcksdcksdc", contact.checkedVisits);
        this.editForm.patchValue({
            firstName: contact.firstName,
            lastName: contact.lastName,
            phoneNumber: contact.phoneNumber,
            email: contact.email,
            Types: this.buildTypesFormArray()
        });
        console.log(">>>>", contact);
        console.log("this.TypesData", this.TypesData);
        this.TypesData.forEach(type => {
            debugger
            const typeControl = this.editForm.get(['Types', type.id]) as FormControl;
            const isSelected = contact.checkedVisits.some((contactType: { id: any; }) => contactType.id === type.id);
            typeControl.setValue(isSelected);
        });
    }

    buildTypesFormArray() {

        const group: any = {}; // Use a more specific type if available

        this.TypesData.forEach(type => {
            group[type.id] = [false]; // Initialize the checkbox value to false
        });

        return this.fb.group(group);
    }


    onEditContact(contact: any) {
        console.log("contact", contact);
        this.selectedContact = contact;
        this.isEditMode = true;

        this.editForm = this.fb.group({
            firstName: ['', [Validators.required, nameValidator]],
            lastName: ['', [Validators.required, nameValidator]],
            phoneNumber: ['', [Validators.required, telValidator]],
            email: ['', [Validators.required, Validators.email]],
            id: [''],
            Types: this.buildTypesForm(),
        });

        this.populateEditForm(contact);

    }

    onSubmitEdit(cusId: any) {
        if (this.editForm.valid) {

            const editedUserData = this.editForm.value;
            editedUserData.Types = this.TypesData.filter(type => editedUserData.Types[type.id]);
            this._registrationService.updateContactData(this.selectedContact.id, editedUserData).subscribe(
                (response) => {
                    console.log('User data updated successfully:', response);


                    // Reset the form and exit edit mode
                    this.editForm.reset();
                    this.isEditMode = false;
                    this.fetchCustomerDetails(cusId);

                },
                (error) => {
                    console.error('Error updating user data:', error);
                    if (error.error && error.error.errors && error.error.errors.length > 0) {
                        const errorMessage = error.error.errors[0];
                        console.log('Error message:', errorMessage);
                        // this.toastService.show('Error', errorMessage);
                        this._snackBar.open(errorMessage, '', {
                            duration: 3000
                        });

                    }
                }
            );
        }
    }

    cancelEdit() {
        this.isEditMode = false;
        this.selectedContact = null;
        this.editForm.reset();
    }

    updateEnabled(cusId: any, contId: any) {

        this._registrationService.updateEnabledStatusContact(contId).subscribe(
            (res: any) => {
                console.log('Enabled status updated successfully:', res);

                this.fetchCustomerDetails(cusId);

            },
            (error) => {
                console.error('Error updating enabled status:', error);

            }
        );
    }

    fetchvisitTypes() {
        this.VisitServices.fetchTypesData().subscribe(
            (data) => {
                console.log('Fetched types data:', data);
                this.TypesData = data;
                this.types = data;
                this.updateFormControls();
                this.populateCheckboxes();
            },
            (error) => {
                console.error('Error fetching types data:', error);
            }
        );
    }

    updateFormControls() {
        if (!this.registrationForm) return;

        this.types.forEach((type) => {
            const formControl = this.registrationForm.get(type.id);
            if (formControl) {
                formControl.setValue(false);
            }
        });
    }

    onCheckboxChange(event: MatCheckboxChange, id: string) {
        if (event.checked) {
            if (!this.selectedids.includes(id)) {
                this.selectedids.push(id);
            }
        } else {
            const index = this.selectedids.indexOf(id);
            if (index >= 0) {
                this.selectedids.splice(index, 1);
            }
        }
    }

    populateCheckboxes() {
        console.log('Types:', this.types); // Check if the types array contains the correct data
        console.log('TypesData:', this.TypesData); // Check the fetched types data

        for (const type of this.types) {
            console.log('Creating form control for id:', type.id);
            const formControl = this.fb.control(false);
            this.registrationForm.addControl(type.id, formControl);
        }
    }

}
