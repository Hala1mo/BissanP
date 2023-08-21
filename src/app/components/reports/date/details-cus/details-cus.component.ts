import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-details-cus',
  templateUrl: './details-cus.component.html',
  styleUrls: ['./details-cus.component.css']
})
export class DetailsCusComponent implements OnInit{
  ngOnInit() {


  }
  constructor( private matDialog: MatDialog ,private router: Router,
  @Inject(MAT_DIALOG_DATA) public data: bigint){
    this.router.navigate(['/customers', data]);

  }
}
