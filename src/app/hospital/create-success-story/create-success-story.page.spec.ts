import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateSuccessStoryPage } from './create-success-story.page';

describe('CreateSuccessStoryPage', () => {
  let component: CreateSuccessStoryPage;
  let fixture: ComponentFixture<CreateSuccessStoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSuccessStoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateSuccessStoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
