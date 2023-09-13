import {Component, Inject} from '@angular/core';
import {Customer} from "../../../models/Customer";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {VisitAssignment} from "../../../models/VisitAssignment";
import {ContactDialogueComponent} from "../details/contact-dialogue/contact-dialogue.component";
import {SharedService} from "../../../services/shared.service";

@Component({
  selector: 'app-assign-new-customer-dialog',
  templateUrl: './assign-new-customer-dialog.component.html',
  styleUrls: ['./assign-new-customer-dialog.component.css']
})
export class AssignNewCustomerDialogComponent {
  customer: Customer;
  assignments: VisitAssignment[];

  constructor(
    private matDialog: MatDialog,
    private sharedService: SharedService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.customer = data.customer;
    this.assignments = data.assignments;
  }

  onSubmitAssignment(assignment: VisitAssignment) {
    let types = assignment.visitType.id;

    this.matDialog.open(ContactDialogueComponent, {
      data: {
        'mode': 2,
        'typesData': this.sharedService.getVisitTypesAsList(),
        'assignmentId': assignment.id,
        'customerId': this.customer.id,
        'checkedTypes' : [types]
      }
    });
  }
}
