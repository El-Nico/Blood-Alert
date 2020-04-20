import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { } from 'googlemaps';
import { AuthService } from 'src/app/auth/auth.service';
import { DbService } from 'src/app/database/db.service';
import { aDonor } from 'src/app/database/models/models';
import { DonorDetailPage } from 'src/app/donor-detail/donor-detail.page';
import { DonorDetailService } from 'src/app/donor-detail/donor-detail.service';
import { AvailableDonorsService } from '../available-donors.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'donor-card',
  templateUrl: './donor-card.component.html',
  styleUrls: ['./donor-card.component.scss'],
})
export class DonorCardComponent implements OnInit, AfterViewInit {
  @Input('name') name: string;
  @Input('address') address: string;
  @Input('donor') donor: aDonor
  @Input('imageUrl') imageUrl: string
  @Input('thisAlertId') thisAlertId: string
  //@Input('status')status:string;
  status = "uncontacted"

  approximateETA: string;
  contactButtonDisabled: boolean=false;
  
  constructor(
    public modalController: ModalController,
    public availableDonorsService: AvailableDonorsService,
    public authService: AuthService,
    private donorDetailService: DonorDetailService,
    private dbService: DbService
  ) { }

  ngAfterViewInit(): void {
    this.availableDonorsService.getEta(this.donor).then((ETA) => {
      this.approximateETA = ETA;
    }).catch((errorMessage) => {
      this.approximateETA == errorMessage;
    })
  }

  ngOnInit() {
    //db service subscripiton to change contacted status
    this.dbService.getAlerts().pipe(
      map(alerts => alerts.find(alert => alert.snapshotId == this.thisAlertId))
    ).subscribe((thisAlert) => {
      
      if (thisAlert.acceptedDonor) {
        this.status = "accepted"
        this.contactButtonDisabled = true;
      }
    })
  }

  onContactDonorClicked() {
    ///add to array of contacted donors and the alert id
    this.dbService.addToContacted(this.donor.snapshotId, this.thisAlertId);
    ///change the status to contacted 
    this.status = "contacted Awaiting Response"
  }


  viewMap() {
    this.presentModal()
  }
  async presentModal() {

    this.donorDetailService.setApproximateETA(this.approximateETA);
    this.donorDetailService.setDonorAddress(this.address);
    this.donorDetailService.setStatus(this.status);

    var lat = this.authService.myHospital.location.lat
    var lng = this.authService.myHospital.location.lng

    const modal = await this.modalController.create({
      component: DonorDetailPage,
      componentProps: {

        'title': this.donor.name,
        'mapCentre': {
          lat: lat,
          lng: lng
        },
        'selectable': false,
        'closeButtonText': "Close",
        'donor': this.donor
      }

    });
    return await modal.present();
  }
}
