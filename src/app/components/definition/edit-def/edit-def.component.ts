import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {DefinationService} from "../../../services/defination.service";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-edit-def',
  templateUrl: './edit-def.component.html',
  styleUrls: ['./edit-def.component.css']
})
export class EditDefComponent implements OnInit {
  editForm!: FormGroup;
  uuid: bigint = BigInt(0);
  TypesData: any[] = [];
  types: any[] = [];

  constructor(private definationServices: DefinationService, private fb: FormBuilder, private route: ActivatedRoute, SnackBar: MatSnackBar) {
  }

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.fetchDefinationData(id);
      }
    })

    this.route.params.subscribe((params) => {
      const id = params['uuid'];
      if (id) {
        console.log("id", id);
      }
    });

    this.editForm = this.fb.group({
      name: [''],
      description: [''],
      frequency: [''],
      allowRecurring: [''],
      typeUUID: ['']

    });

    this.fetchvisitTypes();
  }

  fetchDefinationData(uuid: bigint) {
    this.definationServices.fetchdef(uuid).subscribe(
      (data) => {
        console.log('Fetched VisitDef data:', data);
        const visit = data;
        this.editForm.patchValue({
          name: visit.name,
          description: visit.description,
          frequency: visit.frequency,
          allowRecurring: visit.allowRecurring,
          typeUUID: visit.typeUUID


        });

        this.uuid = visit.uuid
      },
      (error) => {
        console.error('Error fetching VisitDef data:', error);

      }
    );
  }
    SubmitUpdate(){

    }

  onTypeSelect(event: any) {
    const selectedValue = event.target.value;
    this.editForm.get('typeUUID')?.setValue(selectedValue);
  }
  fetchvisitTypes() {
    this.definationServices.fetchTypesData().subscribe(
      (data) => {
        console.log('Fetched types data:', data);
        this.TypesData = data;
        this.types = data;
      },
      (error) => {
        console.error('Error fetching types data:', error);
      }
    );
  }
}
