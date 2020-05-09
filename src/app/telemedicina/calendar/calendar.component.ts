import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { ModalService } from 'src/app/modal.service';
declare function cancelarConsulta(uid: string, id:any);
declare function getConsulta(uid: string);
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  hasConsult: boolean;
  consults: Array<any>;
  wait: boolean;
  enter: boolean;

  constructor(private userService: UserService, private modalService: ModalService) {
    this.hasConsult = undefined;
    this.wait = true;
    this.enter = true;
    this.consults = [];
  }

  ngOnInit() {}

  ngDoCheck() {
    if (this.wait) {
      let user = this.userService.getCurrentUser().uid;
      if (user !== undefined && this.enter) {
        this.enter = false;
        this.getTable(user);
      }
    }
  }

  async getTable(uid) {
    await getConsulta(uid)
      .then(querySnapshot => {
        if (querySnapshot.empty === true) {
          
          this.hasConsult = false;
        } else {
          querySnapshot.docs.map(doc => {
           
            let data={
              id: doc.id,
              data: doc.data()
            }
            this.consults.push(data);
          });
      
          this.hasConsult = true;
        }
      })
      .catch(error => {
     
        this.hasConsult = false;
      });
    this.wait = false;
  }

  setModal(modal: string) {
    this.modalService.setModal(modal);
  }

  cancelarConsulta(id) {
    cancelarConsulta(this.userService.getCurrentUser().uid,id);
  }
}
