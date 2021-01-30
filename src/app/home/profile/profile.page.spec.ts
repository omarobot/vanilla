import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { ProfilePage } from "./profile.page";

describe("Tab5Page", () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProfilePage],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(ProfilePage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
