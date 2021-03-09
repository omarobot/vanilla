import { Component, Input, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { Observable, Subscription } from "rxjs";
import { finalize } from "rxjs/operators";
import { Post } from "src/app/shared/models/post";
import { Tag } from "src/app/shared/models/tag";
import { User } from "src/app/shared/models/user";
import { AuthenticationService } from "src/app/shared/services/authentication.service";
import { ModalService } from "src/app/shared/services/modal.service";
import { PostsService } from "src/app/shared/services/posts.service";

@Component({
  selector: "app-post-modal",
  templateUrl: "./post-modal.component.html",
  styleUrls: ["./post-modal.component.scss"],
})
export class PostModalComponent implements OnInit {
  @Input() id: any;
  user: User;
  newPost: boolean = true;
  oldPost: Post;
  inputValue: string = "";
  imageURLS: Array<string> = [];
  imageUploadProgress: Array<number> = [];
  disablePost: boolean = false;
  deletedImages: Array<string> = [];
  downloadURL: Observable<string>;
  tags: Array<Tag> = [];
  defaultTags: Array<Tag> = [];

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    public modalService: ModalService,
    private postsService: PostsService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.id) {
      this.newPost = false;
      this.getPost();
    }
    this.getUser();
  }

  getUser() {
    this.authService
      .getUserData()
      .then((user: User) => {
        this.user = user;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getPost() {
    this.postsService.getPost(this.id).subscribe(
      (data) => {
        console.log(data);
        this.oldPost = data.data();
        this.oldPost.postId = data.id;
        this.inputValue = this.oldPost.content;
        this.imageURLS = [...this.oldPost.images];
        this.tags = [...this.oldPost.tags];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openFile(event: any) {
    document.querySelector("input").click();
  }

  onFileSelected(event) {
    this.disablePost = true;
    this.imageUploadProgress.push(0);
    let progressIndex = this.imageUploadProgress.length - 1;
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `profile_pics/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`profile_pics/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url) => {
            if (url) {
              this.imageURLS.push(url);
            }
            console.log(this.imageURLS[this.imageURLS.length - 1]);
            this.disablePost = false;
          });
        })
      )
      .subscribe(
        (url) => {
          console.log(url.bytesTransferred + "/" + url.totalBytes);
          let percentage = url.bytesTransferred / url.totalBytes;
          this.imageUploadProgress[progressIndex] = percentage;
          if (percentage === 1) {
            this.imageUploadProgress.splice(progressIndex, 1);
          }
        },
        (error) => {
          this.disablePost = false;
        }
      );
  }

  addPost() {
    this.postsService
      .addPost(this.imageURLS, this.user, this.inputValue, this.defaultTags)
      .then((data: any) => {
        console.log(data);
        this.postsService.triggerPostResult(true);
        this.close();
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  editPost() {
    console.log("Setting edited post...");

    let post: Partial<Post> = {};
    post.postId = this.oldPost.postId;
    //TODO: Add for TAGS
    if (this.deletedImages.length > 0) {
      // delete images first
      this.postsService
        .deleteImages(this.deletedImages)
        .then((data) => {
          console.log(data);
          post.images = this.imageURLS;
          if (this.oldPost.content !== this.inputValue) {
            // only change content if it was changed
            post.content = this.inputValue;
          }
          this.setEditedPost(post);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      post.content = this.inputValue;
      if (this.oldPost.images.length != this.imageURLS.length) {
        // User added images
        post.images = this.imageURLS;
      }
      this.setEditedPost(post);
    }
  }

  setEditedPost(post: Partial<Post>) {
    this.postsService
      .editPost(post)
      .then((data) => {
        console.log("Edited...");
        console.log(data);
        this.router.navigate(["home"]);
        this.postsService.triggerEditedPostResult(this.id);
        this.modalService.close();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteImage(index: number) {
    this.deletedImages = [
      ...this.deletedImages,
      ...this.imageURLS.splice(index, 1),
    ];
    console.log(this.deletedImages);
  }

  inputChange(input) {
    this.inputValue = input.detail.value;
  }

  canPost() {
    return !(this.inputValue.length > 0 ||
    this.imageURLS.length > 0 ||
    !this.disablePost
      ? true
      : false);
  }

  close() {
    if (this.deletedImages.length > 0) {
      this.postsService
        .deleteImages(this.deletedImages)
        .then((data) => {
          console.log("Deleted images");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    this.router.navigate(["home"]);

    this.modalService.close();
  }
}
