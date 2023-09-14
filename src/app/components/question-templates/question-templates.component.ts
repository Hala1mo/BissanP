import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";

import {DocumentService} from "../../services/document.service";

import {VisitAssignment} from "../../models/VisitAssignment";
import {User} from "../../models/User";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {formatDate} from "@angular/common";
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-question-templates',
  templateUrl: './question-templates.component.html',
  styleUrls: ['./question-templates.component.css']
})
export class QuestionTemplatesComponent implements OnInit {
  visitAssignments: VisitAssignment[] = [];
  private originalVisitAssignments: VisitAssignment[] = [];

  displayedColumns: string[] = ['date', 'comment', 'user', 'visitType', 'status', 'actions'];

  userData: User [] = [];
  selectedUserForm: FormGroup;
  dataSource: any[] = [];
  fromDate: any;
  searchInput: string = '';
  toDate: any;
  filteredUsers: User[] | undefined;
  userSelectControl = new FormControl();
  @ViewChild('userInput') userInput!: ElementRef<HTMLInputElement>;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    formBuilder: FormBuilder,
    private userService: UserService,
  ) {
    this.selectedUserForm = formBuilder.group({
      username: ['', [Validators.required]]
    })

  }

  ngOnInit() {
    this.fetchAssignments();
    this.fetchUserData();
  }

  fetchAssignments() {
    this.documentService.fetchAllQuestionAssignments().subscribe({
        next: response => {
          this.visitAssignments = response;
          this.originalVisitAssignments = response;
        }
      }
    );
  }

  private fetchUserData() {
    this.userService.fetchEmployees().subscribe({
        next: response => {
          this.userData = response;
          this.filteredUsers = this.userData;
        },
        error: error => {
          console.error('Error fetching user data:', error);
        }
      }
    );
  }

  filterUsers() {
    const filterValue = this.userInput.nativeElement.value.toLowerCase();
    this.filteredUsers = this.userData.filter(option => option.username.toLowerCase().includes(filterValue)
      || option.firstName.toLowerCase().includes(filterValue)
      || option.lastName.toLowerCase().includes(filterValue));
  }

  displayUser(user: User): string {
    return user ? `${user.username} (${user.firstName} ${user.lastName})` : '';
  }

  searchQuestion() {
    let text: string | undefined;
    let username: string | undefined;
    let fromDateString: string | undefined;
    let toDateString: string | undefined;

    if (this.userSelectControl.value) {
      username = this.userSelectControl.value.username;
    }

    if (this.fromDate && this.toDate) {
      fromDateString = formatDate(this.fromDate, 'yyyy-MM-dd', 'en');
      toDateString = formatDate(this.toDate, 'yyyy-MM-dd', 'en');
    }
    if (this.searchInput) {
      text = this.searchInput;
    }

    if (!username && !text && !fromDateString && !toDateString)
      this.resetFilters();

    this.documentService.searchQuestions(text, username, fromDateString, toDateString).subscribe({
      next: value => {
        this.visitAssignments = value;
      }
    })

  }

  resetFilters() {
    this.searchInput = '';
    this.fromDate = '';
    this.toDate = '';

    this.userSelectControl.setValue('');

    this.visitAssignments = this.originalVisitAssignments;
  }

  openAssignmentDetails(id: bigint) {
    void this.router.navigate(['/documents/question-templates/', id]);
  }

}
