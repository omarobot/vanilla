import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "", pathMatch: "full" },
  {
    path: "",
    loadChildren: () =>
      import("./tabs/tabs.module").then((m) => m.TabsPageModule),
  },
  {
    path: "add-post",
    loadChildren: () =>
      import("./tab3/add-post/add-post.module").then(
        (m) => m.AddPostPageModule
      ),
  },
  {
    path: "edit-post",
    loadChildren: () =>
      import("./tab1/edit-post/edit-post.module").then(
        (m) => m.EditPostPageModule
      ),
  },
  {
    path: 'tab5',
    loadChildren: () => import('./tab5/tab5.module').then( m => m.Tab5PageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
