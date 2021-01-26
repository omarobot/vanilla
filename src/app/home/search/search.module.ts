import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SearchPage } from "./search.page";

import { SearchPageRoutingModule } from "./search-routing.module";
import { PlacesComponent } from "./places/places.component";
import { EventsComponent } from "./events/events.component";

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, SearchPageRoutingModule],
  declarations: [SearchPage, PlacesComponent, EventsComponent],
})
export class SearchPageModule {}
