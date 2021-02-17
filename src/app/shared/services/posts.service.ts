import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
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
    public locationService: LocationService
  ) {}

  public postResult: Subject<any> = new Subject<any>();

  getPosts(): Observable<any> {
    return this.firestore
      .collection("posts")
      .valueChanges({ idField: "postId" });
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
    };

    return this.firestore.collection("posts").add(post);
  }

  deletePost(post: Post) {
    return this.firestore.collection("posts").doc(post.postId).delete();
  }

  getPostResult(): Observable<any> {
    return this.postResult.asObservable();
  }

  triggerPostResult(result: boolean) {
    this.postResult.next(result);
  }
}
