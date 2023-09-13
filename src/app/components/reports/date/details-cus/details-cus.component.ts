import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-details-cus',
  templateUrl: './details-cus.component.html',
  styleUrls: ['./details-cus.component.css']
})
export class DetailsCusComponent implements OnInit {
  ngOnInit() {


  }

  constructor(private router: Router,
              @Inject(MAT_DIALOG_DATA) public data: bigint) {
    void this.router.navigate(['/customers', data]);
  }
}
