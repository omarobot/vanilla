import { isPlatformServer } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UserProfileModel } from "src/app/home/profile/profile.model";
import { UserFriendsModel } from "src/app/home/profile/user-friends.model";
import { DataStore } from "src/app/shell/data-store";
import { TransferStateHelper } from "../utils/transfer-state-helper";
// import { UserProfileModel } from './profile/user-profile.model';

@Injectable({
  providedIn: "root",
})
export class UserService {
  private profileDataStore: DataStore<UserProfileModel>;
  private friendsDataStore: DataStore<UserFriendsModel>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private transferStateHelper: TransferStateHelper,
    private http: HttpClient
  ) {}

  public getProfileDataSource(): Observable<UserProfileModel> {
    const rawDataSource = this.http
      .get<UserProfileModel>("./assets/sample-data/user/user-profile.json")
      .pipe(
        map((data: UserProfileModel) => {
          // Note: HttpClient cannot know how to instantiate a class for the returned data
          // We need to properly cast types from json data
          const profile = new UserProfileModel();

          // The Object.assign() method copies all enumerable own properties from one or more source objects to a target object.
          // Note: If you have non-enummerable properties, you can try a spread operator instead. profile = {...data};
          // (see: https://scotch.io/bar-talk/copying-objects-in-javascript#toc-using-spread-elements-)
          Object.assign(profile, data);

          return profile;
        })
      );

    // This method tapps into the raw data source and stores the resolved data in the TransferState, then when
    // transitioning from the server rendered view to the browser, checks if we already loaded the data in the server to prevent
    // duplicate http requests.
    const cachedDataSource = this.transferStateHelper.checkDataSourceState(
      "profile-state",
      rawDataSource
    );

    return cachedDataSource;
  }

  public getProfileStore(
    dataSource: Observable<UserProfileModel>
  ): DataStore<UserProfileModel> {
    // Use cache if available
    if (!this.profileDataStore) {
      // Initialize the model specifying that it is a shell model
      const shellModel: UserProfileModel = new UserProfileModel();
      this.profileDataStore = new DataStore(shellModel);

      // If running in the server, then don't add shell to the Data Store
      // If we already loaded the Data Source in the server, then don't show a shell when transitioning back to the broswer from the server
      if (isPlatformServer(this.platformId) || dataSource["ssr_state"]) {
        // Trigger loading mechanism with 0 delay (this will prevent the shell to be shown)
        this.profileDataStore.load(dataSource, 0);
      } else {
        // On browser transitions
        // Trigger the loading mechanism (with shell)
        this.profileDataStore.load(dataSource);
      }
    }

    return this.profileDataStore;
  }
}
