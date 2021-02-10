import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
import { ModalController } from "@ionic/angular";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
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
    private postsService: PostsService
  ) {}

  ngOnInit() {}

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
      .addPost(this.imageURLS)
      .then((data: any) => {
        console.log(data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  // uploadImage(event) {
  //   this.loading = true;
  //   if (event.target.files && event.target.files[0]) {
  //     var reader = new FileReader();

  //     reader.readAsDataURL(event.target.files[0]);
  //     // For Preview Of Image
  //     (reader.onload = (e: any) => {
  //       // called once readAsDataURL is completed
  //       this.url = e.target.result;

  //       // For Uploading Image To Firebase
  //       const fileraw = event.target.files[0];
  //       console.log(fileraw);
  //       const filePath =
  //         "/Image/" +
  //         this.newImage.id +
  //         "/" +
  //         "Image" +
  //         (Math.floor(1000 + Math.random() * 9000) + 1);
  //       const result = this.SaveImageRef(filePath, fileraw);
  //       const ref = result.ref;
  //       result.task.then((a) => {
  //         ref.getDownloadURL().subscribe((a) => {
  //           console.log(a);

  //           this.newImage.image = a;
  //           this.loading = false;
  //         });

  //         this.afs.collection("Image").doc(this.newImage.id).set(this.newImage);
  //       });
  //     }),
  //       (error) => {
  //         alert("Error");
  //       };
  //   }
  // }

  // SaveImageRef(filePath, file) {
  //   return {
  //     task: this.storage.upload(filePath, file),
  //     ref: this.storage.ref(filePath),
  //   };
  // }

  close() {
    this.modalService.close();
  }
}
