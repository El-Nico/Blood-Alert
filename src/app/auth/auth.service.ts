
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { DbService } from '../database/db.service';
import { aDonor, aHospital,  aAlert } from '../database/models/models';
import { NotificationService } from '../notification.service';



@Injectable({
    providedIn: 'root'
})
export class AuthService {
    thisHospital: AngularFirestoreCollection<aHospital>;
    myHospital: aHospital
    thisDonor: AngularFirestoreCollection<aDonor>;
    myDonor: aDonor= null
    __donor: Subject<aDonor> = new Subject<aDonor>();
    isLoggedIn: boolean = false;
    myAlert: aAlert;
    private _token = new BehaviorSubject<string>(null)

    //////

    constructor(
        private router: Router,
        private dbService: DbService,
        private afs: AngularFirestore,
        private notificationService: NotificationService
    ) {
        //inititalize the hospital collection
        this.thisHospital = afs.collection('hospitals');
        this.thisDonor = afs.collection('donors');

    }
    //register hospital and donor
    doRegister(form, userType) {
        var email = form.value.email, password = form.value.password;
        new Promise<any>((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(res => {
                    resolve(res);
                }, err => reject(err))
        }).then(res => {
            //hospital or donor?
            //hospital
            if (userType == "hospital") {
                var name = form.value.name, location = form.value.location, alerts = [],
                    email = form.value.email, id = res.user.$.W;
                //add this hospital to the database
                //then set the values here to hospital
                this.router.navigateByUrl("/auth");
                this.dbService.addHospital(
                    {
                        id,
                        email,
                        name,
                        location,
                        alerts,
                    }
                ).then((res) => {
                    ///we set our hospital
                    this.setMyHospital(id)
                });
            }
            else if (userType == "donor") {
                var name = form.value.name, bloodType = form.value.bloodType,
                    id = res.user.$.W, email = form.value.email;
                //add this hospital to the database
                //then set the values here to hospital
                this.router.navigateByUrl("/auth");

                this.dbService.addDonor(
                    {
                        id,
                        email,
                        name,
                        bloodType,
                        location: {
                            lat: null,
                            lng: null,
                            address: null,
                            staticMapImageUrl: null
                        }
                    }
                ).then((res) => {
                    ///we set our donor
                    this.setMyDonor(id)
                });
            }
        }, err => {
            console.log(err)
        })
    }

    //login hospital and donor
    doLogin(form) {
        var email = form.value.email, password = form.value.password;
        new Promise<any>((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(res => {
                    resolve(res);
                }, err => reject(err))
        }).then(res => {
            //determine the user type
            this.dbService.determineType(res.user.$.W).then(result => {
                if (result == "donor") {
                    this.setMyDonor(res.user.$.W).then(myDonor => {
                        this.myDonor = myDonor;
                        this.__donor.next(myDonor)
                        this.router.navigateByUrl("/home")
                        this.isLoggedIn=true;
                        //initialize token
                        this.notificationService.initializeNotifications(this.myDonor)
                    });
                }
                else if (result == "hospital") {
                    this.setMyHospital(res.user.$.W);
                    this.router.navigateByUrl("/home")
                    this.isLoggedIn=true;
                }
            }).catch(err => {

            })


        }).catch(err => {
            console.log("this is from signin attempt " + err)
        })
    }

    setMyHospital(hospitalId: string) {
        this.thisHospital.snapshotChanges().pipe(
            map(changes => {
                return changes.map(a => {
                    const hospitals = a.payload.doc.data() as aHospital;
                    hospitals.snapshotId = a.payload.doc.id;
                    return hospitals;
                });
            })
        ).subscribe(hospitals => {
            this.myHospital = hospitals.find(hospital => hospital.id == hospitalId)
            this.dbService.thisHospital=this.myHospital
        })
    }

    setMyDonor(donorId: string) {
        return new Promise<aDonor>((resolve, reject) => {
            this.thisDonor.snapshotChanges().pipe(
                map(changes => {
                    return changes.map(a => {
                        const donors = a.payload.doc.data() as aDonor;
                        donors.snapshotId = a.payload.doc.id;
                        return donors;
                    });
                })
            ).subscribe(donors => {
                this.dbService.setDonorLocation(donors.find(donor => donor.id == donorId));
                resolve(donors.find(donor => donor.id == donorId));
            })
        })
    }

    //logout
    logout() {
        firebase.auth().signOut();
        this.myDonor=null;
        this.myHospital=null;
        this.isLoggedIn=false;
    }
}
