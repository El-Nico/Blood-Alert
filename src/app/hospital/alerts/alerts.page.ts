import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { DbService } from 'src/app/database/db.service';
import { aAlert } from 'src/app/database/models/models';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.page.html',
  styleUrls: ['./alerts.page.scss'],
})
export class AlertsPage implements OnInit {

  alerts: aAlert[] = [];
  currentAlert: boolean = false;
  alertSubscription: Subscription;
  constructor(
    private dbService: DbService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.dbService.getAlerts()
      .pipe(
        map(alerts => alerts.filter(alert => alert.hospitalId === this.authService.myHospital.snapshotId))
      )
      .subscribe(filteredAlerts => {
        this.alerts = filteredAlerts
      })
  }

}


