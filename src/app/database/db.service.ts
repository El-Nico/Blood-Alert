import { Injectable } from '@angular/core';
import { DB, story } from './models/models';

@Injectable({
  providedIn: 'root'
})

//where the db model will be instantiated and populated
export class DbService {
  // private _stories: story[] = [];

  // get stories(){
  //   return [...this._stories];
  // }

   _db :  {
    stories:{
        getStories: () => story[]
}
}= new DB(
    //stories
    [
      new story(
        "0", 
        "The Incredible Story of Utshab", 
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQmEiWemqrkFG0IpGM-Mvz_RLBO0Ps1rxb5294V1whaFuTW7HUq",
        "this is the incredible story of how a blood transfusion saved utshabs life"
        ),
        new story(
          "0", 
          "The Incredible Story of Utshab", 
          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQmEiWemqrkFG0IpGM-Mvz_RLBO0Ps1rxb5294V1whaFuTW7HUq",
          "this is the incredible story of how a blood transfusion saved utshabs life"
        ),
        //end of stories
    ]
  ).getDb();
  constructor() { 
    
  }

  get stories() : story[]{
    return this._db.stories.getStories();
  }

  
}
