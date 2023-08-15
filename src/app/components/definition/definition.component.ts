import {Component, OnInit} from '@angular/core';
import {Customer} from "../../models/Customer";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {RegistrationService} from "../../services/registration.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-definition',
  templateUrl: './definition.component.html',
  styleUrls: ['./definition.component.css']
})
export class DefinitionComponent implements OnInit {
  Data: any[] = [];
  originalData: any[] = [];
  TypesData: any[] = [];
  types: any[] = [];


  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,// Use ActivatedRoute here
    private _registrationService: RegistrationService,
    private fb: FormBuilder
  ) {
  }


  ngOnInit() {
    this.fetchDefinition();
    this.fetchVisitTypes();
  }


  fetchDefinition() {
    this._registrationService.fetchDefinition().subscribe(
      (data) => {
        console.log('Fetched details data:', data);
        this.Data = (data); // Create a new Customer object
      },
      (error) => {
        console.error('Error fetching customer data:', error);
      }
    );
  }


  updateEnabled(defId: any) {

    this._registrationService.updateEnabledStatusDefinition(defId).subscribe(
      (res: any) => {
        console.log('Enabled status updated successfully:', res);

        this.fetchDefinition();

      },
      (error) => {
        console.error('Error updating enabled status:', error);

      }
    );
  }

  openDefinitionDetails(id: bigint) {
    this.router.navigate(['/details-def', id]);

  }

  openAddDefinition() {
    this.router.navigate(['/add-def']);

  }


  showEnables() {
    const enabledDef = this.originalData.filter((item: any) => item.enabled === 1);
    this.Data = enabledDef;
  }


  showDisables() {
    const disabledDef = this.originalData.filter((item: any) => item.enabled === 0);
    this.Data = disabledDef;
  }


  applySearchFilter(event: any) {
    const searchValue = event.target.value;
    const lowerSearchValue = searchValue.toLowerCase();

    const filteredData = this.originalData.filter((item: any) =>
      item.name.toLowerCase().includes(lowerSearchValue)
    );
    this.Data = filteredData;
  }

  recurringData() {
    const Def = this.originalData.filter((item: any) => item.allowRecurring === "True");
    this.Data = Def;


  }

  NrecurringData() {
    const Def = this.originalData.filter((item: any) => item.allowRecurring === "False");
    this.Data = Def;
  }

  fetchVisitTypes() {

    this._registrationService.fetchTypesData().subscribe(
      (data) => {
        console.log('Fetched types data:', data);
        this.TypesData = data;
        this.types = data;
      },
      (error) => {
        console.error('Error fetching types data:', error);
      }
    );
  }

  onTypeSelect(selectedValue : string) {
    const Def = this.originalData.filter((item: any) => item.type.name === selectedValue);
    this.Data = Def;
  }
}
