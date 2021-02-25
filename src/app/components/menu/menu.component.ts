import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  // openFirst() {
  //   this.menu.enable(true, "first");
  //   this.menu.open("first");
  // }

  // openEnd() {
  //   this.menu.open("end");
  // }

  // openCustom() {
  //   this.menu.enable(true, "custom");
  //   this.menu.open("custom");
  // }
}
