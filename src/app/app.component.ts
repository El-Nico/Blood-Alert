import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor, Plugins } from '@capacitor/core';
import { ModalController, Platform } from '@ionic/angular';
import { of, Subject, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { DbService } from './database/db.service';
import { aAlert } from './database/models/models';
import { SomeoneNeedsService } from './donor/someone-needs.service';
import { GenerateAlertPage } from './hospital/generate-alert/generate-alert.page';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private platform: Platform,
    public modalController: ModalController,
    public authService: AuthService,
    private router: Router,
    private dbService: DbService,
    private someoneNeedsService: SomeoneNeedsService
  ) {
    this.initializeApp();
  }
  alertable: Subject<string> = new Subject<string>();
  ngOnInit(): void {
    //if a donor autolocate the donor and update location every 2 mins
    this.authService.__donor.pipe(switchMap(donorValue => {
      if (donorValue) {
        ///set the initial location

        ///then return an interval that updates location every 2 mins
        ///5 minute
        return timer(1000, 300000)
      }
      return of("donor not set")
    })).subscribe(timer => {
      this.dbService.setDonorLocation(this.authService.myDonor);
    })

    //if a donor start the subscription to alerts
    this.authService.__donor.pipe(switchMap(donorValue => {
      if (donorValue) {
        //get all alerts
        return this.dbService.getAlerts()
      }
      return of([])
    }))
      .subscribe(alerts => {
        //check if a donor
        if (alerts.length > 0) {
          //check if accepted

          const myDonorId = this.authService.myDonor.snapshotId
          ///if im contacted in any alert, add the alert id to an array
          var neededAlerts: aAlert[] = alerts.filter(alert => alert.contactedDonors.includes(myDonorId))
          this.someoneNeedsService._neededAlerts.next(neededAlerts)
        }
      })
  }
  initializeApp() {
    this.platform.ready().then(() => {
      if (Capacitor.isPluginAvailable('SplashScreen')) {
        Plugins.SplashScreen.hide();
      }
    });
  }

  onGenerateAlertButtonClicked() {
    this.presentModal()
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: GenerateAlertPage
    });
    return await modal.present();
  }

  loginLogout() {
    if (this.authService.isLoggedIn) {
      this.authService.logout();
      this.router.navigateByUrl("/");
      return;
    }
    this.router.navigateByUrl("/auth");
  }

}
