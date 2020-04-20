import { Injectable } from '@angular/core';

///notification imports
import {
    // Plugins,
    PushNotification,
    PushNotificationToken,
    PushNotificationActionPerformed,
    Plugins
} from '@capacitor/core'
import { DbService } from './database/db.service';
import { Platform } from '@ionic/angular';
import { aDonor } from './database/models/models';
const { PushNotifications, Modals } = Plugins;

@Injectable({
    providedIn: 'root'
})

export class NotificationService {
    constructor(
        private dbService: DbService,
        private platform: Platform,
    ) { }
    //initialize notifications
    initializeNotifications(donor:aDonor) {
        //set up the notifications only if the platform is android
        if (this.platform.is('android')) {
            //service goes here
            // Register with Apple / Google to receive push via APNS/FCM
            PushNotifications.register();

            // On succcess, we should be able to receive notifications
            PushNotifications.addListener('registration',
                (token: PushNotificationToken) => {
                    alert('Push registration success, token: ' + token.value);
                    this.dbService.setToken(donor, token.value);
                    console.log('Push registration success, token: ' + token.value);
                }
            );

            // Some issue with our setup and push will not work
            PushNotifications.addListener('registrationError',
                (error: any) => {
                    alert('Error on registration: ' + JSON.stringify(error));
                }
            );

            // Show us the notification payload if the app is open on our device
            PushNotifications.addListener('pushNotificationReceived',
                (notification: PushNotification) => {
                    var audio1 = new Audio('assets/audio.mp3');
                    console.log('Audio');
                    audio1.play();
                    // alert('Push received: ' + JSON.stringify(notification));
                    console.log('Push received: ', notification);

                    let alertRet = Modals.alert({
                        title: notification.title,
                        message: notification.body
                    });

                }
            );

            // Method called when tapping on a notification
            PushNotifications.addListener('pushNotificationActionPerformed',
                (notification: PushNotificationActionPerformed) => {
                    alert('Push action performed: ' + JSON.stringify(notification));
                    console.log('Push action performed: ' + notification);
                }
            );
        }
    }
}