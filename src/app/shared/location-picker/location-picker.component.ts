import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Capacitor, Plugins } from '@capacitor/core';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Coordinates, PlaceLocation } from 'src/app/database/models/models';
import { environment } from 'src/environments/environment';
import { MapModalComponent } from '../map-modal/map-modal.component';


@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
})
export class LocationPickerComponent implements OnInit {
  selectedLocationImage: string;
  isLoading = false;
  @Output() locationPick = new EventEmitter<PlaceLocation>();

  constructor(private modalCtrl: ModalController, private http: HttpClient, private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController) {

  }

  ngOnInit() { }

  onPickLocation() {
    this.actionSheetCtrl.create({
      header: 'Please Choose', buttons: [
        {
          text: 'Auto-Locate', handler: () => {
            this.locateUser()
          },
        },
        {
          text: 'Pick on Map', handler: () => {
            this.openMap();
          }
        },
        { text: 'Cancel', role: 'cancel' }
      ]
    }).then(actionSheetEl => {
      actionSheetEl.present();
    })
  }

  private locateUser() {
    //use capacitor geolocation
    if (!Capacitor.isPluginAvailable('Geolocation')) {
      this.showErrorAlert();
      return;
    }
    this.isLoading=true;
    Plugins.Geolocation.getCurrentPosition()
    .then(geoPosition => {
      const coordinates: Coordinates = {
        lat: geoPosition.coords.latitude, 
        lng: geoPosition.coords.longitude
      };
      this.createPlace(coordinates.lat, coordinates.lng);
      this.isLoading= false;
    })
    .catch(err=> {
      this.isLoading= false;
      this.showErrorAlert();
    })
  }
  private showErrorAlert(){
    this.alertCtrl.create({header: 'Could not fetch location', message: 'Please use the map to pick a location',
  buttons: ['Okay']})
    .then(alertEl => alertEl.present());
  }

  private openMap() {
    this.modalCtrl.create({
      component: MapModalComponent
    }).then(modalEl => {
      modalEl.onDidDismiss().then(modalData => {
        if (!modalData.data) {
          return;
        }
        const coordinates: Coordinates={
          lat: modalData.data.lat,
          lng: modalData.data.lng
        };
        this.createPlace(coordinates.lat, coordinates.lng);
      });
      modalEl.present();
    })
  }

  private createPlace(lat: number, lng: number){
    const pickedLocation: PlaceLocation = {
      lat: lat,
      lng: lng,
      address: null,
      staticMapImageUrl: null
    };
    this.isLoading = true;
    this.getAddress(lat, lng).pipe(switchMap((address) => {
      pickedLocation.address = address;
      console.log(address)
      console.log(pickedLocation)
      return of(this.getMapImage(pickedLocation.lat, pickedLocation.lng, 14));
    })).subscribe(staticMapImageUrl => {
      pickedLocation.staticMapImageUrl = staticMapImageUrl;
      this.selectedLocationImage = staticMapImageUrl;
      this.isLoading = false;
      this.locationPick.emit(pickedLocation);
      console.log(staticMapImageUrl);

    });
  }

  private getAddress(lat: number, lng: number) {
    return this.http.get<any>(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${environment.googleMapsAPIKey}`
    ).pipe(map(geoData => {
      if (!geoData || !geoData.results || geoData.results.length === 0) {
        return null;
      }
      return geoData.results[0].formatted_address;
    }));
  }

  private getMapImage(lat: number, lng: number, zoom: number) {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat}, ${lng}&zoom=${zoom}&size=500x300&maptype=roadmap
    &markers=color:red%7Clabel:HospitalAddress%7C${lat},${lng}
    &key=${environment.googleMapsAPIKey}`
  }
}
