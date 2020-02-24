import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AvailableDonorsPage } from './available-donors.page';

describe('AvailableDonorsPage', () => {
  let component: AvailableDonorsPage;
  let fixture: ComponentFixture<AvailableDonorsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableDonorsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AvailableDonorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
