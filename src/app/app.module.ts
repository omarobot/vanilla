import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import {
  BrowserModule,
  BrowserTransferStateModule,
} from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

//  firebase imports, remove what you don't require
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import {
  AngularFireStorageModule,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from "@angular/fire/storage";

import { HttpClientModule } from "@angular/common/http";

// environment
import { environment } from "../environments/environment";
import { ComponentsModule } from "./components/components.module";
import { PostModalComponent } from "./home/post/post-modal/post-modal.component";
import { OpenModalGuard } from "./shared/guards/open-modal.guard";
import { PrivacyPolicyPage } from "./privacy-policy/privacy-policy.page";
import { TermsOfServicePage } from "./terms-of-service/terms-of-service.page";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    AppComponent,
    PostModalComponent,
    PrivacyPolicyPage,
    TermsOfServicePage,
  ],
  exports: [],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserTransferStateModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    HttpClientModule,
    ComponentsModule,
    TranslateModule.forRoot(),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    OpenModalGuard,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
