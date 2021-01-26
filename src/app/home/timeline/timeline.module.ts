import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TimelinePage } from "./timeline.page";

import { TimelinePageRoutingModule } from "./timeline.routing.module";
import { FeedPage } from "./feed/feed.page";

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, TimelinePageRoutingModule],
  declarations: [TimelinePage, FeedPage],
})
export class TimelinePageModule {}
