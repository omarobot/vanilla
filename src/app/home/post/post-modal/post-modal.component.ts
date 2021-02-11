import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { User } from "src/app/shared/models/user";
import { AuthenticationService } from "src/app/shared/services/authentication.service";
import { ModalService } from "src/app/shared/services/modal.service";
import { PostsService } from "src/app/shared/services/posts.service";

export interface Image {
  id: string;
  image: string;
}

@Component({
  selector: "app-post-modal",
  templateUrl: "./post-modal.component.html",
  styleUrls: ["./post-modal.component.scss"],
})
export class PostModalComponent implements OnInit {
  // title = "cloudsSorage";
  // selectedFile: File = null;
  user: User;
  inputValue: string = "";
  imageURLS: Array<any> = [];
  downloadURL: Observable<string>;
  // display$: Observable<boolean>;

  // url: any;
  // newImage: Image = {
  //   id: this.afs.createId(),
  //   image: "",
  // };
  // loading: boolean = false;

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    public modalService: ModalService,
    private postsService: PostsService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    this.authService
      .getUserInfo()
      .then((user) => {
        console.log(user);
        this.user = user;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onFileSelected(event) {
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
          });
        })
      )
      .subscribe((url) => {
        if (url) {
          console.log(url);
        }
      });
  }

  addPost() {
    this.postsService
      .addPost(this.imageURLS, this.user, this.inputValue)
      .then((data: any) => {
        console.log(data);
        this.postsService.triggerPostResult(true);
        this.close();
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  inputChange(input) {
    this.inputValue = input.detail.value;
  }

  canPost() {
    return !(this.inputValue.length > 0 || this.imageURLS.length > 0
      ? true
      : false);
  }

  close() {
    this.router.navigate(["home"]);
    this.modalService.close();
  }
}
