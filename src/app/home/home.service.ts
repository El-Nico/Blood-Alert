import { Injectable } from '@angular/core';
import { DbService } from '../database/db.service';
import { story } from '../database/models/models';

@Injectable({
  providedIn: 'root'
})

export class HomeService {
    stories:story[]
  constructor(private dbService: DbService){
    this.stories= this.dbService._db.stories.getStories()
   
  }

  getStories(){
      return [...this.stories]
  }
}
