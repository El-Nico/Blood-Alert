import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { StoryComponentComponent } from './story-component/story-component.component';
import { AppModule } from '../app.module';
import { SomeoneNeedsYourBloodPageModule } from '../donor/someone-needs-your-blood/someone-needs-your-blood.module';
import { HomePageRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SomeoneNeedsYourBloodPageModule,
  ],
  declarations: [HomePage, StoryComponentComponent]
})
export class HomePageModule {}
