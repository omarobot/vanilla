import { Component, OnInit } from "@angular/core";

import { AngularFirestore } from "@angular/fire/firestore";
import { MenuController } from "@ionic/angular";
import { PostService } from "src/app/shared/services/post.service";
@Component({
  selector: "app-feed",
  templateUrl: "./feed.page.html",
  styleUrls: ["./feed.page.scss"],
})
export class FeedPage implements OnInit {
  public feeds: Array<any> = [];
  constructor(
    private firestore: AngularFirestore,
    public menuCtrl: MenuController,
    public postService: PostService
  ) {}

  toggleSideMenu() {
    console.log("call toggleSideMenu ");
    this.menuCtrl.toggle(); //Add this method to your button click function
  }
  ngOnInit() {
    this.postService.getJSON().subscribe(
      (data: any) => {
        console.log(data);
        let keys = Object.keys(data);
        let array = [];
        keys.forEach((key) => {
          array.push(data[key]);
        });

        this.feeds = [...array];
      },
      (error: any) => {
        console.log(error);
      }
    );
    console.log("start");
    // this.feeds = this.firestore.collection<any>("layout_feed").valueChanges();
  }
  getFeed() {
    console.log("start getCategory");
  }
}
