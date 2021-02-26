import { Component, NgZone, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoadingController, MenuController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { AuthenticationService } from "../shared/services/authentication.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  submitError: string;
  redirectLoader: HTMLIonLoadingElement;
  authRedirectResult: Subscription;

  validation_messages = {
    email: [
      { type: "required", message: "Email is required." },
      { type: "pattern", message: "Enter a valid email." },
    ],
    password: [
      { type: "required", message: "Password is required." },
      {
        type: "minlength",
        message: "Password must be at least 5 characters long.",
      },
    ],
  };

  constructor(
    public router: Router,
    public menu: MenuController,
    public authService: AuthenticationService,
    public loadingController: LoadingController,
    private ngZone: NgZone
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
        ])
      ),
      password: new FormControl(
        "",
        Validators.compose([Validators.minLength(5), Validators.required])
      ),
    });

    // Get firebase authentication redirect result invoken when using signInWithRedirect()
    // signInWithRedirect() is only used when client is in web but not desktop
    this.authRedirectResult = this.authService
      .getRedirectResult()
      .subscribe((result) => {
        if (result.user) {
          this.redirectToHome();
        } else {
          this.manageAuthWithProvidersErrors(result);
        }
      });
  }

  ngOnInit() {}

  // Disable side menu for this page
  ionViewDidEnter(): void {
    this.menu.enable(false);
  }

  // Restore to default when leaving this page
  ionViewDidLeave(): void {
    this.menu.enable(true);
  }

  login(): void {
    this.resetSubmitError();
    this.authService
      .signIn(this.loginForm.value.email, this.loginForm.value.password)
      .then((res) => {
        if (this.authService.isEmailVerified) {
          this.router.navigate(["home"]);
        } else {
          this.submitError = "Email is not verified";
          return false;
        }
      })
      .catch((error) => {
        this.submitError = error;
      });
  }

  // Once the auth provider finished the authentication flow, and the auth redirect completes,
  // hide the loader and redirect the user to the profile page
  redirectToHome() {
    this.dismissLoading();
    // As we are calling the Angular router navigation inside a subscribe method, the navigation will be triggered outside Angular zone.
    // That's why we need to wrap the router navigation call inside an ngZone wrapper
    this.ngZone.run(() => {
      this.router.navigate(["home"]);

      // Get previous URL from our custom History Helper
      // If there's no previous page, then redirect to profile
      // const previousUrl = this.historyHelper.previousUrl || 'firebase/auth/profile';
      // const previousUrl = "firebase/auth/profile";

      // No need to store in the navigation history the sign-in page with redirect params (it's justa a mandatory mid-step)
      // Navigate to profile and replace current url with profile
      // this.router.navigate([previousUrl], { replaceUrl: true });
    });
  }

  goToForgotPassword(): void {
    console.log("redirect to forgot-password page");
  }

  googleLogin(): void {
    this.resetSubmitError();
    this.authService
      .googleAuth()
      .then((res) => {})
      .catch((error) => {
        this.submitError = error;
      });
  }

  // doFacebookLogin(): void {
  //   console.log("facebook login");
  //   this.router.navigate(["app/categories"]);
  // }

  // doTwitterLogin(): void {
  //   console.log("twitter login");
  //   this.router.navigate(["app/categories"]);
  // }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: "my-custom-class",
      message: "Signing in..",
    });
    await loading.present();
  }

  manageAuthWithProvidersErrors(errorMessage: string) {
    this.submitError = errorMessage;
    this.dismissLoading();
  }

  async dismissLoading() {
    await this.loadingController.dismiss();
  }

  resetSubmitError() {
    this.submitError = null;
  }
}
