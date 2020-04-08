import { Injectable } from '@angular/core';
import { UserCredential, User } from './user';

declare function login(email:string, password: string): any;
declare function googleLogin(): any;
declare function logup(user: User): boolean | any;
declare function googleLogup(): boolean;
declare function logout(): any;
declare function conectado(): any;


@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  logged: boolean
  teste: boolean
  async signIn(user: UserCredential) {
 
 return await login(user.email, user.password).then(resul => { 
  conectado()
  this.logged = true  
  return  true
  }).catch(error => {  
   return false
  })

  }
 
 
  async googleSignIn() {
    
    return await googleLogin().then(resul => { 
      conectado()
      this.logged = true  
      return  true
      }).catch(error => {  
       return false
      })
  }
  
  signUp(user: User) {
    if(logup(user))
      this.logged = true
  }

  googleSignUp() {
    if(googleLogup())
      this.logged = true
  }

  async signOut() {
    logout().then(() => {
      this.logged = false
      return true;
  }).catch(error => {
      return false;
  });
      
  }

  getState() {
    return this.logged;
  }

}
