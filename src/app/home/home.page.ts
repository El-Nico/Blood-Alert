import { Component, OnInit, OnDestroy } from '@angular/core';
import { story } from '../database/models/models';
import { DbService } from '../database/db.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { SomeoneNeedsService } from '../donor/someone-needs.service';
import * as firebase from 'firebase'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  ourStories: story[] = [];

  topAction: String;
  isDonor;
  isHospital = false;
  private storiesSub: Subscription;
  someoneDoesNeedYourBlood: boolean = false
  constructor(
    private dbService: DbService,
    public authService: AuthService,
    public someoneNeedsService: SomeoneNeedsService,
  ) { }

  ngOnInit(): void {
    //subscribe to db object
    this.dbService.getStories().subscribe(stories => {
      this.ourStories = stories;
    });

    this.someoneNeedsService._someoneDoesNeedYourBlood.subscribe((value) => {
      this.someoneDoesNeedYourBlood = value
      console.log(this.someoneDoesNeedYourBlood)
    })
  }

  deleteStory(story: story) {
    this.dbService.deleteStory(story);
  }

  onToggleAvailability(event) {
    //console.log(event.detail.checked);
    if (event.detail.checked) {
      this.topAction = "available"
    } else { this.topAction = "unavailable" }
  }

  ngOnDestroy(): void {
    if (this.storiesSub) {
      this.storiesSub.unsubscribe();
    }
  }
}
