import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Tab3Page } from "./tab3.page";

const routes: Routes = [
  { path: "", pathMatch: "full" },
  // {
  //   path: "post",
  //   loadChildren: () =>
  //     import("./add-post/add-post.module").then((m) => m.AddPostPageModule),
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab3PageRoutingModule {}
