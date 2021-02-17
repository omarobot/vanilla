import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "../shared/services/authentication.service";

@Injectable()
export class GetUserResolver implements Resolve<any> {
  constructor(private authService: AuthenticationService) {}

  resolve(): Promise<any> {
    return this.authService.getUser();
  }
}
