import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DonorCardComponent } from './donor-card.component';

describe('DonorCardComponent', () => {
  let component: DonorCardComponent;
  let fixture: ComponentFixture<DonorCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonorCardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DonorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
