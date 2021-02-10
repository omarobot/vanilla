import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable, Subject } from "rxjs";
import { Post } from "../models/post";

@Injectable({
  providedIn: "root",
})
export class PostsService {
  constructor(private firestore: AngularFirestore) {}

  getPosts(): Observable<any> {
    return this.firestore.collection("posts").get();
  }

  addPost(pictures: Array<string>): Promise<any> {
    const post: Post = {
      id: "",
      displayName: "Omar Saravia",
      location: "Los Angeles",
      content: "Hello World",
      likesCount: 0,
      commentsCount: 0,
      timeStamp: Date.now(),
      pictures: pictures,
    };

    return this.firestore.collection("posts").add(post);
  }
}
