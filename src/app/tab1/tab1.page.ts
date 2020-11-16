import { Component } from "@angular/core";
import { Post } from "../shared/post";
import { PostService } from "../shared/post.service";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  posts = [];

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.fetchPosts();
    let postRes = this.postService.getPostList();
    postRes.snapshotChanges().subscribe((res) => {
      this.posts = [];
      res.forEach((item) => {
        let a = item.payload.toJSON();
        a["$key"] = item.key;
        this.posts.push(a as Post);
      });
    });
  }

  fetchPosts() {
    this.postService
      .getPostList()
      .valueChanges()
      .subscribe((res) => {
        console.log(res);
      });
  }

  deletePost(id) {
    console.log(id);
    if (window.confirm("Do you really want to delete?")) {
      this.postService.deletePost(id);
    }
  }
}
