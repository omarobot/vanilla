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
  {
    path: 'location-form',
    loadChildren: () => import('./location-form/location-form.module').then( m => m.LocationFormPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab1PageRoutingModule {}
