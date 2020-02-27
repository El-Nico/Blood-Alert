import { Component } from '@angular/core';
import { HomeService } from './home.service';
import { story } from '../database/models/models';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  ourStories: story[]
  constructor(private homeService: HomeService) {
    this.ourStories= homeService.getStories()
  }

}
