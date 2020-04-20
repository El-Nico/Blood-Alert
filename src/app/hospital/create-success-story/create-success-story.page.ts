import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DbService } from 'src/app/database/db.service';
import { story } from 'src/app/database/models/models';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-create-success-story',
  templateUrl: './create-success-story.page.html',
  styleUrls: ['./create-success-story.page.scss'],
})
export class CreateSuccessStoryPage implements OnInit {

  createStoryForm: FormGroup;
  constructor(
    private dbService: DbService,
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.createStoryForm = new FormGroup({
      storyTitle: new FormControl(null, {
        updateOn: 'blur',
        validators : [Validators.required]
      }),
      storyImgUrl: new FormControl(null, {
        updateOn: 'blur',
        validators : [Validators.required]
      }),
      storyDetails: new FormControl(null, {
        updateOn: 'blur',
        validators : [Validators.required]
      })
    })
  }

  onSubmitCreateStoryForm(){
    var story:story={
      hospitalId: this.authService.myHospital.id,
      storyTitle: this.createStoryForm.value.storyTitle,
      imageUrl: this.createStoryForm.value.storyImgUrl,
      storyDetails: this.createStoryForm.value.storyDetails
    }
    this.dbService.addStory(story);
    this.router.navigateByUrl("/")
  }


}
