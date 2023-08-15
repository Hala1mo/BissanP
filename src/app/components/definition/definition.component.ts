import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {RegistrationService} from "../../services/registration.service";
import {Definiton} from "../../models/definiton";
import {Type} from "../../models/type";
import {DefinationService} from "../../services/defination.service";

@Component({
  selector: 'app-definition',
  templateUrl: './definition.component.html',
  styleUrls: ['./definition.component.css']
})
export class DefinitionComponent implements OnInit {
  Data:Definiton[] = [];
  originalData: Definiton[] = [];
  TypesData: Type[] = [];
  types: Type[] = [];
  selectedEnabledOption = "Enabled"



  constructor(
    private router: Router,
    private VistServices:DefinationService,

  ) {
  }


  ngOnInit() {
    this.fetchDefinition();
    this.fetchVisitTypes();
  }


  fetchDefinition() {
    this.selectedEnabledOption = "All"
    this.VistServices.fetchDefinition().subscribe(
      (data) => {
        console.log('Fetched details data:', data);
        this.originalData = this.Data = (data); // Create a new Customer object
      },
      (error) => {
        console.error('Error fetching customer data:', error);
      }
    );
  }


  updateEnabled(defId: any) {

    this.VistServices.updateEnabledStatusDefinition(defId).subscribe(
      (res: any) => {
        console.log('Enabled status updated successfully:', res);

        this.fetchDefinition();

      },
      (error) => {
        console.error('Error updating enabled status:', error);

      }
    );
  }

  openDefinitionDetails(id: bigint) {
    this.router.navigate(['/details-def', id]);

  }

  openAddDefinition() {
    this.router.navigate(['/add-def']);

  }


  showEnables() {
    this.selectedEnabledOption= "Enabled"
    console.log(this.originalData);
    const enabledDef:Definiton[] = this.originalData.filter((item: Definiton) => item.enabled === 1);
    this.Data = enabledDef;
  }


  showDisables() {
    this.selectedEnabledOption = "Disabled"
    this.Data = this.originalData.filter((item: Definiton) => item.enabled === 0);

  }


  applySearchFilter(event: any) {
    const searchValue = event.target.value;
    const lowerSearchValue = searchValue.toLowerCase();
    this.Data = this.originalData.filter((item: Definiton) =>
      item.name.toLowerCase().includes(lowerSearchValue)
    );
  }

  recurringData() {
    const Def = this.originalData.filter((item: Definiton) => item.allowRecurring === true);
    this.Data = Def;


  }

  NrecurringData() {
    const Def = this.originalData.filter((item: Definiton) => item.allowRecurring === false);
    this.Data = Def;
  }

  fetchVisitTypes() {

    this.VistServices.fetchTypesData().subscribe(
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

  onTypeSelect(selectedValue : string) {
    const Def :Definiton[] = this.originalData.filter((item: Definiton) => item.type.name === selectedValue);
    this.Data = Def;
  }
}
