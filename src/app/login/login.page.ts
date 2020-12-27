import { Component, OnInit } from "@angular/core";
import { PostService } from "../shared/post.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  constructor(public service: PostService) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.service.getUser().subscribe((data: any) => {
      console.log(data);
    });
  }
}
