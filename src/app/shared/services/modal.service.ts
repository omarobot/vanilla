import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class ModalService {
  private display: Subject<{ open: boolean; id: string }> = new Subject<{
    open: boolean;
    id: any;
  }>();
  watch(): Observable<{ open: boolean; id: string }> {
    return this.display.asObservable();
  }
  open(id: any) {
    this.display.next({ open: true, id: id });
  }
  close() {
    console.log("closing...");
    this.display.next({ open: false, id: null });
  }
}
