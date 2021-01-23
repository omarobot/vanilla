import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocationFormPage } from './location-form.page';

describe('LocationFormPage', () => {
  let component: LocationFormPage;
  let fixture: ComponentFixture<LocationFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocationFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
