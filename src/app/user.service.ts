import { Injectable } from '@angular/core';
import { UserCredential, User } from './user';

declare function login(email:string, password: string): boolean;
declare function googleLogin(): boolean;
declare function logup(user: User): boolean | any;
declare function googleLogup(): boolean;
declare function logout(): boolean;


@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  logged: boolean

  signIn(user: UserCredential): boolean {
    if(login(user.email, user.password)){
      this.logged = true
      return true
    }
    return false
  }

  googleSignIn(): boolean {
    
    if(googleLogin()){
      this.logged = true
      return true
    } else
      return false
  }
  
  signUp(user: User) {
    if(logup(user))
      this.logged = true
  }

  googleSignUp() {
    if(googleLogup())
      this.logged = true
  }

  signOut() {
    if(logout())
      this.logged = false
  }

  getState() {
    return this.logged;
  }

}
