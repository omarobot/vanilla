import { Injectable } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";
import * as moment from "moment";

@Injectable({
  providedIn: "root",
})
export class TimeHelperService {
  constructor(private router: Router) {}

  getRelativeTime(date) {
    // const d = new Date(date * 1000);
    return moment(date).fromNow();
  }
}
