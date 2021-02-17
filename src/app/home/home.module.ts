import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TabsPageRoutingModule } from "./home-routing.module";
import { HomePage } from "./home.page";
import { PostModalComponent } from "./post/post-modal/post-modal.component";
import { GetUserResolver } from "./get-user.resolver";

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, TabsPageRoutingModule],
  declarations: [HomePage],
  providers: [GetUserResolver],
})
export class HomePageModule {}
