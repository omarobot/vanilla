import { Injectable } from "@angular/core";
import { Post } from "../models/post";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from "@angular/fire/database";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PostService {
  postListRef: AngularFireList<any>;
  postRef: AngularFireObject<any>;

  res: any;

  BASE_URL = environment.apiURL;

  constructor(private db: AngularFireDatabase, private http: HttpClient) {}

  // getUser() {
  //   this.http.get('https://us-central1-vanilla-2ca78.cloudfunctions.net/api/name')
  // }

  getUser() {
    console.log(this.BASE_URL);

    return this.http.get(this.BASE_URL + "/name");
  }

  public getJSON(): Observable<any> {
    return this.http.get("./assets/feed.json");
  }

  public getPopular(): Observable<any> {
    return this.http.get("./assets/popular.json");
  }

  public getPromotions(): Observable<any> {
    return this.http.get("./assets/popular.json");
  }

  public getCategories(): Observable<any> {
    return this.http.get("./assets/categories.json");
  }
  // Create
  createPost(post: Post) {
    return this.postListRef.push({
      author: post.author,
      title: post.title,
      content: post.content,
    });
  }

  // Get Single
  getPost(id: string) {
    this.postRef = this.db.object("/post/" + id);
    return this.postRef;
  }

  // Get List
  getPostList() {
    this.postListRef = this.db.list("/post");
    return this.postListRef;
  }

  // Update
  updatePost(id, post: Post) {
    return this.postRef.update({
      author: post.author,
      title: post.title,
      content: post.content,
    });
  }

  // Delete
  deletePost(id: string) {
    this.postRef = this.db.object("/post/" + id);
    this.postRef.remove();
  }
}
