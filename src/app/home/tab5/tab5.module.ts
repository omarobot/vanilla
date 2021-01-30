import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { Tab5PageRoutingModule } from "./tab5-routing.module";

import { Tab5Page } from "./tab5.page";
import { ShellModule } from "src/app/shell/shell.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab5PageRoutingModule,
    ShellModule,
    TranslateModule,
  ],
  declarations: [Tab5Page],
})
export class Tab5PageModule {}
