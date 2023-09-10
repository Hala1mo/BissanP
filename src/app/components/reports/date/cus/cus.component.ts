import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {DetailsCusComponent} from "../details-cus/details-cus.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cus',
  templateUrl: './cus.component.html',
  styleUrls: ['./cus.component.css']
})
export class CusComponent {
  constructor(private matDialog: MatDialog,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public data: any[]) {
  }


  openCustomerDetailDialog(customerId: bigint) {
    this.matDialog.closeAll();
    this.router.navigate(['customers/' , customerId]);
  }
}
