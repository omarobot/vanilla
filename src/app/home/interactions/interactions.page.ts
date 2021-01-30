import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { LocationFormPage } from "../timeline/location/location-form.page";

@Component({
  selector: "app-interactions",
  templateUrl: "./interactions.page.html",
  styleUrls: ["./interactions.page.scss"],
})
export class InteractionsPage implements OnInit {
  constructor(public modalController: ModalController) {}

  ngOnInit() {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: LocationFormPage,
    });
    return await modal.present();
  }
}
