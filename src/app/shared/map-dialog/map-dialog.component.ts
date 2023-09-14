import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.css']
})
export class MapDialogComponent {
  apiLoaded: boolean = false;

  // GOOGLE MAPS
  initialCenter: google.maps.LatLngLiteral = {lat: 31.90232873931861, lng: 35.20345069995768};
  initialZoom: number = 10;

  userPosition: google.maps.LatLngLiteral = this.initialCenter;
  customerPosition: google.maps.LatLngLiteral = this.initialCenter;
  markerOptions: google.maps.MarkerOptions = {
    optimized: true,
  };

  constructor(
    private matDialogRef: MatDialogRef<MapDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cusLat: number, cusLng: number, userLat: number, userLng: number },
    httpClient: HttpClient,
  ) {
    httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyC1rCFrBqu32lHImkYyDBSyfmaxp5YCPao', 'callback')
      .pipe()
      .subscribe({
        next: () => {
          this.apiLoaded = true;

          let newCenter: google.maps.LatLngLiteral = {
              lat: data.userLat,
              lng: data.userLat,
            }
          this.initialCenter = newCenter;
          this.userPosition = newCenter;
          this.customerPosition = {
            lat: data.cusLat,
            lng: data.cusLng
          }
          this.initialZoom = 15;
        },
        error: () => {
          this.closeDialog();
        }
      });
  }

  closeDialog() {
    this.matDialogRef.close();
  }
}
