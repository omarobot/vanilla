import { Component, OnInit } from "@angular/core";
import { Post } from "../../shared/models/post";
import { PostService } from "../../shared/services/post.service";
import { ModalController } from "@ionic/angular";
import { LocationFormPage } from "./location/location-form.page";
import { PostsService } from "src/app/shared/services/posts.service";

@Component({
  selector: "app-timeline",
  templateUrl: "timeline.page.html",
  styleUrls: ["timeline.page.scss"],
})
export class TimelinePage implements OnInit {
  posts = [];

  constructor(
    private postService: PostService,
    public modalController: ModalController,
    private postsService: PostsService
  ) {}

  ngOnInit() {
    this.presentModal();
    this.fetchPosts();
    this.getPosts();
    const postRes = this.postService.getPostList();
    postRes.snapshotChanges().subscribe((res) => {
      this.posts = [];
      res.forEach((item) => {
        let a = item.payload.toJSON();
        a["$key"] = item.key;
        this.posts.push(a as Post);
      });
    });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: LocationFormPage,
      cssClass: "my-custom-class",
    });
    return await modal.present();
  }

  getPosts() {
    this.postsService.getPosts().subscribe(
      (posts: any) => {
        console.log(posts);

        posts.docs.forEach((doc) => {
          // this.myArray.push(doc.data());
          console.log(doc.data());
        });
      },
      (error: any) => {
        console.log(error);
      }
    );
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
