import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DocumentService} from "../../../services/document.service";
import * as XLSX from "xlsx";
import {User} from "../../../models/User";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  isLoaded: boolean = false
  rows: any[] = [];
  dataSource:any[]=[];
  fromDate:any;
  searchInput='';
  toDate:any;
  questions: any;
  fileName = 'ExcelSheet.xlsx';
  assignmentId: bigint = BigInt(0);
  userData: User [] = [];
  originalUserData:User[]=[];
  selectedUserForm: FormGroup;
  userSelectControl = new FormControl();
  @ViewChild('userInput') userInput!: ElementRef<HTMLInputElement>;
  displayedColumns: string[] = ['customer', 'date', 'ans1', 'ans2', 'ans3']
  filteredUsers: User[] | undefined;
  constructor(
    formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private documentService: DocumentService,
  ) {
    this.selectedUserForm = formBuilder.group({
      username: ['', [Validators.required]]
    })
  }
  filterUsers() {
    const filterValue = this.userInput.nativeElement.value.toLowerCase();
    this.filteredUsers = this.userData.filter(option => option.username.toLowerCase().includes(filterValue)
      || option.firstName.toLowerCase().includes(filterValue)
      || option.lastName.toLowerCase().includes(filterValue));
  }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.assignmentId = id;
        this.fetchAssignmentDetails(id);
      }
      this.fetchUserData();
    });
  }

  fetchAssignmentDetails(id: bigint) {
    this.documentService.fetchQuestionAssignment(id).subscribe({
        next: response => {
          this.isLoaded = true;
          this.rows = response.answers;

          this.questions = response.questions;
        }
      }
    );
  }
  exportTable() {
    let element = document.getElementById('report-table');

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  displayUser(user: User): string {
    return user ? `${user.username} (${user.firstName} ${user.lastName})` : '';
  }

  private fetchUserData() {
    this.userService.fetchEmployees().subscribe({
        next: response => {
          this.userData = response;
          this.originalUserData = response;
        },
        error: error => {
          console.error('Error fetching user data:', error);
        }
      }
    );
  }

  searchQuestion() {

    let username='';
    let fromDateString='';
    let toDateString='';

    if(this.userSelectControl.value){
      username = this.userSelectControl.value.username;}

    if(this.fromDate && this.toDate ) {
      fromDateString = formatDate(this.fromDate, 'yyyy-MM-dd', 'en');
      toDateString = formatDate(this.toDate, 'yyyy-MM-dd', 'en');
    }

    if (!username )
      this.resetFilters();
    this.documentService.searchQuestions(username,fromDateString,toDateString).subscribe({
      next: value => {
        this.rows = value;
      }
    })

  }

  resetFilters() {
    this.searchInput = '';
    this.userSelectControl.setValue('');
    this.userData = this.originalUserData;
  }
}
