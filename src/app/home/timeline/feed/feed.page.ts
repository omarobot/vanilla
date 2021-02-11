import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MenuController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { Post } from "src/app/shared/models/post";
import { PostService } from "src/app/shared/services/post.service";
import { PostsService } from "src/app/shared/services/posts.service";
import { TimeHelperService } from "src/app/shared/utils/time-helper.service";

@Component({
  selector: "app-feed",
  templateUrl: "./feed.page.html",
  styleUrls: ["./feed.page.scss"],
})
export class FeedPage implements OnInit {
  public posts: Array<Post> = [];
  public postResult: Subscription;

  constructor(
    public menuCtrl: MenuController,
    public postService: PostService,
    private postsService: PostsService,
    public timeHelper: TimeHelperService,
    public router: Router
  ) {}

  toggleSideMenu() {
    this.menuCtrl.toggle(); //Add this method to your button click function
  }

  ngOnInit() {
    // this.postService.getJSON().subscribe(
    //   (data: any) => {
    //     console.log(data);
    //     let keys = Object.keys(data);
    //     let array = [];
    //     keys.forEach((key) => {
    //       array.push(data[key]);
    //     });

    //     this.posts = [...array];
    //   },
    //   (error: any) => {
    //     console.log(error);
    //   }
    // );
    this.postResult = this.postsService.getPostResult().subscribe((data) => {
      if (true) {
        this.getPosts();
      }
    });
    this.getPosts();
  }

  getPosts() {
    this.posts = [];
    this.postsService.getPosts().subscribe(
      (posts: any) => {
        console.log(posts);
        posts.docs.forEach((doc) => {
          this.posts.push(doc.data());
          console.log(doc.data());
        });
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
