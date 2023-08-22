import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {DetailsCusComponent} from "../details-cus/details-cus.component";

@Component({
  selector: 'app-cus',
  templateUrl: './cus.component.html',
  styleUrls: ['./cus.component.css']
})
export class CusComponent {
  constructor(private matDialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any[]) {
  }


  openCustomerDetailDialog(customerId: bigint) {
    this.matDialog.closeAll();
    this.matDialog.open(DetailsCusComponent, {
      width: '50%',
      data: customerId
    });
  }
}
