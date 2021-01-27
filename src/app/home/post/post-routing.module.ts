import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

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
export class PostPageRoutingModule {}
