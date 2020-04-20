import { Component, OnInit } from '@angular/core';
import { SomeoneNeedsYourBloodPage } from '../someone-needs-your-blood/someone-needs-your-blood.page';
import { ModalController } from '@ionic/angular';
import { SomeoneNeedsService } from '../someone-needs.service';
import { aAlert } from 'src/app/database/models/models';
import { DbService } from 'src/app/database/db.service';
import { AuthService } from 'src/app/auth/auth.service';
import { switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-alert-notification',
  templateUrl: './alert-notification.component.html',
  styleUrls: ['./alert-notification.component.scss'],
})
export class AlertNotificationComponent implements OnInit {

  constructor(
    private modalController: ModalController,
    private someoneNeedsService: SomeoneNeedsService,
    private dbService: DbService,
    private authService: AuthService
  ) { }
  //well this is where i called it a night
  //this is wacky and doesnt work
  needs: aAlert[] = []
  ngOnInit() {
    //subscribe to needed alerts
    this.someoneNeedsService._neededAlerts
      .subscribe((neededAlerts) => {
        this.needs = neededAlerts
      })
  }

  onAccepted(alert: aAlert) {
    //clear contacted array except this guy
    //set his status to accepted
    //show his map under his card
    this.dbService.donorAccepted(this.authService.myDonor.snapshotId, alert.snapshotId)
  }
  onDenied(alert: aAlert) {
    //just move this guy into the declined array p.s and take him out of contacted
    this.dbService.donorDeclined(this.authService.myDonor.snapshotId, alert.snapshotId)
  }

  async presentAlertModal() {
    const modal = await this.modalController.create({
      component: SomeoneNeedsYourBloodPage//,
      // componentProps: {
      //   'alerts':alerts
      // }
    });
    return await modal.present();
  }

  getHospitalName(alertId) {

  }
}
