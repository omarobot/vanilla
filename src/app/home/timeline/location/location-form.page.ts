import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-location-form",
  templateUrl: "./location-form.page.html",
  styleUrls: ["./location-form.page.scss"],
})
export class LocationFormPage implements OnInit {
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

  constructor(public modalController: ModalController) {
    this.loginForm = new FormGroup({
      city: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.minLength(5)])
      ),
      // password: new FormControl(
      //   "",
      //   Validators.compose([Validators.minLength(5), Validators.required])
      // ),
    });
  }

  ngOnInit() {}

  submit() {}

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
