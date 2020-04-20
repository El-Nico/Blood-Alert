import { Component, OnInit, Input } from '@angular/core';
import { DbService } from 'src/app/database/db.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-someone-needs-your-blood',
  templateUrl: './someone-needs-your-blood.page.html',
  styleUrls: ['./someone-needs-your-blood.page.scss'],
})
export class SomeoneNeedsYourBloodPage implements OnInit {
  @Input('alerts') alerts;
  constructor(private dbService: DbService,
    private authService: AuthService) { }

  ngOnInit() {

  }
  // onClickAccept() {
  //   this.dbService.donorAccepted(this.authService.donor, alert);
  // }
  // onClickDecline() {
  //   this.dbService.donorDeclined(this.authService.donor, alert);
  // }
}
