import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";
import {RegistrationService} from "../../../services/registration.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-details-def',
  templateUrl: './details-def.component.html',
  styleUrls: ['./details-def.component.css']
})
export class DetailsDefComponent  implements OnInit {

  constructor(
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute, // Use ActivatedRoute here
    private _registrationService: RegistrationService,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      console.log("id:",id);
      // if (id) {
      //   this.fetchCustomerDetails(id);
      // }
      // this.fetchvisitTypes();
    });

  }
}
