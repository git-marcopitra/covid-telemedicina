import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-modal-account-settings',
  templateUrl: './modal-account-settings.component.html',
  styleUrls: ['./modal-account-settings.component.css', '../modal/modal.component.css']
})
export class ModalAccountSettingsComponent extends ModalComponent  implements OnInit {

  constructor(modalService: ModalService) { 
    super(modalService)
  }

  ngOnInit(): void {
  }

}
