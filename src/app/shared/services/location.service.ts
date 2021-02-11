import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable, Subject } from "rxjs";
import { Post } from "../models/post";
import { User } from "../models/user";

@Injectable({
  providedIn: "root",
})
export class LocationService {
  _location: string = "Havana, Cuba";

  constructor(private firestore: AngularFirestore) {}

  public set location(location: string) {
    this._location = location;
  }

  public get location(): string {
    return this._location;
  }
}
