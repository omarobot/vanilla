import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable, Subject } from "rxjs";
import { Post } from "../models/post";
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
    return this.firestore.collection("posts").get();
  }

  addPost(images: Array<string>, user: User, input: string): Promise<any> {
    const post: Post = {
      displayName: user.displayName,
      location: this.locationService.location,
      content: input,
      likeCount: 0,
      commentCount: 0,
      timeStamp: Date.now(),
      images: images,
      profileImage: user.photoURL,
    };

    return this.firestore.collection("posts").add(post);
  }

  getPostResult(): Observable<any> {
    return this.postResult.asObservable();
  }

  triggerPostResult(result: boolean) {
    this.postResult.next(result);
  }
}
