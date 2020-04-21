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

  constructor(private userService: UserService) { 
  }


  ngOnInit() {}

  async ngAfterContentInit(){
    console.log("After Content Init")
    await getConsulta(this.userService.getCurrentUser().uid).then((querySnapshot) => {
      
    console.log("Query :::: ", querySnapshot)
      if(querySnapshot.size==0) {
          console.log("nao tem consulta")
      } else {
       querySnapshot.forEach((doc) => { 
        console.log(doc.data().motivo+" "+doc.data().dateInit+" "+doc.data().dateClose+" "+doc.data().observador+" "+doc.data().done)
       });
      }
   });
  }

  cancelarConsulta(){
    cancelarConsulta(this.userService.getCurrentUser().uid)
  }
   
}
