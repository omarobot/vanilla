import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Post } from "../../shared/models/post";

@Component({
  selector: "app-like-button",
  templateUrl: "./like-button.component.html",
})
export class LikeButtonComponent implements OnInit {
  liked: boolean = false;
  @Input() uid: string;
  @Input() post: Post;
  @Input() label: boolean;
  @Output() likeEvent: EventEmitter<{
    like: boolean;
    post: Post;
  }> = new EventEmitter<{ like: boolean; post: Post }>();
  labelString: string = "Likes";

  constructor() {}

  ngOnInit() {
    if (this.post.userLikes && this.post.userLikes.includes(this.uid)) {
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
    this.likeEvent.emit({ like: true, post: this.post });
  }

  unlike() {
    this.likeEvent.emit({ like: false, post: this.post });
  }
}
