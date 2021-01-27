import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { LocationFormPage } from "../timeline/location/location-form.page";

@Component({
  selector: "app-tab4",
  templateUrl: "./tab4.page.html",
  styleUrls: ["./tab4.page.scss"],
})
export class Tab4Page implements OnInit {
  constructor(public modalController: ModalController) {}

  ngOnInit() {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: LocationFormPage,
    });
    return await modal.present();
  }
}
