import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProfilePage } from "./profile.page";
import { UserProfileResolver } from "./profile.resolver";

const routes: Routes = [
  {
    path: "",
    component: ProfilePage,
    resolve: {
      data: UserProfileResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
