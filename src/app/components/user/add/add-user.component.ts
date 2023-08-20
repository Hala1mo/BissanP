import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { NgModule } from '@angular/core';

import {Router} from "@angular/router";

@Component({
  selector: 'app-add',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit{
  lastName: any;
  firstName: any;
  username: any;

  constructor(private router: Router) {
  }
  ngOnInit(): void {
  }

  goBackToUsersPage() {
    this.router.navigate(['users'])
  }
}
