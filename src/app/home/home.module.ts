import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TabsPageRoutingModule } from "./home-routing.module";
import { HomePage } from "./home.page";
import { PostModalComponent } from "./tab3/post-modal/post-modal.component";

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, TabsPageRoutingModule],
  declarations: [HomePage],
})
export class HomePageModule {}
