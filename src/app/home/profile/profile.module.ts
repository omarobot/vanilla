import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ProfilePageRoutingModule } from "./profile-routing.module";

import { ProfilePage } from "./profile.page";
import { ShellModule } from "src/app/shell/shell.module";
import { TranslateModule } from "@ngx-translate/core";
import { UserProfileResolver } from "./profile.resolver";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    ShellModule,
    TranslateModule,
  ],
  declarations: [ProfilePage],
  providers: [UserProfileResolver],
})
export class ProfilePageModule {}
