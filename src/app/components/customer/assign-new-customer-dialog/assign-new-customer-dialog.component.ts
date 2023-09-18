import {Component, Inject} from '@angular/core';
import {Customer} from "../../../models/Customer";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {VisitAssignment} from "../../../models/VisitAssignment";
import {ContactDialogueComponent} from "../details/contact-dialogue/contact-dialogue.component";
import {SharedService} from "../../../services/shared.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AssignmentService} from "../../../services/assignment.service";

@Component({
  selector: 'app-assign-new-customer-dialog',
  templateUrl: './assign-new-customer-dialog.component.html',
  styleUrls: ['./assign-new-customer-dialog.component.css']
})
export class AssignNewCustomerDialogComponent {
  customer: Customer;
  assignments: VisitAssignment[];
  assignedTypes: bigint[] = [];

  constructor(
    private matDialog: MatDialog,
    private matSnackbar: MatSnackBar,
    private sharedService: SharedService,
    private assignmentService: AssignmentService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.customer = data.customer;
    this.assignments = data.assignments;
  }

  onSubmitAssignment(assignment: VisitAssignment) {
    if (this.assignedTypes.includes(assignment.visitType.id)) {
      console.log("HAS CONTACT TYPE => ", assignment.visitType, "IN =>", this.assignedTypes);
      this.assignmentService.assignCustomer(assignment.id, this.customer.id);
      this.matSnackbar.open(`Successfully assigned to ${assignment.comment}`, '', {
        duration: 3000,
      })
      this.assignments = this.assignments.filter(v => v.id != assignment.id);
    } else {
      let types = assignment.visitType.id;

      this.matDialog.open(ContactDialogueComponent, {
        data: {
          'mode': 2,
          'typesData': this.sharedService.getVisitTypesAsList(),
          'assignmentId': assignment.id,
          'customerId': this.customer.id,
          'checkedTypes': [types]
        }
      }).afterClosed().subscribe({
        next: (value: VisitAssignment) => {
          this.matSnackbar.open(`Successfully assigned to ${value.comment}`, '', {
            duration: 3000,
          })
          this.assignedTypes.push(types);
          this.assignments = this.assignments.filter(v => v.id != value.id);
        }
      });
    }
  }
}
