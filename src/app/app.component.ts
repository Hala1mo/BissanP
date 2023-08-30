import {Component, OnInit} from '@angular/core';
import {SharedService} from "./services/shared.service";
import {RegistrationService} from "./services/registration.service";
import {City} from "./models/City";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    private cities: City[] = [];

    constructor(
        private sharedService: SharedService,
        private customerService: RegistrationService,
    ) {

    }

    ngOnInit(): void {
        this.sharedService.updateCities();
        this.sharedService.updateVisitTypes();
    }

}
