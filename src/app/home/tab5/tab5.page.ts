import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/shared/authentication.service";

@Component({
  selector: "app-tab5",
  templateUrl: "./tab5.page.html",
  styleUrls: ["./tab5.page.scss"],
})
export class Tab5Page implements OnInit {
  constructor(public authService: AuthenticationService) {}

  ngOnInit() {}
}
