import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentData,
  DocumentReference,
  Query,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
import { promise } from "protractor";
import { BehaviorSubject, Observable, Subject, Subscription } from "rxjs";
import { map, take } from "rxjs/operators";
import { Post } from "../models/post";
import { Tag } from "../models/tag";
import { User } from "../models/user";
import { LocationService } from "./location.service";

export interface PostWrapper {
  post: Post;
  ref: DocumentReference;
}

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
    PostWrapper[] | undefined
  > = new BehaviorSubject(undefined); // state container for our posts
  private lastPageReached: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  ); // boolean to check if we have fetched all data
  private nextQueryAfter: QueryDocumentSnapshot<Post>; // a reference to the last Firestore document fetched to index our database queries
  private paginationSub: Subscription; // sub to stop observing the changes
  private findSub: Subscription; // sub to clean up

  public dataQuery: AngularFirestoreCollection;

  public postResult: Subject<any> = new Subject<any>();
  // public lastVisible: any;
  public dataSource: any;
  // getPosts(): Observable<any> {
  //   return this.firestore
  //     .collection("posts")
  //     .valueChanges({ idField: "postId" });
  // }

  destroy() {
    this.unsubscribe();
  }

  private unsubscribe() {
    if (this.paginationSub) {
      this.paginationSub.unsubscribe();
    }

    if (this.findSub) {
      this.findSub.unsubscribe();
    }
  }

  find() {
    try {
      const collection: AngularFirestoreCollection<Post> = this.getCollectionQuery();

      this.unsubscribe();

      this.paginationSub = collection.get().subscribe(async (first) => {
        this.nextQueryAfter = first.docs[
          first.docs.length - 1
        ] as QueryDocumentSnapshot<Post>;

        await this.query(collection);
      });
    } catch (err) {
      throw err;
    }
  }

  private getCollectionQuery(): AngularFirestoreCollection<Post> {
    if (this.nextQueryAfter) {
      return this.firestore.collection("posts", (ref) =>
        ref
          .orderBy("timeStamp", "desc")
          .startAfter(this.nextQueryAfter)
          .limit(3)
      );
    } else {
      return this.firestore.collection<Post>("posts", (ref) =>
        ref.orderBy("timeStamp", "desc").limit(3)
      );
    }
  }

  watchItems(): Observable<PostWrapper[]> {
    return this.itemsSubject.asObservable();
  }

  watchLastPageReached(): Observable<boolean> {
    return this.lastPageReached.asObservable();
  }

  private query(collection: AngularFirestoreCollection<Post>): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        this.findSub = collection
          .snapshotChanges()
          .pipe(
            map((actions) => {
              return actions.map((a) => {
                const id = a.payload.doc.id;
                const ref = a.payload.doc.ref;
                const data = a.payload.doc.data();
                var obj: PostWrapper = {
                  ref: ref,
                  post: data,
                };
                return obj;
              });
            })
          )
          .subscribe(async (items: PostWrapper[]) => {
            await this.addItems(items);

            resolve();
          });
      } catch (e) {
        reject(e);
      }
    });
  }

  private addItems(items: PostWrapper[]): Promise<void> {
    return new Promise<void>((resolve) => {
      if (!items || items.length <= 0) {
        this.lastPageReached.next(true);

        resolve();
        return;
      }
      this.itemsSubject
        .asObservable()
        .pipe(take(1))
        .subscribe((currentItems: PostWrapper[]) => {
          this.itemsSubject.next(
            currentItems !== undefined
              ? [...currentItems, ...items]
              : [...items]
          );

          resolve();
        });
    });
  }

  getFeed() {
    return this.firestore
      .collection("posts", (ref) => ref.orderBy("timeStamp", "desc").limit(10))
      .get();
  }

  getPosts(): Observable<any> {
    return this.firestore
      .collection("posts", (ref) => ref.orderBy("timeStamp", "desc").limit(10))
      .valueChanges({ idField: "postId" });
  }

  paginate(navigation, lastVisible): Observable<QuerySnapshot<DocumentData>> {
    switch (navigation) {
      case "first":
        this.dataQuery = this.firestore.collection("posts", (ref) =>
          ref.orderBy("timeStamp", "desc").limit(1)
        );
        break;
      case "next":
        this.dataQuery = this.firestore.collection("posts", (ref) =>
          ref.orderBy("timeStamp", "desc").startAfter(lastVisible).limit(1)
        );
        break;
    }

    return this.dataQuery.get();

    // this.dataSource = this.dataQuery
    //   .get()
    //   .then((documentSnapshots: QuerySnapshot<any>) => {
    //     this.lastVisible =
    //       documentSnapshots.docs[documentSnapshots.docs.length - 1];

    //     return documentSnapshots.docs.map(
    //       (element: QueryDocumentSnapshot<any>) => {
    //         const data = element.data();
    //         const id = element.id;
    //         console.log({ id, ...data });

    //         return { id, ...data };
    //       }
    //     );
    //   });
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
