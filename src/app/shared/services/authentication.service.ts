import { Injectable, NgZone } from "@angular/core";
import firebase from "firebase/app";
import { User } from "../models/user";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { Observable, Subject } from "rxjs";
import { first } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  public userData: any;
  public redirectResult: Subject<any> = new Subject<any>();
  // public setUserResult: Subject<User> = new Subject<User>();
  // public unsetUserResult: Subject<void> = new Subject<void>();
  public userIsLoaded: boolean;

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.ngFireAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem("user", JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem("user"));
        // this.setUserResult.next(this.userData);
      } else {
        localStorage.setItem("user", null);
        JSON.parse(localStorage.getItem("user"));
        // this.unsetUserResult.next();
      }
    });
  }

  // Login in with email/password
  signIn(email, password) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  // Register user with email/password
  registerUser(email, password) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password);
  }

  sendVerificationEmail() {
    return this.ngFireAuth.currentUser
      .then((u) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(["verify-email"]);
      });
  }

  // Recover password
  passwordRecover(passwordResetEmail) {
    return this.ngFireAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert(
          "Password reset email has been sent, please check your inbox."
        );
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
    return user !== null && user.emailVerified !== false ? true : false;
  }

  // Returns true when user's email is verified
  get isEmailVerified(): boolean {
    //TODO: Verify that email exists or not first
    const user = JSON.parse(localStorage.getItem("user"));
    return user.emailVerified !== false ? true : false;
  }

  // Sign in with Gmail
  googleAuth() {
    return this.authLogin(new firebase.auth.GoogleAuthProvider());
  }

  // Auth providers
  authLogin(provider) {
    return this.ngFireAuth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        this.setUserData(result.user);
        this.ngFireAuth.authState.subscribe((user) => {
          if (user) {
            this.userData = user;
            localStorage.setItem("user", JSON.stringify(this.userData));
            JSON.parse(localStorage.getItem("user"));
            this.redirectResult.next(result);
            this.ngZone.run(() => {
              this.router.navigate(["home"]);
            });
          } else {
            localStorage.setItem("user", null);
            JSON.parse(localStorage.getItem("user"));
          }
        });
      })
      .catch((error) => {
        // window.alert(error);
        this.redirectResult.next(error);
      });
  }

  // // Used to notify components when user has logged in
  // getSetUserResult(): Observable<User> {
  //   return this.setUserResult.asObservable();
  // }

  // // Used to notify components when user has logged off
  // getUnsetUserResult(): Observable<void> {
  //   return this.unsetUserResult.asObservable();
  // }

  getRedirectResult(): Observable<any> {
    return this.redirectResult.asObservable();
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  // Sign-out
  signOut() {
    return this.ngFireAuth.signOut().then(() => {
      console.log("Signed out...");

      localStorage.removeItem("user");
      this.router.navigate(["login"]);
    });
  }

  getUserData(): Promise<User> {
    return this.ngFireAuth.currentUser;
  }

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      const currentUser = firebase.auth().currentUser;
      if (currentUser) resolve(currentUser);
      else {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
          unsubscribe();
          resolve(user);
        }, reject);
      }
    });
  }

  public async getUser(): Promise<any> {
    return await this.ngFireAuth.authState.pipe(first()).toPromise();
  }

  firstFunction() {
    return new Promise((resolve, reject) => {
      let y = 0;
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          y++;
        }
        console.log("loop completed");
        resolve(y);
      }, 2000);
    });
  }

  // getCurrentUser() {
  //   return new Promise((resolve, reject) => {
  //      if (this.userIsLoaded) {
  //           resolve(firebase.auth().currentUser);
  //      }
  //      const unsubscribe = this.ngFireAuth.onAuthStateChanged(user => {
  //         this.userIsLoaded = true;
  //         unsubscribe();
  //         resolve(user);
  //      }, reject);
  //   });
  // }

  // refreshToken() {
  //   console.log(firebase.auth().currentUser.emailVerified);

  //   this.ngFireAuth.currentUser
  //     .then((u) => u.reload())
  //     .then((x) => {
  //       console.log(x);
  //     });
  // }
}
