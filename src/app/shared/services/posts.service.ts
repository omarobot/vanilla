import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
import { userInfo } from "os";
import { BehaviorSubject, Observable, Subject, Subscription } from "rxjs";
import { map, take } from "rxjs/operators";
import { Comment } from "../models/comment";
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

  private itemsSubject: BehaviorSubject<
    Post[] | undefined
  > = new BehaviorSubject(undefined); // state container for our posts
  private lastPageReached: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  ); // boolean to check if we have fetched all data
  private nextQueryAfter: QueryDocumentSnapshot<Post>; // a reference to the last Firestore document fetched to index our database queries
  private paginationSub: Subscription; // sub to stop observing the changes
  private fetchSub: Subscription; // sub to clean up

  public dataQuery: AngularFirestoreCollection;

  public postResult: Subject<any> = new Subject<any>();
  public editedPostResult: Subject<any> = new Subject<any>();
  public dataSource: any;

  // destroy() {
  //   this.unsubscribe();
  // }

  public unsubscribe() {
    if (this.paginationSub) {
      this.paginationSub.unsubscribe();
    }

    if (this.fetchSub) {
      this.fetchSub.unsubscribe();
    }
  }

  nullifyNextQueryAfter() {
    // nullify next doc for when refreshing data
    this.nextQueryAfter = null;
  }

  watchItems(): Observable<Post[]> {
    return this.itemsSubject.asObservable();
  }

  watchLastPageReached(): Observable<boolean> {
    return this.lastPageReached.asObservable();
  }

  private getCollectionQuery(): AngularFirestoreCollection<Post> {
    // get query based on first fetch or not
    if (this.nextQueryAfter) {
      return this.firestore.collection("posts", (ref) =>
        ref
          .orderBy("timeStamp", "desc")
          .startAfter(this.nextQueryAfter)
          .limit(5)
      );
    } else {
      return this.firestore.collection<Post>("posts", (ref) =>
        ref.orderBy("timeStamp", "desc").limit(5)
      );
    }
  }

  fetch(reload: boolean) {
    try {
      const collection: AngularFirestoreCollection<Post> = this.getCollectionQuery();

      this.unsubscribe();

      this.paginationSub = collection.get().subscribe(async (posts) => {
        this.nextQueryAfter = posts.docs[
          posts.docs.length - 1
        ] as QueryDocumentSnapshot<Post>;
        await this.transform(posts, reload);
      });
    } catch (err) {
      throw err;
    }
  }

  private transform(
    collection: QuerySnapshot<Post>,
    reload: boolean
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        this.addItems(collection, reload);
      } catch (e) {
        reject(e);
      }
    });
  }

  private addItems(items: QuerySnapshot<Post>, reload: boolean): Promise<void> {
    return new Promise<void>((resolve) => {
      if (!items || items.docs.length <= 0) {
        this.lastPageReached.next(true);

        resolve();
        return;
      }
      this.itemsSubject
        .asObservable()
        .pipe(take(1))
        .subscribe((currentItems: Post[]) => {
          let newItems = [];
          items.forEach((item) => {
            var p = item.data();
            p.postId = item.id;
            newItems.push(p);
          });
          this.itemsSubject.next(
            currentItems !== undefined && !reload
              ? [...currentItems, ...newItems]
              : [...newItems]
          );

          resolve();
        });
    });
  }

  getPost(id: string): Observable<any> {
    return this.firestore.collection("posts").doc(id).get();
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

  editPost(post: Partial<Post>): Promise<void> {
    return this.firestore.collection("posts").doc(post.postId).update(post);
  }

  deletePost(post: Post): Promise<void> {
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

  getComments(id: string): Observable<any> {
    return this.firestore
      .collection("posts")
      .doc(id)
      .collection("comments")
      .get();
  }

  getComment(post: Post, id: string): Observable<any> {
    return this.firestore
      .collection("posts")
      .doc(post.postId)
      .collection("comments")
      .doc(id)
      .get();
  }

  addComment(user: User, post: Post, input: string, images?: Array<string>) {
    const comment: Comment = {
      postId: post.postId,
      displayName: post.displayName,
      // userName: post.userName,
      uid: post.uid,
      content: input,
      likeCount: 0,
      timeStamp: Date.now(),
      images: images,
      profileImage: post.profileImage,
      userLikes: [],
    };
    console.log("Comment obj");
    console.log(comment);

    return this.firestore
      .collection("posts")
      .doc(post.postId)
      .collection("comments")
      .add(comment);
  }

  editComment(comment: Comment): Promise<void> {
    return this.firestore
      .collection("posts")
      .doc(comment.postId)
      .collection("comments")
      .doc(comment.commentId)
      .update(comment);
  }

  deleteComment(comment: Comment): Promise<void> {
    return this.firestore
      .collection("posts")
      .doc(comment.postId)
      .collection("comments")
      .doc(comment.commentId)
      .delete();
  }

  getPostResult(): Observable<any> {
    return this.postResult.asObservable();
  }

  triggerPostResult(result: boolean) {
    this.postResult.next(result);
  }

  triggerEditedPostResult(result: any) {
    this.editedPostResult.next(result);
  }

  getEditedPostResult(): Observable<any> {
    return this.editedPostResult.asObservable();
  }
}
