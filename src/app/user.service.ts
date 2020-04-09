import { Injectable } from '@angular/core';
import { UserCredential, User } from './user';

declare function login(email:string, password: string): any;
declare function googleLogin(): any;
declare function logup(user: User): any;
declare function googleLogup(): any;
declare function googleCloseSignUp(providerUser: any): any;
declare function logout(): any;
declare function conectado(): any;
declare function getUser(): any;


@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  logged: boolean
  teste: boolean

  async signIn(user: UserCredential) {
    return await login(user.email, user.password).then(() => { 
        conectado()
        this.logged = true  
        return  true
      }).catch(() => {  
        return false
      })
    }
 
 
  async googleSignIn() {
    return await googleLogin()
    .then(() => { 
      conectado()
      this.logged = true  
      return  true
      })
    .catch(() => {  
       return false
      })
  }
  
  async signUp(user: User) {
    if(await logup(user)){
      conectado()
      this.logged = true
      return true
    } else {
      return false
    }

  }

  async googleSignUp() {
    return await googleLogup()
    .then(()=>{
      conectado()
        this.logged = true
        return true
      })
    .catch(() => {
        return false
      })
    }

  async signOut() {
    return await logout()
    .then(() => {
      this.logged = false
      return true;
    })
    .catch(() => {
      return false;
    });
      
  }

  getState() {
    return this.logged;
  }
  getCurrentUser(): User{
    return getUser()
  }
}
