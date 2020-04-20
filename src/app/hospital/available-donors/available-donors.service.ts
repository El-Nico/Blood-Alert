import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { DbService } from 'src/app/database/db.service';
import { aDonor } from 'src/app/database/models/models';

@Injectable({
  providedIn: 'root'
})

export class AvailableDonorsService {
  currentAlertId:string
  alertBloodType = new Subject<string>();
  constructor(
    private authService: AuthService,
    private dbService: DbService
  ) { }
  getEta(donor: aDonor) {
    var origin = new google.maps.LatLng(this.authService.myHospital.location.lat, this.authService.myHospital.location.lng);
    var destination = new google.maps.LatLng(donor.location.lat, donor.location.lng);

    var service = new google.maps.DistanceMatrixService();
    return new Promise<string>((resolve, reject) => {
      service.getDistanceMatrix(
        {
          origins: [origin],
          destinations: [destination],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false,
        }, callback);

      function callback(response, status) {
        if (response.rows[0].elements[0].duration.text) { resolve(response.rows[0].elements[0].duration.text); }
        else { reject("CANNOT GET"); }
      }
    })
  }


  componentProps: {
    center: { lat: number, lng: number },
    selectable: boolean,
    closeButtonText: string,
    title: string
  }

  setComponentProps(componentProps: {
    center: { lat: number, lng: number },
    selectable: boolean,
    closeButtonText: string,
    title: string
  }) {
    this.componentProps = componentProps;
  }

  getComponentProps(): {
    center: { lat: number, lng: number },
    selectable: boolean,
    closeButtonText: string,
    title: string
  } {
    return this.componentProps
  }
}
