import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { DbService } from 'src/app/database/db.service';
import { aDonor, Coordinates } from 'src/app/database/models/models';
import { AvailableDonorsService } from './available-donors.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-available-donors',
  templateUrl: './available-donors.page.html',
  styleUrls: ['./available-donors.page.scss'],
})
export class AvailableDonorsPage implements OnInit {

  //map details of the chosen donor 
  availableDonors: aDonor[] = [];
  showMap: boolean = false;
  myAlertId: string = "not set"
  alertTitle:string = "not set"

  //map params
  title: string
  mapCentre: Coordinates
  selectable: boolean = false
  closeButtonText = "Close"
  donor: aDonor

  constructor(
    private dbService: DbService,
    public availableDonorsService: AvailableDonorsService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // extract the param
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.myAlertId = params.get('alertId');
        return this.dbService.getAlert(params.get('alertId'));
      })
    ).subscribe(thisAlert => {
      // extract the available donors from the donors collection
      this.dbService.getDonors()
        .subscribe((donors) => {
          //set the alert title
          this.alertTitle=thisAlert.alertTitle
          //check for accepted donor here
          if (thisAlert.acceptedDonor) {
            this.availableDonors = donors.filter(donor => donor.snapshotId === thisAlert.acceptedDonor)
            this.title = "Go to this Location"
            var availableLat = this.availableDonors[0].location.lat
            var availableLng = this.availableDonors[0].location.lng
            this.mapCentre = {
              lat: availableLat,
              lng: availableLng
            }
            this.selectable = false;
            this.closeButtonText = ""
            this.donor = this.availableDonors[0]
            this.showMap = true;
            ///this.dbService.deactivateAlert(thisAlert);
            return
          }
          var myDonors: aDonor[] = []
          var declinedDonors: string[] = thisAlert.declinedDonors
          //filter by bloodtype
          myDonors = donors.filter(donor => donor.bloodType == thisAlert.bloodType)
          // check if declined
          myDonors = myDonors.filter((donor) => !declinedDonors.includes(donor.snapshotId));
          // add to available donors array
          this.availableDonors = myDonors
        })
      //console.log("this is the alert with this current parammap" + thisAlert)
    });
  }
}
