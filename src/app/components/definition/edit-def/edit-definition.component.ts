import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {DefinitionService} from "../../../services/definition.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-edit-def',
  templateUrl: './edit-definition.component.html',
  styleUrls: ['./edit-definition.component.css']
})
export class EditDefinitionComponent implements OnInit {
  editForm!: FormGroup;
  uuid: bigint = BigInt(0);
  TypesData: any[] = [];
  types: any[] = [];

  constructor(private definationServices: DefinitionService, private fb: FormBuilder, private route: ActivatedRoute, private SnackBar: MatSnackBar, private routes:Router) {
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
        if(this.editForm.valid){
          const editVisitData=this.editForm.value;
          this.definationServices.updateVisitData(this.uuid,editVisitData).subscribe((response)=> {
            console.log('User data updated successfully:', response);
              this.routes.navigate(['/definitions', editVisitData.id])
          },
            (error) => {
              console.error('Error updating user data:', error);
              if (error.error && error.error.errors && error.error.errors.length > 0) {
                const errorMessage = error.error.errors[0];
                console.log('Error message:', errorMessage);
                // this.toastService.show('Error', errorMessage);
                this.SnackBar.open(errorMessage, '', {
                  duration: 3000
                });

              }

          });
        }
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
