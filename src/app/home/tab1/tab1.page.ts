import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Post } from "../../shared/post";
import { PostService } from "../../shared/post.service";
import { ModalController } from "@ionic/angular";
import { LocationFormPage } from "./location-form/location-form.page";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  posts = [];

  constructor(
    private postService: PostService,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this.presentModal();
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

  async presentModal() {
    const modal = await this.modalController.create({
      component: LocationFormPage,
      cssClass: "my-custom-class",
    });
    return await modal.present();
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
