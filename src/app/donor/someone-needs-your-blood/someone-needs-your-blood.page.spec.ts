import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SomeoneNeedsYourBloodPage } from './someone-needs-your-blood.page';

describe('SomeoneNeedsYourBloodPage', () => {
  let component: SomeoneNeedsYourBloodPage;
  let fixture: ComponentFixture<SomeoneNeedsYourBloodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SomeoneNeedsYourBloodPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SomeoneNeedsYourBloodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
