import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AvailableDonorsService } from '../available-donors/available-donors.service';
import { DbService } from 'src/app/database/db.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-generate-alert',
  templateUrl: './generate-alert.page.html',
  styleUrls: ['./generate-alert.page.scss'],
})
export class GenerateAlertPage implements OnInit {
  generateAlertForm: FormGroup;
  constructor(
    public router: Router,
    public modalCtrl: ModalController,
    public availableDonorsService: AvailableDonorsService,
    public dbService: DbService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.generateAlertForm = new FormGroup({
      bloodType: new FormControl("aplus", {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      alertTitle: new FormControl("default Title", {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    })
  }

  onSubmitAlert() {
    //ask the database service to create a new alert
    this.dbService.createAlert(this.generateAlertForm)
      .then((alertId) => {
        console.log(alertId + "the alert has been successfully added")
        //initialize alert locally and navigate to available donors page
        //this.availableDonorsService.startNewAlert(alertId);
        this.router.navigateByUrl(`hospital/available-donors/${alertId}`)
        //dismiss this modal
        this.dismiss();
      })
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
