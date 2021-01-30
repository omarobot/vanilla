import { Component, OnInit } from "@angular/core";

import { ModalController, Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { PostModalComponent } from "./home/post/post-modal/post-modal.component";
import { Observable } from "rxjs";
import { ModalService } from "./shared/services/modal.service";
import { AuthenticationService } from "./shared/services/authentication.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit {
  display$: Observable<boolean>;

  //**************************************//
  //********** UI layout pages **********//
  //*************************************//
  appPages = [
    {
      title: "Categories",
      url: "/app/categories",
      ionicIcon: "list-outline",
    },
    {
      title: "Profile",
      url: "/app/user",
      ionicIcon: "person-outline",
    },
    // {
    //   title: "Contact Card",
    //   url: "/contact-card",
    //   customIcon: "./assets/custom-icons/side-menu/contact-card.svg",
    // },
    {
      title: "Notifications",
      url: "/app/notifications",
      ionicIcon: "notifications-outline",
    },
  ];
  accountPages = [
    {
      title: "Log In",
      url: "/auth/login",
      ionicIcon: "log-in-outline",
    },
    {
      title: "Sign Up",
      url: "/auth/signup",
      ionicIcon: "person-add-outline",
    },
    {
      title: "Tutorial",
      url: "/walkthrough",
      ionicIcon: "school-outline",
    },
    {
      title: "Getting Started",
      url: "/getting-started",
      ionicIcon: "rocket-outline",
    },
    {
      title: "404 page",
      url: "/page-not-found",
      ionicIcon: "alert-circle-outline",
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public modalController: ModalController,
    public modalService: ModalService,
    public authService: AuthenticationService,
    public translate: TranslateService
  ) {
    this.initializeApp();
    this.setLanguage();
  }

  ngOnInit() {
    this.display$ = this.modalService.watch();
    this.display$.subscribe((val: any) => {
      console.log("Modal change..." + val);
      if (val) {
        this.presentModal();
      } else {
        this.modalController.dismiss({
          dismissed: true,
        });
      }
    });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: PostModalComponent,
      cssClass: "my-custom-class",
    });
    return await modal.present();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  setLanguage() {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang("en");

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use("en");

    // this is to determine the text direction depending on the selected language
    // for the purpose of this example we determine that only arabic and hebrew are RTL.
    // this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    //   this.textDir = (event.lang === 'ar' || event.lang === 'iw') ? 'rtl' : 'ltr';
    // });
  }
}
