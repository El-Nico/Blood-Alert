import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Renderer2, OnDestroy, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/auth.service';
import { aDonor } from 'src/app/database/models/models';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('map', { static: false }) mapElementRef: ElementRef
  clickListener: any;
  googleMaps: any;
  @Input() selectable = true;
  @Input() closeButtonText = 'Cancel'
  @Input() title: string = "pick a location";
  @Input() mapCentre: { lat: number, lng: number } = { lat: 53.358405, lng: -6.257433 };
  @Input() donor: aDonor

  constructor(
    private authService: AuthService,
    private modalCtrl: ModalController,
    private renderer: Renderer2) {

  }
  ngOnDestroy(): void {
    this.googleMaps.event.removeListener(this.clickListener);
  }

  ngAfterViewInit(): void {
    this.getGoogleMaps().then(googleMaps => {
      this.googleMaps = googleMaps;
      const mapEl = this.mapElementRef.nativeElement;
      const map = new googleMaps.Map(mapEl, {
        center: this.mapCentre,
        zoom: 16
      });

      this.googleMaps.event.addListenerOnce(map, 'idle', () => {
        this.renderer.addClass(mapEl, "visible");
      });

      ///remove this
      if (this.selectable === true) {
        this.clickListener = map.addListener('click', event => {
          const selectedCoords = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
          };
          this.modalCtrl.dismiss(selectedCoords);
        })
      } else {
        //insert directions service here
        var hosLat = this.authService.myHospital.location.lat
        var hosLng = this.authService.myHospital.location.lng
        var hospitalName = this.authService.myHospital.name
        var donorLat = this.donor.location.lat
        var donorLng = this.donor.location.lng
        var donorName = this.donor.name;

        var directionsService = new googleMaps.DirectionsService();
        var directionsRenderer = new googleMaps.DirectionsRenderer()

        directionsRenderer.setMap(map);
        directionsRenderer.setOptions({ suppressMarkers: true });

        //routing
        directionsService.route({
          origin: new googleMaps.LatLng(hosLat, hosLng),
          destination: new googleMaps.LatLng(donorLat, donorLng),
          travelMode: 'DRIVING',
        }, function (result, status) {
          if (status == "OK") {
            directionsRenderer.setDirections(result);

            new googleMaps.Marker({
              position: new googleMaps.LatLng(hosLat, hosLng),
              map: map,
              label: hospitalName,
              title: 'HospitalLocation'
            });

            new googleMaps.Marker({
              position: new googleMaps.LatLng(donorLat, donorLng),
              map: map,
              label: donorName,
              title: 'Donor Location'
            });

          }
        })
      }
    }).catch(err => {
      console.log(err);
    })
  }



  ngOnInit() { }

  onCancel() {
    this.modalCtrl.dismiss();
  }

  private getGoogleMaps(): Promise<any> {
    const win = window as any;
    const googleModule = win.google;
    if (googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsAPIKey}`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if (loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps);
        } else {
          reject("Google maps SDK not available.")
        }
      };
    });
  }
}
