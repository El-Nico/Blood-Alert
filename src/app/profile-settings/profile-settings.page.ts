import { Component, OnInit } from '@angular/core';
import { DbService } from '../database/db.service';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { SomeoneNeedsService } from '../donor/someone-needs.service';


@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.page.html',
  styleUrls: ['./profile-settings.page.scss'],
})
export class ProfileSettingsPage implements OnInit {

  constructor(
    private dbService: DbService,
    private authService: AuthService,
    public someoneNeedsService: SomeoneNeedsService
  ) { }
someoneDoesNeedYourBlood: boolean= false
  ngOnInit() {
    this.someoneNeedsService._someoneDoesNeedYourBlood.subscribe((value)=>{
      this.someoneDoesNeedYourBlood=value
    })
  }



}
