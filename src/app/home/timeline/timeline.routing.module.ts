import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TimelinePage } from "./timeline.page";
import { ViewPostPage } from "./view-post/view-post.page";

const routes: Routes = [
  {
    path: "",
    component: TimelinePage,
    children: [],
  },
  {
    path: "view-post/:id",
    component: ViewPostPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimelinePageRoutingModule {}
