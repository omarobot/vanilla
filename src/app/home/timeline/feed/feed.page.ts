import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ActionSheetController, MenuController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { Post } from "src/app/shared/models/post";
import { User } from "src/app/shared/models/user";
import { AuthenticationService } from "src/app/shared/services/authentication.service";
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
  public postResult: Subscription; // Used when user adds new post
  private user: User;

  constructor(
    public menuCtrl: MenuController,
    public postService: PostService,
    private postsService: PostsService,
    public timeHelper: TimeHelperService,
    public router: Router,
    public actionSheetController: ActionSheetController,
    public authService: AuthenticationService
  ) {}

  toggleSideMenu() {
    this.menuCtrl.toggle(); //Add this method to your button click function
  }

  ngOnInit() {
    // this.postResult = this.postsService.getPostResult().subscribe((data) => {
    //   if (data) {
    //     this.getPosts();
    //   }
    // });

    this.getUserData();

    this.getPosts();
  }

  getUserData() {
    this.authService
      .getUserData()
      .then((user) => {
        console.log(user);
        this.user = user;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getPosts() {
    this.posts = [];
    this.postsService.getPosts().subscribe(
      (posts: any) => {
        console.log(posts);
        this.posts = [...posts];
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  async presentActionSheet(post: Post) {
    let buttons = [];
    if (post.uid && post.uid === this.user.uid) {
      buttons.push({
        text: "Delete",
        role: "destructive",
        icon: "trash",
        handler: () => {
          this.postsService
            .deletePost(post)
            .then((data) => {
              console.log(data);
            })
            .catch((data) => {
              console.log(data);
            });
        },
      });
    }

    buttons.push({
      text: "Cancel",
      icon: "close",
      role: "cancel",
      handler: () => {
        console.log("Cancel clicked");
      },
    });

    const actionSheet = await this.actionSheetController.create({
      header: "Options",
      cssClass: "my-custom-class",
      buttons: buttons,
    });
    await actionSheet.present();
  }
}
