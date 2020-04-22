import { Injectable } from '@angular/core';
import { UserCredential, User,Test,AppointmentData } from './user';
import { Router } from '@angular/router';

declare function login(email:string, password: string): any;
declare function logup(user: User): any;
declare function googleLogup(): any;
declare function googleLogup1(): any;
declare function googleLogup2(): any;
declare function logout(): any;
declare function updateUser(): any;
declare function updateUser1(): any;
declare function conectado(): any;
declare function getUser(): any;
declare function getAllDataUser(): any;
declare function getDataUser(uid: string): any;
declare function resetPassword(email: string): any;
declare function setUser(currentUser: any): any;
declare function getLastTest(uid:any): any;
@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  logged: boolean
  redirectUrl = ''
  test: Test
  details:AppointmentData

  constructor(private router: Router) {
    this.session()
  }

  async signIn(user: UserCredential) {
    return await login(user.email, user.password).then(async () => { 
      await getAllDataUser()
        this.logged = true  
        return  true
      }).catch(() => {  
        return false
      })
    }
 
 
  async googleSignIn() {
    return await googleLogup()
    .then(async () => { 
      await getAllDataUser()
      this.logged = true  
      return  true
      })
    .catch(() => {  
       return false
      })
  }
  
  async signUp(user: User) {
    if(await logup(user)){
      await getAllDataUser()
      this.logged = true
      return true
    }else{
      return false
    }

  }
  async updateThisUser(user: User) {
    return await updateUser().onAuthStateChanged(async user1 => {
      if (user1) {
       
        

          user1.updateProfile({
              displayName: user.name
          })
          let currentUser={
            doc: (user.doc == null) ? '' : user.doc,
            gender: user.gender,
            phone: user.phone== null? '':user.phone,
            email: user.email,
            name: user.name,
            birthYear: user.birthYear,
            level: user.level,
            geo: user.hasOwnProperty('geo.long')? user.geo: {lat:0,long:0}
        }
        
          await updateUser1().ref('users/' + user1.uid).update(currentUser).then(()=>{
            currentUser["uid"]=user1.uid
            setUser(currentUser)
        return true
        })
      }else{
        return false
      }
  })
    
  }

  async googleSignUp() {
    return await googleLogup()
    .then(async ()=>{
      await googleLogup1().onAuthStateChanged( async $user => {
        if ($user) {
          
           let currentUser = {
                name: $user.displayName,
                gender: '',
                phone: ($user.phoneNumber === null) ? 0 : $user.phoneNumber,
                email: $user.email,
                birthYear: '',
                level: -1,
                doc: '',
                geo: {
                    lat: 0,
                    long: 0
                }
            };
           await googleLogup2().ref('users/' + $user.uid).set(currentUser).then(result=>{
            currentUser["uid"] = $user.uid
            setUser(currentUser)
            this.logged = true
            return true
           })  
        }
    })    
      })
    .catch(error => {
      console.log(error)
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
    let uid
     await conectado().onAuthStateChanged(async newUser => {
      if (newUser){
       uid=newUser.uid 
       
       await getDataUser(uid).once('value').then( async snapshot => {
        if (snapshot.val().name !== null) {
          this.logged = true
            let currentUser = {
                uid: uid,
                name: snapshot.val().name,
                gender: snapshot.val().gender,
                phone: snapshot.val().phone,
                email: snapshot.val().email,
                doc: snapshot.val().doc,
                birthYear: snapshot.val().birthYear,
                level: snapshot.val().level,
                geo: snapshot.val().geo
            }
            
            setUser(currentUser)
           await getLastTest(uid).then((querySnapshot) => {
              if(querySnapshot.size==0) {  
            }else {
                querySnapshot.forEach(doc => {
                  this.test=doc.data().test; 
                });    
                this.logged = true
              }
           }).catch(() => {
            this.logged = true
           });
           
        }
    }).catch(error => {
        console.log(error)
    });
      }
      else {
        this.logged = false
        
      }
    })

    
           
     
    
    


  }

  setLastTest(test: Test ){
    this.test=test
  }

  getLastTest():Test{
    return this.test
  }
  setAppointmentData(details: AppointmentData){
  this.details=details
  }
  getAppointmentData(): AppointmentData{
    return this.details
  }
}
