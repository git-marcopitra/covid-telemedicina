import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
declare function cancelarConsulta(uid: string);
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

  constructor(private userService: UserService) {
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
          console.log('Is Empty');
          this.hasConsult = false;
        } else {
          querySnapshot.docs.map(doc => {
            console.log('Query Snapshot ::::: ', doc.data());
            this.consults.push(doc.data());
          });
          console.log('Have Consult');
          this.hasConsult = true;
        }
      })
      .catch(error => {
        console.log('Have Error : Erro ::::', error);
        this.hasConsult = false;
      });
    this.wait = false;
  }

  cancelarConsulta() {
    cancelarConsulta(this.userService.getCurrentUser().uid);
  }
}
