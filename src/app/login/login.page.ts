import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MenuController } from "@ionic/angular";
import { AuthenticationService } from "../shared/authentication.service";
import { PostService } from "../shared/post.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

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
    public service: PostService,
    public authService: AuthenticationService
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
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.service.getUser().subscribe((data: any) => {
      console.log(data);
    });
  }

  // Disable side menu for this page
  ionViewDidEnter(): void {
    this.menu.enable(false);
  }

  // Restore to default when leaving this page
  ionViewDidLeave(): void {
    this.menu.enable(true);
  }

  login(): void {
    this.authService
      .signIn(this.loginForm.value.email, this.loginForm.value.password)
      .then((res) => {
        if (this.authService.isEmailVerified) {
          this.router.navigate(["home"]);
        } else {
          window.alert("Email is not verified");
          return false;
        }
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  goToForgotPassword(): void {
    console.log("redirect to forgot-password page");
  }

  doFacebookLogin(): void {
    console.log("facebook login");
    this.router.navigate(["app/categories"]);
  }

  doGoogleLogin(): void {
    console.log("google login");
    this.router.navigate(["app/categories"]);
  }

  doTwitterLogin(): void {
    console.log("twitter login");
    this.router.navigate(["app/categories"]);
  }
}
