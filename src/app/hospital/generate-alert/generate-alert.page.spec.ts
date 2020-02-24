import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GenerateAlertPage } from './generate-alert.page';

describe('GenerateAlertPage', () => {
  let component: GenerateAlertPage;
  let fixture: ComponentFixture<GenerateAlertPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateAlertPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GenerateAlertPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
