import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TimelinePage } from "./timeline.page";

const routes: Routes = [
  {
    path: "",
    component: TimelinePage,
  },
  {
    path: "edit-post/:id",
    loadChildren: () =>
      import("./edit-post/edit-post.module").then((m) => m.EditPostPageModule),
  },
  // {
  //   path: "location-form",
  //   loadChildren: () =>
  //     import("./location/location-form.module").then(
  //       (m) => m.LocationFormPageModule
  //     ),
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimelinePageRoutingModule {}
