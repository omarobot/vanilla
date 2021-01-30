import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "src/app/shared/services/user.service";

import { DataStore } from "../../shell/data-store";
import { UserProfileModel } from "./profile.model";

@Injectable()
export class UserProfileResolver
  implements Resolve<DataStore<UserProfileModel>> {
  constructor(private userService: UserService) {}

  resolve(): DataStore<UserProfileModel> {
    const dataSource: Observable<UserProfileModel> = this.userService.getProfileDataSource();
    const dataStore: DataStore<UserProfileModel> = this.userService.getProfileStore(
      dataSource
    );

    return dataStore;
  }
}
