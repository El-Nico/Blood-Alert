import { Injectable } from '@angular/core';
import { aAlert } from '../database/models/models';
import { Subject, BehaviorSubject } from 'rxjs';
import { DbService } from '../database/db.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SomeoneNeedsService {
  constructor(
    private authService: AuthService,
    private dbService: DbService
  ) {
   }
  _neededAlerts: BehaviorSubject<aAlert[]>=new BehaviorSubject<aAlert[]>([])
  neededAlert: aAlert=null;
  someoneDoesNeedYourBlood: boolean= false
  _someoneDoesNeedYourBlood: Subject<boolean>=new Subject<boolean>();

  accepted=false;
  acceptedAlert:aAlert=null
}
