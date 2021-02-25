import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Post } from "../../shared/models/post";

@Component({
  selector: "app-like-button",
  templateUrl: "./like-button.component.html",
})
export class LikeButtonComponent implements OnInit {
  liked: boolean = false;
  @Input() post: Post;
  @Output() likeEvent: EventEmitter<{
    like: boolean;
    post: Post;
  }> = new EventEmitter<{ like: boolean; post: Post }>();

  constructor() {}

  ngOnInit() {}

  click() {
    if (this.liked) {
      this.unlike();
    } else {
      this.like();
    }
  }

  like() {
    this.liked = true;
    this.likeEvent.emit({ like: true, post: this.post });
  }

  unlike() {
    this.liked = false;
    this.likeEvent.emit({ like: false, post: this.post });
  }
}
