import { Component, OnInit, ViewChild } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import {
  ActionSheetController,
  IonInfiniteScroll,
  MenuController,
} from "@ionic/angular";
import { Observable, Subscription } from "rxjs";
import { filter, take } from "rxjs/operators";
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
  public posts: Array<Post> = null;
  private postResultSub: Subscription; // Used when user adds new post
  private editedPostResultSub: Subscription;
  private user: User;
  @ViewChild(IonInfiniteScroll, { static: false })
  infiniteScroll: IonInfiniteScroll;
  items$: Observable<Post[]>;
  loaded = false;
  private lastPageReachedSub: Subscription;

  constructor(
    public menuCtrl: MenuController,
    private postsService: PostsService,
    public timeHelper: TimeHelperService,
    public router: Router,
    public actionSheetController: ActionSheetController,
    public authService: AuthenticationService
  ) {}

  ngOnDestroy() {
    if (this.lastPageReachedSub) {
      this.lastPageReachedSub.unsubscribe();
    }
    if (this.postResultSub) {
      this.postResultSub.unsubscribe();
    }
    if (this.editedPostResultSub) {
      this.editedPostResultSub.unsubscribe();
    }
  }

  ngOnInit() {
    this.postResultSub = this.postsService.getPostResult().subscribe((data) => {
      // triggered when user adds post
      if (data) {
        this.postsService.nullifyNextQueryAfter();
        this.infiniteScroll.disabled = false;
        this.postsService.fetch(true);
      }
    });

    this.editedPostResultSub = this.postsService // triggered when user edits post
      .getEditedPostResult()
      .subscribe((data) => {
        if (data) {
          this.updateNewEditedPost(data);
        }
      });

    this.getUserData(); // get user data

    this.items$ = this.postsService.watchItems(); // get posts

    this.items$.subscribe((posts) => {
      // link posts to component variable to modify
      this.posts = posts;
    });

    this.lastPageReachedSub = this.postsService // sub for when there are no more posts
      .watchLastPageReached()
      .subscribe((reached: boolean) => {
        if (reached && this.infiniteScroll) {
          this.loaded = true;
          this.infiniteScroll.disabled = true;
        }
      });

    this.postsService
      .watchItems()
      .pipe(
        filter((flats) => flats !== undefined),
        take(1)
      )
      .subscribe((_items: Post[]) => {
        this.loaded = true;
      });

    this.postsService.fetch(false); // fetch first posts
  }

  async fetchPosts($event) {
    // used by infinite scroll to fetch more posts
    await this.postsService.fetch(false);
    $event.target.complete();
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

  async presentActionSheet(post: Post) {
    // present action menu for editing post
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
                    // this.postsService.unsubscribe();
                    this.removeDeletedItemFromPosts(post);
                    // this.deleteItem = post.postId;
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

  updateNewEditedPost(id: string) {
    // update post after new post has been saved to db
    this.postsService.getPost(id).subscribe(
      (post: Post) => {
        this.posts.forEach((p, i) => {
          if (p.postId === id) {
            this.posts[i] = { ...post };
            return;
          }
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  removeDeletedItemFromPosts(post: Post) {
    // remove post from component after it has been deleted from database
    this.posts.forEach((p, i) => {
      if (post.postId === p.postId) {
        this.posts.splice(i, 1);
        return;
      }
    });
  }

  likeEvent(event: { like: boolean; post: Post }) {
    // update like event
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

  toggleSideMenu() {
    this.menuCtrl.toggle(); //Add this method to your button click function
  }
}
