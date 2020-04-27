import { Component, OnInit } from '@angular/core';
declare const messaging: any;
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  visible: boolean

  constructor() {
    this.visible = false
  }

  ngOnInit(): void {
    if(Notification.permission == "granted")
      this.visible = false
    else
      this.visible = true
  }

  async notifyMe() {
    await messaging
    if(Notification.permission == "granted")
      this.visible = false
    else
      this.visible = true
  }

}
