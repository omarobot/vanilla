import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Tab1Page } from "./tab1.page";

const routes: Routes = [
  {
    path: "",
    component: Tab1Page,
  },
  {
    path: "edit-post/:id",
    loadChildren: () =>
      import("./edit-post/edit-post.module").then((m) => m.EditPostPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab1PageRoutingModule {}
