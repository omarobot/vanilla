import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class ModalService {
  private display: Subject<boolean> = new Subject<boolean>();
  watch(): Observable<boolean> {
    return this.display.asObservable();
  }
  open() {
    this.display.next(true);
  }
  close() {
    console.log("closing...");

    this.display.next(false);
  }
}
