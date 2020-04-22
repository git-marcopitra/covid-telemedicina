import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
declare function cancelarConsulta(uid:string)
declare function getConsulta(uid:string)
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  hasConsult: boolean
  consults: [{}]
  wait: boolean

  constructor(private userService: UserService) { 
    this.hasConsult = undefined
    this.wait = true
  }

  ngOnInit() {
   
  }

  async ngDoCheck() {
   if(this.wait === true){
      let user = this.userService.getCurrentUser()
      console.log("User ::::: ", user, "User UID ::::: ",  user.uid)
      if(user.uid !== undefined){
        this.getTable(user.uid) 
        this.wait = false
      }
    }
  }

  async getTable(uid){
    let a={}
    await getConsulta(uid).then((querySnapshot) => {
      if(querySnapshot.empty) 
          this.hasConsult = false
       else {
        const a = querySnapshot
        let i = 0
        while(i < a.size){
          console.log(a.docs[i].data().motivo)
          this.consults.push(a.docs[i].data())
          i++
        }
        
        this.hasConsult = true
      }
   }).catch(() => {
    this.hasConsult = false
   });
  }

  cancelarConsulta(){
    cancelarConsulta(this.userService.getCurrentUser().uid)
  }
   
}
