import { Component, HostBinding, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AlertController, ModalController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { switchMap } from "rxjs/operators";
import { AuthenticationService } from "src/app/shared/services/authentication.service";
import { UserProfileModel } from "./user-profile.model";
import {
  IResolvedRouteData,
  ResolverHelper,
} from "../../shared/utils/resolver-helper";

@Component({
  selector: "app-tab5",
  templateUrl: "./tab5.page.html",
  styleUrls: [
    "./tab5.page.scss",
    // './styles/user-profile.page.scss',
    "./styles/user-profile.shell.scss",
    "./styles/user-profile.ios.scss",
    "./styles/user-profile.md.scss",
  ],
})
export class Tab5Page {
  // // Gather all component subscription in one place. Can be one Subscription or multiple (chained using the Subscription.add() method)
  // subscriptions: Subscription;
  // profile: UserProfileModel;
  // available_languages = [];
  // translations;
  // @HostBinding("class.is-shell") get isShell() {
  //   return this.profile && this.profile.isShell ? true : false;
  // }
  // constructor(
  //   public authService: AuthenticationService,
  //   public modalController: ModalController,
  //   private route: ActivatedRoute,
  //   public translate: TranslateService,
  //   public alertController: AlertController
  // ) {}
  // ngOnInit(): void {
  //   this.subscriptions = this.route.data
  //     .pipe(
  //       // Extract data for this page
  //       switchMap((resolvedRouteData: IResolvedRouteData<UserProfileModel>) => {
  //         return ResolverHelper.extractData<UserProfileModel>(
  //           resolvedRouteData.data,
  //           UserProfileModel
  //         );
  //       })
  //     )
  //     .subscribe(
  //       (state) => {
  //         this.profile = state;
  //         // get translations for this page to use in the Language Chooser Alert
  //         this.getTranslations();
  //       },
  //       (error) => console.log(error)
  //     );
  //   this.translate.onLangChange.subscribe(() => this.getTranslations());
  // }
  // NOTE: Ionic only calls ngOnDestroy if the page was popped (ex: when navigating back)
  // Since ngOnDestroy might not fire when you navigate from the current page, use ionViewWillLeave to cleanup Subscriptions
  // ionViewWillLeave(): void {
  //   this.subscriptions.unsubscribe();
  // }
  // getTranslations() {
  //   // get translations for this page to use in the Language Chooser Alert
  //   this.translate
  //     .getTranslation(this.translate.currentLang)
  //     .subscribe((translations) => (this.translations = translations));
  // }
  // async openLanguageChooser() {
  //   this.available_languages = this.languageService.getLanguages()
  //   .map(item =>
  //     ({
  //       name: item.name,
  //       type: 'radio',
  //       label: item.name,
  //       value: item.code,
  //       checked: item.code === this.translate.currentLang
  //     })
  //   );
  //   const alert = await this.alertController.create({
  //     header: this.translations.SELECT_LANGUAGE,
  //     inputs: this.available_languages,
  //     cssClass: 'language-alert',
  //     buttons: [
  //       {
  //         text: this.translations.CANCEL,
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: () => {}
  //       }, {
  //         text: this.translations.OK,
  //         handler: (data) => {
  //           if (data) {
  //             this.translate.use(data);
  //           }
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }
}
