import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { HideHeaderConfig } from "src/app/shared/hide-header/hide-header.directive";
import { Post } from "src/app/shared/post";
import { PostService } from "src/app/shared/post.service";

@Component({
  selector: "app-search",
  templateUrl: "search.page.html",
  styleUrls: ["search.page.scss"],
})
export class SearchPage implements OnInit {
  public placesView: boolean = true;
  public eventsView: boolean = false;

  ngOnInit() {
    this.viewPlaces();
  }

  viewPlaces() {
    this.eventsView = false;
    this.placesView = true;
  }

  viewEvents() {
    this.placesView = false;
    this.eventsView = true;
  }

  segmentChanged(event: any) {
    if (event.detail.value === "places") {
      this.viewPlaces();
    } else {
      this.viewEvents();
    }
  }
}
