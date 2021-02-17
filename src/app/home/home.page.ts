import { importExpr } from "@angular/compiler/src/output/output_ast";
import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../shared/services/authentication.service";

@Component({
  selector: "app-tabs",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  constructor(public authService: AuthenticationService) {}

  ngOnInit() {}
}
