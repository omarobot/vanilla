import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IonTextarea } from "@ionic/angular";
import { Comment } from "src/app/shared/models/comment";
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
  private id: string;
  private user: User;
  public post: Post;
  public isLoaded: boolean = false;
  public inputValue: string;
  public comments: Array<Comment> = [];
  public uploadedImages: Array<string> = [];
  @ViewChild("textref", { read: IonTextarea }) textRef: IonTextarea;
  public commentRef: Comment;
  public addingSubComment: boolean = false;

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
        this.getComments();
      },
      (error) => {
        console.log(error);
        this.isLoaded = true;
      }
    );
  }

  getComments() {
    this.postsService.getComments(this.post.postId).subscribe(
      (data) => {
        data.forEach((c) => {
          let comment: Comment = c.data();
          comment.commentId = c.id;
          comment.subComments = [];
          this.comments.push(comment);
        });
        console.log(this.comments);
        this.getSubComments();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getSubComments() {
    this.comments.forEach((comment) => {
      if (comment.subCommentCount && comment.subCommentCount > 0) {
        this.postsService.getSubComments(comment).subscribe(
          (data) => {
            console.log(data);
            data.forEach((element) => {
              let c: Comment = element.data();
              c.commentId = element.id;
              comment.subComments.push(c);
            });
          },
          (error) => {}
        );
      }
    });
  }

  async addCommentFocus() {
    this.inputValue = "";
    this.inputValue = "@" + this.post.displayName + " ";
    await this.textRef.setFocus();
  }

  async addSubCommentFocus(comment: Comment) {
    this.inputValue = "";
    this.inputValue = "@" + this.post.displayName + " ";
    this.addingSubComment = true;
    this.commentRef = comment;
    await this.textRef.setFocus();
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
        this.updateLikeEditedPost(newPost.postId);
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

  likeCommentEvent(event: { like: boolean; post: Comment }) {
    console.log("Liking comment...");
  }

  likeSubCommentEvent(event: { like: boolean; post: Comment }) {
    console.log("Liking sub-comment...");
  }
  inputChange(input) {
    this.inputValue = input.detail.value;
  }

  send() {
    if (this.addingSubComment) {
      this.addSubComment();
    } else {
      this.addComment();
    }
  }

  addComment() {
    this.postsService
      .addComment(this.user, this.post, this.inputValue, this.uploadedImages)
      .then((comment: any) => {
        this.inputValue = undefined;
        this.attachNewComment(comment.id);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  attachNewComment(id: string) {
    this.postsService.getComment(this.post, id).subscribe(
      (comment) => {
        let newComment: Comment = comment.data();
        newComment.commentId = comment.id;
        this.comments.push(newComment);
      },
      (error) => {}
    );
  }

  addSubComment() {
    this.postsService
      .addSubComment(
        this.user,
        this.commentRef,
        this.inputValue,
        this.uploadedImages
      )
      .then((comment: any) => {
        this.inputValue = undefined;
        let partial: Partial<Comment> = {};
        partial.subCommentCount = this.commentRef.subCommentCount
          ? this.commentRef.subCommentCount++
          : 1;
        this.postsService
          .updateCommentCommentCount(
            this.post.postId,
            this.commentRef.commentId,
            partial
          )
          .then((data) => {
            this.attachNewSubComment(comment.id);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  attachNewSubComment(id: string) {
    this.postsService
      .getSubComment(this.post.postId, this.commentRef.commentId, id)
      .subscribe(
        (com) => {
          console.log(com);
          let newCom: Comment = com.data();
          newCom.commentId = com.id;
          this.comments.forEach((c) => {
            if (c.commentId === newCom.parentCommentId) {
              c.subComments.push(newCom);
            }
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  deleteComment(comment: Comment) {
    this.postsService.deleteComment(comment).then(
      () => {
        this.comments.forEach((c, i) => {
          if (c.commentId === comment.commentId) {
            this.comments.splice(i, 1);
            return;
          }
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
