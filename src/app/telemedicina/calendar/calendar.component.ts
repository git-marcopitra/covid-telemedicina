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
   if(this.wait){
      let user = this.userService.getCurrentUser()
      console.log("Condition ::::: ", (user === null || user === undefined || user.uid === undefined))
      /*if(!(user === null || user === undefined || user.uid === undefined) ){
        await this.getTable(user.uid)
        this.wait = false
      }*/
    }
  }

  async getTable(){
    let a={}
    await getConsulta(this.userService.getCurrentUser().uid).then((querySnapshot) => {
     
      if(querySnapshot.size==0) 
          this.hasConsult = false
       else {
        a=querySnapshot;
       /*querySnapshot.forEach((doc) => { 
        this.consults.push(doc.data())
       });*/

       
      let i=0
       while(i<a.size){
        console.log(a.docs[i].data().motivo)
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
