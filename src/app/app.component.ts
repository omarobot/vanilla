import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
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
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
