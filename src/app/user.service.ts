import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserCredential, User } from './user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  status: boolean

  constructor(private firestore: AngularFirestore ) {
    this.status = false
  }

  getStatus(): boolean{
    return this.status
  }

  createUser($user: User): Observable<any> {
    return of(new Promise<any>((resolve, reject) =>{
      this.firestore
          .collection("users")
          .add($user)
          .then(res => {}, err => reject(err))
    }))
  }

  readUsers() {
    return this.firestore.collection("users").snapshotChanges();
  }

  deleteUser($userId) {
    return this.firestore
       .collection("coffeeOrders")
       .doc($userId)
       .delete();
  }

  setStatus($status: boolean): void {
    this.status = $status
  }

  login($user: UserCredential): void {

  }
}
