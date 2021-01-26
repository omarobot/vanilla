import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { ModalService } from "src/app/shared/services/modal.service";
@Injectable()
export class OpenModalGuard implements CanActivate {
  constructor(public modalService: ModalService) {}
  canActivate(): boolean {
    this.modalService.open();
    return false;
  }
}
