import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Post } from "src/app/shared/models/post";
import { User } from "src/app/shared/models/user";
import { AuthenticationService } from "src/app/shared/services/authentication.service";
import { PostsService } from "src/app/shared/services/posts.service";
import { TimeHelperService } from "src/app/shared/utils/time-helper.service";

@Component({
  selector: "app-view-post",
  templateUrl: "./view-post.page.html",
  styleUrls: ["./view-post.page.scss"],
})
export class ViewPostPage implements OnInit {
  id: string;
  user: User;
  post: Post;
  isLoaded: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    public timeHelper: TimeHelperService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    console.log(this.id);
    this.getUser();
  }

  getUser() {
    this.authService
      .getUserData()
      .then((user: User) => {
        this.user = user;
        this.getPost();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getPost() {
    this.postsService.getPost(this.id).subscribe(
      (data) => {
        console.log(data.data());
        this.post = { ...data.data() };
        this.post.postId = data.id;
        this.isLoaded = true;
      },
      (error) => {
        console.log(error);
        this.isLoaded = true;
      }
    );
  }

  likeEvent(event: { like: boolean; post: Post }) {
    // update like event
    let newPost: Partial<Post> = {};
    newPost.postId = event.post.postId;
    newPost.likeCount = event.post.likeCount;

    if (event.like) {
      newPost.likeCount++;
      event.post.likeCount++;
      if (event.post.userLikes) {
        event.post.userLikes.push(this.user.uid);
        newPost.userLikes = event.post.userLikes;
      }
    } else {
      if (event.post.userLikes) {
        newPost.userLikes = event.post.userLikes.filter(
          (x) => x !== this.user.uid
        );
      }
      event.post.likeCount--;
      newPost.likeCount--;
    }
    this.postsService
      .updateLikeCount(newPost)
      .then((data) => {
        console.log("Updated like count..");
        console.log(data);
        this.updateLikeEditedPost(newPost.postId);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateLikeEditedPost(id: string) {
    // update post after new post has been saved to db
    this.postsService.getPost(id).subscribe(
      (post: any) => {
        this.post = { ...post.data() };
        this.post.postId = post.id;
        console.log(this.post);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
