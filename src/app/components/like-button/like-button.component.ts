import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Post } from "../../shared/models/post";
import { Comment } from "../../shared/models/comment";

@Component({
  selector: "app-like-button",
  templateUrl: "./like-button.component.html",
})
export class LikeButtonComponent implements OnInit {
  liked: boolean = false;
  @Input() uid: string;
  @Input() post: Post; // host passes post if determing post likes
  @Input() comment: Comment; // host passes comment in determinging comment likes
  @Input() label: boolean;
  @Input() iconOnly: boolean;
  @Input() button: boolean;
  @Output() likeEvent: EventEmitter<{
    like: boolean;
    post: Post | Comment;
  }> = new EventEmitter<{ like: boolean; post: Post | Comment }>();
  labelString: string = "Likes";

  constructor() {}

  ngOnInit() {
    if (
      this.post &&
      this.post.userLikes &&
      this.post.userLikes.includes(this.uid)
    ) {
      this.liked = true;
    } else if (
      this.comment &&
      this.comment.userLikes &&
      this.comment.userLikes.includes(this.uid)
    ) {
      this.liked = true;
    }
  }

  click() {
    this.liked = !this.liked;
    if (this.liked) {
      this.like();
    } else {
      this.unlike();
    }
  }

  like() {
    if (this.post) {
      // if liking post, else liked comment
      this.likeEvent.emit({ like: true, post: this.post });
    } else {
      this.likeEvent.emit({ like: true, post: this.post });
    }
  }

  unlike() {
    // if unliking post, else unliking comment
    if (this.post) {
      this.likeEvent.emit({ like: false, post: this.post });
    } else {
      this.likeEvent.emit({ like: false, post: this.comment });
    }
  }
}
