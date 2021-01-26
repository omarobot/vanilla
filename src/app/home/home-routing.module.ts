import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomePage } from "./home.page";

const routes: Routes = [
  {
    path: "",
    component: HomePage,
    children: [
      {
        path: "",
        redirectTo: "timeline",
        pathMatch: "full",
      },
      {
        path: "timeline",
        loadChildren: () =>
          import("./timeline/timeline.module").then(
            (m) => m.TimelinePageModule
          ),
      },
      {
        path: "search",
        loadChildren: () =>
          import("./search/search.module").then((m) => m.SearchPageModule),
      },
      {
        path: "tab3",
        loadChildren: () =>
          import("./tab3/tab3.module").then((m) => m.Tab3PageModule),
      },
      {
        path: "tab4",
        loadChildren: () =>
          import("./tab4/tab4.module").then((m) => m.Tab4PageModule),
      },
      {
        path: "tab5",
        loadChildren: () =>
          import("./tab5/tab5.module").then((m) => m.Tab5PageModule),
      },
    ],
  },
  // {
  //   path: "tabs",
  //   component: TabsPage,
  //   children: [
  //     {
  //       path: "tab1",
  //       loadChildren: () =>
  //         import("./tab1/tab1.module").then((m) => m.Tab1PageModule),
  //     },
  //     {
  //       path: "tab2",
  //       loadChildren: () =>
  //         import("./tab2/tab2.module").then((m) => m.Tab2PageModule),
  //     },
  //     {
  //       path: "tab3",
  //       loadChildren: () =>
  //         import("./tab3/tab3.module").then((m) => m.Tab3PageModule),
  //     },
  //     {
  //       path: "tab4",
  //       loadChildren: () =>
  //         import("./tab4/tab4.module").then((m) => m.Tab4PageModule),
  //     },
  //     {
  //       path: "tab5",
  //       loadChildren: () =>
  //         import("./tab5/tab5.module").then((m) => m.Tab5PageModule),
  //     },
  //     {
  //       path: "",
  //       redirectTo: "/tabs/tab1",
  //       pathMatch: "full",
  //     },
  //   ],
  // },
  // {
  //   path: "",
  //   redirectTo: "/tabs/tab1",
  //   pathMatch: "full",
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
