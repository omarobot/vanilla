import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TimelinePage } from "./timeline.page";

import { TimelinePageRoutingModule } from "./timeline.routing.module";
import { FeedPage } from "./feed/feed.page";
import { LocationFormPage } from "./location/location-form.page";
import { ComponentsModule } from "src/app/components/components.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TimelinePageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
  declarations: [TimelinePage, FeedPage, LocationFormPage],
})
export class TimelinePageModule {}
