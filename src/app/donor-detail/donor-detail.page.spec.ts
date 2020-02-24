import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DonorDetailPage } from './donor-detail.page';

describe('DonorDetailPage', () => {
  let component: DonorDetailPage;
  let fixture: ComponentFixture<DonorDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonorDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DonorDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
