import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cus-details',
  templateUrl: './cus-details.component.html',
  styleUrls: ['./cus-details.component.css']
})
export class CusDetailsComponent implements OnInit{
  ngOnInit() {


  }
  constructor( private matDialog: MatDialog ,private router: Router,
               @Inject(MAT_DIALOG_DATA) public data: bigint){
    this.router.navigate(['/customers', data]);

  }
}
