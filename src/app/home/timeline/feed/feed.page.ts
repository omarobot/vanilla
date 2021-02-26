import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ActionSheetController, MenuController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { Post } from "src/app/shared/models/post";
import { User } from "src/app/shared/models/user";
import { AuthenticationService } from "src/app/shared/services/authentication.service";
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
  public user: User;

  constructor(
    public menuCtrl: MenuController,
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
    this.postResult = this.postsService.getPostResult().subscribe((data) => {
      if (data) {
        this.getPosts();
      }
    });

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
      buttons.push(
        {
          text: "Edit",
          // icon: "trash",
          handler: () => {
            this.router.navigate(["/home/post"], {
              queryParams: { id: post.postId },
            });
          },
        },
        {
          text: "Delete",
          role: "destructive",
          // icon: "trash",
          handler: () => {
            this.postsService
              .deleteImages(post.images)
              .then((data) => {
                console.log("Deleted images");
                this.postsService
                  .deletePost(post)
                  .then((data) => {
                    console.log(data);
                  })
                  .catch((data) => {
                    console.log(data);
                  });
              })
              .catch((error) => {
                console.log(error);
              });
          },
        }
      );
    }

    buttons.push(
      {
        text: "Share",
        // icon: "share",
        handler: () => {
          console.log("Share clicked");
        },
      },
      {
        text: "Cancel",
        icon: "close",
        role: "cancel",
        handler: () => {
          console.log("Cancel clicked");
        },
      }
    );

    const actionSheet = await this.actionSheetController.create({
      header: "Options",
      // cssClass: "my-custom-class",
      buttons: buttons,
    });
    await actionSheet.present();
  }

  likeEvent(event: { like: boolean; post: Post }) {
    // event.post.likeCount = 0;
    let newPost: Partial<Post> = {};
    newPost.postId = event.post.postId;
    newPost.likeCount = event.post.likeCount;
    // newPost.userLikes = [];

    if (event.like) {
      // event.post.likeCount++;
      newPost.likeCount++;
      if (event.post.userLikes) {
        event.post.userLikes.push(this.user.uid);
        newPost.userLikes = event.post.userLikes;
      }
    } else {
      // event.post.likeCount--;
      if (event.post.userLikes) {
        newPost.userLikes = event.post.userLikes.filter(
          (x) => x !== this.user.uid
        );
      }
      newPost.likeCount--;
    }
    this.postsService
      .updateLikeCount(newPost)
      .then((data) => {
        console.log("Updated like count..");
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
