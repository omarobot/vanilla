import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PostModalComponent } from './post-modal.component';

describe('PostModalComponent', () => {
  let component: PostModalComponent;
  let fixture: ComponentFixture<PostModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PostModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
