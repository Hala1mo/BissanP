import {Component, Inject} from '@angular/core';
import {Customer} from "../../../models/Customer";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {VisitAssignment} from "../../../models/VisitAssignment";

@Component({
  selector: 'app-assign-new-customer-dialog',
  templateUrl: './assign-new-customer-dialog.component.html',
  styleUrls: ['./assign-new-customer-dialog.component.css']
})
export class AssignNewCustomerDialogComponent {
  customer: Customer;
  assignments: VisitAssignment[];

  constructor(
    public matDialogRef: MatDialogRef<AssignNewCustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.customer = data.customer;
    this.assignments = data.assignments;
  }

  onSubmitAssignment(assignmentId: bigint) {
    console.log("assigning " + this.customer.name + " to assignment with id" + assignmentId);
  }
}
