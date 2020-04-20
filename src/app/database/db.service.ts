import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { Capacitor, Plugins } from '@capacitor/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { aAlert, aDonor, aHospital, story, token } from './models/models';
import * as firebase from 'firebase'

@Injectable({
  providedIn: 'root'
})

//where the db model will be instantiated and populated
export class DbService {
  hospitalsCollection: AngularFirestoreCollection<aHospital>;
  donorsCollection: AngularFirestoreCollection<aDonor>;
  donorDoc: AngularFirestoreDocument<aDonor>;
  donors: Observable<aDonor[]>;
  stories: Observable<story[]>;
  storiesCollection: AngularFirestoreCollection<story>;
  storyDoc: AngularFirestoreDocument<story>;
  alertsCollection: AngularFirestoreCollection<aAlert>;
  alerts: Observable<aAlert[]>;
  alert: Observable<aAlert>;

  tokensCollection: AngularFirestoreCollection<token>;
  //admin= firebase.

  myAlertId: string
  thisHospital: aHospital
  constructor(private afs: AngularFirestore) {
    this.hospitalsCollection = this.afs.collection('hospitals');
    this.donorsCollection = this.afs.collection('donors');
    this.storiesCollection = this.afs.collection('stories');
    this.alertsCollection = this.afs.collection('alerts');
    this.tokensCollection = this.afs.collection('tokens');

    this.stories = this.storiesCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as story;
          data.snapshotId = a.payload.doc.id;
          return data;
        });
      }));

    this.alerts = this.alertsCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as aAlert;
          data.snapshotId = a.payload.doc.id;
          return data;
        });
      }));

    this.donors = this.donorsCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as aDonor;
          data.snapshotId = a.payload.doc.id;
          return data;
        });
      }));
  }





  //CHEAT SHEET
  // export class ItemService {
  //     itemsCollection: AngularFirestoreCollection<Item>;
  //     items: Observable<Item[]>;
  //     itemDoc: AngularFirestoreDocument<Item>;

  //     constructor(public afs: AngularFirestore) { 
  //       //this.items = this.afs.collection('items').valueChanges();

  //       this.itemsCollection = this.afs.collection('items', ref => ref.orderBy('title','asc'));

  //       this.items = this.itemsCollection.snapshotChanges().map(changes => {
  //         return changes.map(a => {
  //           const data = a.payload.doc.data() as Item;
  //           data.id = a.payload.doc.id;
  //           return data;
  //         });
  //       });
  //     }
  //     this.stories = this.storiesCollection.snapshotChanges()
  //   .pipe(map(changes => {
  //     return changes.map(a => {
  //       const data = a.payload.doc.data() as story;
  //       data.snapshotId = a.payload.doc.id;
  //       return data;
  //     });
  //   }));

  //     getItems(){
  //       return this.items;
  //     }

  //     addItem(item: Item){
  //       this.itemsCollection.add(item);
  //     }

  //     deleteItem(item: Item){
  //       this.itemDoc = this.afs.doc(`items/${item.id}`);
  //       this.itemDoc.delete();
  //     }

  //     updateItem(item: Item){
  //       this.itemDoc = this.afs.doc(`items/${item.id}`);
  //       this.itemDoc.update(item);
  //     }

  //   }
  //////////CREATE
  setToken(donor: aDonor, token: string) {
    //locate this donor//set his/her/ze token value
    this.afs.collection('donors').doc(donor.snapshotId).set({ fcmToken: token }, { merge: true }).then(() => { console.log("set fcm token for " + donor.snapshotId) })
  }
  addStory(story: story) {
    this.storiesCollection.add(story);
  }
  addDonor(donor: aDonor) {
    return new Promise<string>((resolve) => {
      this.donorsCollection.add(donor);
      resolve("done");
    })
  }
  addHospital(hospital: aHospital) {
    return new Promise<string>((resolve) => {
      this.hospitalsCollection.add(hospital).then(ref => {
        ref.set({ snapshotId: ref.id }, { merge: true })
      });
      resolve("done");
    })
  }
  createAlert(alertForm: FormGroup): Promise<string> {
    return new Promise((resolve) => {
      ///initialize this alert
      const thisHospitalId = this.thisHospital.snapshotId
      const thisHospitalName = this.thisHospital.name
      var myAlert: aAlert = {
        alertTitle: alertForm.value.alertTitle,
        hospitalId: thisHospitalId,
        hospitalName: thisHospitalName,
        date: new Date().toLocaleString(),
        bloodType: alertForm.value.bloodType,
        active: true,
        availableDonors: [],
        contactedDonors: [],
        declinedDonors: [],
        acceptedDonor: null,
        dank: false
      }
      //create a new alert in the database
      this.alertsCollection.add(myAlert).then(ref => {
        ref.set({ snapshotId: ref.id }, { merge: true }).then(() => {
          resolve(ref.id)
        });
      })
    })
  }

  //////////READ
  getStories(): Observable<story[]> {
    return this.stories
  }
  getAlerts(): Observable<aAlert[]> {
    return this.alerts;
  }
  getAlert(alertId: string): Observable<aAlert> {
    return this.getAlerts()
      .pipe(
        map(alerts => {
          return alerts.find(alert => alert.snapshotId === alertId)
        }));
  }
  getDonors(): Observable<aDonor[]> {
    return this.donors;
  }
  getDonor(donorId: string): Observable<aDonor> {
    return this.getDonors()
      .pipe(
        map(donors => {
          return donors.find(donor => donor.snapshotId === donorId)
        }));
  }
  //////////UPDATE
  addToContacted(donorId: string, alertId: string) {
    //locate this alert
    var contactedArray: string[]
    this.getAlerts().pipe(take(1)).subscribe((alerts) => {
      contactedArray = alerts.find(storedalert => storedalert.snapshotId === alertId).contactedDonors
      //check for duplicates
      if (!contactedArray.includes(donorId)) {
        //update its contacted donors field 
        contactedArray.push(donorId)
        //get the donors fcm token
        this.getDonor(donorId).
        pipe(take(1)).
        subscribe(thisDonor => {
          console.log("accessing cloud function");
          //get function reference
          var thisHospitalName = this.thisHospital.name
          const sayHello = firebase.functions().httpsCallable('sayHello');
          sayHello({ token: thisDonor.fcmToken, hospitalName: thisHospitalName }).then(res => {
            console.log(res.data)
          });
        })
      }
      else {
        console.log("duplicate")
      }
      this.afs.collection('alerts').doc(`${alertId}`).set({ contactedDonors: contactedArray }, { merge: true }).then(() => {
          
       
      })
    })
  }
  setDonorLocation(donor: aDonor) {
    var coordinates = {
      lat: 0,
      lng: 0
    }
    var geoCodePromise: Promise<any>
    //use capacitor geolocation
    if (!Capacitor.isPluginAvailable('Geolocation')) {
      return;
    }
    var geoLocationPromise: Promise<any> = Plugins.Geolocation.getCurrentPosition()
      .then(geoPosition => {

        coordinates.lat = geoPosition.coords.latitude,
          coordinates.lng = geoPosition.coords.longitude
      })
      .then(() => {
        //adddress
        var geocoder = new google.maps.Geocoder;
        var latlng = { lat: coordinates.lat, lng: coordinates.lng };
        geoCodePromise = new Promise<any>((resolve) => {
          geocoder.geocode({ 'location': latlng }, function (results, status) {
            if (status === 'OK') {
              if (results[0]) {
                resolve(results[0].formatted_address);
                donor.location.address = results[0].formatted_address
              } else {
                console.log('No results found');
              }
            } else {
              console.log('Geocoder failed due to: ' + status);
            }
          });
        }).then(() => {
          //static map 
          donor.location.staticMapImageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${coordinates.lat},${coordinates.lng}&zoom=16&size=500x300&maptype=roadmap&markers=color:red%7Clabel:donorLocation%7C${coordinates.lat},${coordinates.lng}&key=${environment.googleMapsAPIKey}`

          donor.location.lat = coordinates.lat; donor.location.lng = coordinates.lng
          this.afs.collection('donors').doc(donor.snapshotId).update(donor)
        })
      })
      .catch(err => {
        console.log(err);
      })



  }
  donorDeclined(donorId: string, alertId: string) {
    //take me off from the contacted donors list and the available donors list
    this.getAlerts().pipe(take(1)).subscribe(alerts => {
      var thisAlert = alerts.find(alert => alert.snapshotId === alertId)
      //remove him from the contacted array
      var contactedArray: string[] = thisAlert.contactedDonors.filter(contactedDonorId => contactedDonorId != donorId)
      //update the contacted array
      this.afs.collection('alerts').doc(`${alertId}`).set({ contactedDonors: contactedArray }, { merge: true }).then(() => { console.log("succesfully removed from contacted array") })
      //and add him to the declined array
      var declinedArray: string[] = thisAlert.declinedDonors
      declinedArray.push(donorId)
      this.afs.collection('alerts').doc(`${alertId}`).set({ declinedDonors: declinedArray }, { merge: true }).then(() => { console.log("added his ass to declined he should be on his way to dissapearing") })
    })
  }
  donorAccepted(donorId: string, alertId: string) {

    //set his status to accepted
    //show his map under his card
    //take me off from the contacted donors list and the available donors list
    this.getAlerts().pipe(take(1)).subscribe(alerts => {
      var thisAlert = alerts.find(alert => alert.snapshotId === alertId)
      //clear contacted array except this guy 
      var contactedArray: string[] = thisAlert.contactedDonors.filter(contactedDonorId => contactedDonorId == donorId)
      //deactivate the alert
      this.afs.collection('alerts').doc(`${alertId}`).set({ active: false }, { merge: true }).then(() => { console.log("succesfully deactivated alert") })
      //update the contacted array
      this.afs.collection('alerts').doc(`${alertId}`).set({ contactedDonors: contactedArray }, { merge: true }).then(() => { console.log("succesfully reduced contacted array") })
      // set this nibba as the chosen
      this.afs.collection('alerts').doc(`${alertId}`).set({ acceptedDonor: donorId }, { merge: true }).then(() => { console.log("tha candidatf haz bin chozn") })
    })
    //set dank to true after a while to stop persistent notification on donor side
    setTimeout(()=>{
      // set this nibba as the chosen
      this.afs.collection('alerts').doc(`${alertId}`).set({ dank: true }, { merge: true }).then(() => { console.log("bye bye notif") })
    },120000);
  }
  //////////DELETE
  deleteStory(story: story) {
    this.storyDoc = this.afs.doc(`stories/${story.snapshotId}`);
    this.storyDoc.delete();
  }


  ///////////////////////////
  determineType(uid: string): Promise<string> {
    ///are you a hospital
    return new Promise<string>((resolve, reject) => {

      this.hospitalsCollection.snapshotChanges().pipe(
        map(changes => {
          return changes.map(a => {
            const hospitals = a.payload.doc.data() as aHospital;
            return hospitals.id;
          });
        })
      ).subscribe(hospitals => {
        if (hospitals.indexOf(uid) > -1) {
          resolve('hospital');
        }
        else {
          resolve('donor');
        }
      })
    })
  }

  stockDonors(alertBloodType: string): Promise<any> {
    return new Promise<any>((resolve) => {
      this.getDonors().pipe(take(1))
        .subscribe((donors) => {
          //filter by bloodtype
          resolve(donors.filter(donor => donor.bloodType == alertBloodType))
        })
    })
  }
}
