import { Injectable } from '@angular/core';
import { UserCredential, User } from './user';
import { RouterStateSnapshot, Router } from '@angular/router';

declare function login(email:string, password: string): any;
declare function googleLogin(): any;
declare function logup(user: User): any;
declare function googleLogup(): any;
declare function logout(): any;
declare function updateUser(User: any): any;
declare function conectado(): any;
declare function getUser(): any;
declare function getAllDataUser(): any;
declare function getDataUser(uid: string): any;
declare function resetPassword(email: string): any;


@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  logged: boolean
  redirectUrl = ''

  constructor(private router: Router) {
    this.session()
  }

  async signIn(user: UserCredential) {
    return await login(user.email, user.password).then(() => { 
      getAllDataUser()
        this.logged = true  
        return  true
      }).catch(() => {  
        return false
      })
    }
 
 
  async googleSignIn() {
    return await googleLogin()
    .then(() => { 
      getAllDataUser()
      this.logged = true  
      return  true
      })
    .catch(() => {  
       return false
      })
  }
  
  async signUp(user: User) {
    if(await logup(user)){
      
      this.logged = true
      return true
    }else{
      return false
    }

  }
  async updateThisUser(user: User) {
    return await updateUser(user)
    .then(() => {
      
      return true
    }) 
    .catch(()=> {
      return false
    })
  }

  async googleSignUp() {
    return await googleLogup()
    .then(()=>{
      getAllDataUser()
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
      this.router.navigate(['/home'])
      return true;
    })
    .catch(() => {
      return false;
    });
  }

  async passwordRescue(email: string) {
    return await resetPassword(email)
    .then(() => {
      return true
    })
    .catch(()=> {
      return false
    })
  }

  getState() {
    return this.logged;
  }
  getCurrentUser(): User{
    return getUser()
  }

  async session(){
    return await conectado().onAuthStateChanged(newUser => {
      if (newUser){
          getDataUser(newUser.uid)
          
        this.logged = true
        return true
      }
          
    else {
      this.logged = false
      return true
    }
    })

    
  }
}
