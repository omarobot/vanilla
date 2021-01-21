import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {
  IonRouterOutlet,
  MenuController,
  ModalController,
} from "@ionic/angular";
import { PrivacyPolicyPage } from "../privacy-policy/privacy-policy.page";
import { AuthenticationService } from "../shared/authentication.service";
import { TermsOfServicePage } from "../terms-of-service/terms-of-service.page";
import { PasswordValidator } from "../validators/password.validator";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  signupForm: FormGroup;
  matching_passwords_group: FormGroup;

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
    confirm_password: [
      { type: "required", message: "Confirm password is required" },
    ],
    matching_passwords: [{ type: "areNotEqual", message: "Password mismatch" }],
  };

  constructor(
    public router: Router,
    public modalController: ModalController,
    public menu: MenuController,
    private routerOutlet: IonRouterOutlet,
    public authService: AuthenticationService
  ) {
    this.matching_passwords_group = new FormGroup(
      {
        password: new FormControl(
          "",
          Validators.compose([Validators.minLength(5), Validators.required])
        ),
        confirm_password: new FormControl("", Validators.required),
      },
      (formGroup: FormGroup) => {
        return PasswordValidator.areNotEqual(formGroup);
      }
    );

    this.signupForm = new FormGroup({
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
        ])
      ),
      matching_passwords: this.matching_passwords_group,
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

  async showTermsModal() {
    const modal = await this.modalController.create({
      component: TermsOfServicePage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });
    return await modal.present();
  }

  async showPrivacyModal() {
    const modal = await this.modalController.create({
      component: PrivacyPolicyPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });
    return await modal.present();
  }

  signUp(email, password) {
    console.log(this.signupForm);

    this.authService
      .registerUser(
        this.signupForm.value.email,
        this.signupForm.value.matching_passwords.password
      )
      .then((res) => {
        // Do something here
        console.log(res);
        this.authService.sendVerificationEmail();
        this.authService.setUserData(res.user);

        this.router.navigate(["verify-email"]);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  doFacebookSignup(): void {
    console.log("facebook signup");
    this.router.navigate(["app/categories"]);
  }

  doGoogleSignup(): void {
    console.log("google signup");
    this.router.navigate(["app/categories"]);
  }

  doTwitterSignup(): void {
    console.log("twitter signup");
    this.router.navigate(["app/categories"]);
  }
}
