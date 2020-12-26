import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  // {
  //   path: "",
  //   loadChildren: () =>
  //     import("./login/login.module").then((m) => m.LoginPageModule),
  // },
  // {
  //   path: "add-post",
  //   loadChildren: () =>
  //     import("./core/tab3/add-post/add-post.module").then(
  //       (m) => m.AddPostPageModule
  //     ),
  // },
  // {
  //   path: "edit-post",
  //   loadChildren: () =>
  //     import("./core/tab1/edit-post/edit-post.module").then(
  //       (m) => m.EditPostPageModule
  //     ),
  // },
  // {
  //   path: "tab5",
  //   loadChildren: () =>
  //     import("./core/tab5/tab5.module").then((m) => m.Tab5PageModule),
  // },
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.TabsPageModule),
  },
  {
    path: "register",
    loadChildren: () =>
      import("./register/register.module").then((m) => m.RegisterPageModule),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
