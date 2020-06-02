import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { ModalService } from '../modal.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-modal-account-settings',
  templateUrl: './modal-account-settings.component.html',
  styleUrls: ['./modal-account-settings.component.css', '../modal/modal.component.css']
})
export class ModalAccountSettingsComponent extends ModalComponent  implements OnInit {

  wait:boolean

  constructor(modalService: ModalService, private userService:UserService) { 
    super(modalService)
    this.wait = false
  }

  ngOnInit(): void {
  }

  async signOut() {
    this.wait = true

    if(await this.userService.signOut()) {
      
      this.wait = false
      this.changeModal('none')
    }
  }

}
