import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserCredential, User } from './user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: any
  status: boolean

  constructor(private db: AngularFireDatabase ) {
    this.status = false
  }

  getStatus(): boolean{
    return this.status
  }

  insert(user: User) {
    this.db.list('users').push(user)
      .then((result: any) => {
        console.log(result.key)
      });
  }
  update(user: User, key: string) {
    this.db.list('users').update(key, user)
      .catch((error: any) => {
        console.error(error)
      });
  }

  getAll() {
    return this.db.list('users')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, data: c.payload.val()}))
        })
      );
  }

  delete(key: string) {
    this.db.object(`users/${key}`).remove();
  }

  /*login(userCred: UserCredential): string {
    let user = this.getUserById(userCred.id)
    console.log("Users :::", user)
    if(user !==  null && userCred.id == user.data.id){
      this.user = user
      if(userCred.password == user.data.password) {
        this.status = true
        return 'logged'
      }
      else
        return 'password'
    }
    else {
      return 'user'
    }
  }

  /*getUserById(id: string) {
    let users: any
    this.getAll().subscribe(data => {
      if(data) {
        users = data
        return users
      }
    })
    return null
  }

/*
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

  deleteUser($userId: string) {
    return this.firestore
       .collection("users")
       .doc($userId)
       .delete();
  }

  setStatus($status: boolean): void {
    this.status = $status
  }

  loginUser(user: UserCredential): Observable<boolean> {
    return of(this.getUser(user) == null ? false : true);
  }

  getUser(user: UserCredential): any {
    let users
    async () => {
      this.readUsers().subscribe(res => (users = res))
      if(!(users === undefined))
      users.forEach((eachUser: { payload: { data: { data: () => any; }; }; }) => {
        let current = eachUser.payload.data.data()
        if(current.id == user.id){
          this.user = current
          return current
        }
      })
      return null
    }
  }
  
*/
}
