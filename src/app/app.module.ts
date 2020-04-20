import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { GenerateAlertPageModule } from './hospital/generate-alert/generate-alert.module';
import { DbService } from './database/db.service';
import { AuthService } from './auth/auth.service';
import { SomeoneNeedsYourBloodPage } from './donor/someone-needs-your-blood/someone-needs-your-blood.page';
import { SomeoneNeedsYourBloodPageModule } from './donor/someone-needs-your-blood/someone-needs-your-blood.module';
import { AngularFireModule } from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http'; 
import * as firebase from 'firebase';

// FCM
import { FCM } from '@ionic-native/fcm/ngx';

firebase.initializeApp(environment.firebase)

@NgModule({
  declarations: [AppComponent],
  entryComponents: [SomeoneNeedsYourBloodPage],
  imports: [BrowserModule, 
    HttpClientModule,
    IonicModule.forRoot(), 
    AppRoutingModule, 
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    GenerateAlertPageModule,
    SomeoneNeedsYourBloodPageModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FCM,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DbService,
    AuthService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
