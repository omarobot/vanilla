import { Component, OnInit, ViewChild } from "@angular/core";
import { Post } from "../../shared/models/post";
import { IonInfiniteScroll, ModalController } from "@ionic/angular";
import { LocationFormPage } from "./location/location-form.page";
import {
  PostsService,
  PostWrapper,
} from "src/app/shared/services/posts.service";
import { LocationService } from "src/app/shared/services/location.service";
import { Observable, Subscription } from "rxjs";
import { filter, take } from "rxjs/operators";

@Component({
  selector: "app-timeline",
  templateUrl: "timeline.page.html",
  styleUrls: ["timeline.page.scss"],
})
export class TimelinePage implements OnInit {
  // privaposts = [];
  private location: string;
  public lastVisible: any;

  @ViewChild(IonInfiniteScroll, { static: false })
  infiniteScroll: IonInfiniteScroll;

  items$: Observable<PostWrapper[]>;

  loaded = false;

  private lastPageReachedSub: Subscription;

  constructor(
    private locationService: LocationService,
    public modalController: ModalController,
    public postsService: PostsService
  ) {}

  ngOnDestroy() {
    if (this.lastPageReachedSub) {
      this.lastPageReachedSub.unsubscribe();
    }
  }

  ngOnInit() {
    this.items$ = this.postsService.watchItems();

    this.lastPageReachedSub = this.postsService
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
      .subscribe((_items: PostWrapper[]) => {
        this.loaded = true;
      });

    this.location = this.locationService.location;
    if (!this.location) {
      this.presentModal();
    }
    // this.presentModal();
    // this.fetchPosts();
    // const postRes = this.postService.getPostList();
    // postRes.snapshotChanges().subscribe((res) => {
    //   this.posts = [];
    //   res.forEach((item) => {
    //     let a = item.payload.toJSON();
    //     a["$key"] = item.key;
    //     this.posts.push(a as Post);
    //   });
    // });
    this.postsService.find();
    // this.postsService.paginate("first", null).subscribe(
    //   (data) => {
    //     this.lastVisible = data.docs[data.docs.length - 1];
    //     data.forEach((doc: any) => {
    //       console.log(doc.data());
    //       console.log(doc.id);
    //     });
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }

  async findNext($event) {
    setTimeout(async () => {
      await this.postsService.find();
      $event.target.complete();
    }, 500);
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: LocationFormPage,
      cssClass: "my-custom-class",
    });
    return await modal.present();
  }

  loadMore() {
    this.postsService.paginate("next", this.lastVisible).subscribe(
      (data) => {
        this.lastVisible = data.docs[data.docs.length - 1];
        data.forEach((doc: any) => {
          console.log(doc.data());
          console.log(doc.id);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // fetchPosts() {
  //   this.postService
  //     .getPostList()
  //     .valueChanges()
  //     .subscribe((res) => {
  //       console.log(res);
  //     });
  // }

  // deletePost(id) {
  //   console.log(id);
  //   if (window.confirm("Do you really want to delete?")) {
  //     this.postService.deletePost(id);
  //   }
  // }
}
