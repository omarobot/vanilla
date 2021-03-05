import { Component, OnInit, ViewChild } from "@angular/core";
import { Post } from "../../shared/models/post";
import { IonInfiniteScroll, ModalController } from "@ionic/angular";
import { LocationFormPage } from "./location/location-form.page";
import { PostsService } from "src/app/shared/services/posts.service";
import { LocationService } from "src/app/shared/services/location.service";
import { Observable, Subscription } from "rxjs";
import { filter, take } from "rxjs/operators";

@Component({
  selector: "app-timeline",
  templateUrl: "timeline.page.html",
  styleUrls: ["timeline.page.scss"],
})
export class TimelinePage implements OnInit {
  private location: string;

  constructor(
    private locationService: LocationService,
    public modalController: ModalController,
    public postsService: PostsService
  ) {}

  ngOnInit() {
    this.location = this.locationService.location;
    if (!this.location) {
      this.presentModal();
    }
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: LocationFormPage,
    });
    return await modal.present();
  }
}
