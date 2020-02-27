import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-story-component',
  templateUrl: './story-component.component.html',
  styleUrls: ['./story-component.component.scss'],
})
export class StoryComponentComponent implements OnInit {
  @Input('title') title: String="default titles"
  @Input('imgurl') imgurl: String="default urls"
  @Input('details') details: String="defaykt detauks"


  constructor() { }

  ngOnInit() {}

}
