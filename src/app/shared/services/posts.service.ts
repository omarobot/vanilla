import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
import { promise } from "protractor";
import { Observable, Subject } from "rxjs";
import { Post } from "../models/post";
import { Tag } from "../models/tag";
import { User } from "../models/user";
import { LocationService } from "./location.service";

@Injectable({
  providedIn: "root",
})
export class PostsService {
  constructor(
    private firestore: AngularFirestore,
    public locationService: LocationService,
    private storage: AngularFireStorage
  ) {}

  public postResult: Subject<any> = new Subject<any>();

  // getPosts(): Observable<any> {
  //   return this.firestore
  //     .collection("posts")
  //     .valueChanges({ idField: "postId" });
  // }

  getPosts(): Observable<any> {
    return this.firestore
      .collection("posts", (ref) => ref.orderBy("timeStamp", "desc").limit(10))
      .valueChanges({ idField: "postId" });
  }

  // getPost(): Observable<any> {
  //   return this.firestore.collection("posts").doc()
  // }

  getPost(id: string): Observable<any> {
    console.log("Getting post " + id);

    return this.firestore
      .collection("posts")
      .doc(id)
      .valueChanges({ idField: "postId" });
    // snapshot.subscribe((data) => {
    //   console.log(data.data());
    // });
    //   .toPromise();
    // console.log(snapshot);

    // const data = snapshot.data();
    // console.log(data);
  }

  addPost(
    images: Array<string>,
    user: User,
    input: string,
    tags: Array<Tag>
  ): Promise<any> {
    const post: Post = {
      displayName: user.displayName,
      uid: user.uid,
      location: this.locationService.location,
      content: input,
      likeCount: 0,
      commentCount: 0,
      timeStamp: Date.now(),
      images: images,
      profileImage: user.photoURL,
      tags: tags,
      userLikes: [],
    };

    return this.firestore.collection("posts").add(post);
  }

  editPost(post: Partial<Post>): Promise<any> {
    return this.firestore.collection("posts").doc(post.postId).update(post);
  }

  deletePost(post: Post) {
    return this.firestore.collection("posts").doc(post.postId).delete();
  }

  updateLikeCount(post: Partial<Post>) {
    return this.firestore.collection("posts").doc(post.postId).update(post);
  }

  deleteImages(urls: Array<string>): Promise<any> {
    var promise = new Promise((resolve, reject) => {
      let error: boolean = false;
      urls.forEach((url) => {
        var fileRef = this.storage.refFromURL(url);
        console.log(fileRef);
        fileRef.delete().subscribe(
          (data) => {
            console.log("Deleted...");
          },
          (error) => {
            error = true;
            console.log(error);
          }
        );
      });

      if (error) {
        reject("error");
      } else {
        resolve("done");
      }
    });
    return promise;
  }

  getPostResult(): Observable<any> {
    return this.postResult.asObservable();
  }

  triggerPostResult(result: boolean) {
    this.postResult.next(result);
  }
}
