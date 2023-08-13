import {Component, OnInit} from '@angular/core';
import {Customer} from "../models/Customer";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {RegistrationService} from "../registration.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-definition',
  templateUrl: './definition.component.html',
  styleUrls: ['./definition.component.css']
})
export class DefinitionComponent implements OnInit{
  Data: any[] = [];



  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,// Use ActivatedRoute here
    private _registrationService: RegistrationService,
    private fb: FormBuilder
  ) {}



  ngOnInit() {
    this.fetchDefinition();
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


  updateEnabled(defId:any) {

    this._registrationService.updateEnabledStatusDefinition(defId).subscribe(
      (res: any) => {
        console.log('Enabled status updated successfully:', res);

        this. fetchDefinition();

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

}
