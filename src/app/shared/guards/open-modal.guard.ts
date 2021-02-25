import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";

import { ModalService } from "src/app/shared/services/modal.service";
@Injectable()
export class OpenModalGuard implements CanActivate {
  constructor(public modalService: ModalService, public router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot
  ): boolean {
    console.log(route.queryParams.id);
    this.modalService.open(route.queryParams.id);
    return false;
  }
}
