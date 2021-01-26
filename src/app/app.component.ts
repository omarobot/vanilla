import { Component, OnInit } from "@angular/core";

import { ModalController, Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { PostModalComponent } from "./home/tab3/post-modal/post-modal.component";
import { Observable } from "rxjs";
import { ModalService } from "./shared/services/modal.service";

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
    {
      title: "Contact Card",
      url: "/contact-card",
      customIcon: "./assets/custom-icons/side-menu/contact-card.svg",
    },
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
    public modalService: ModalService
  ) {
    this.initializeApp();
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
}
