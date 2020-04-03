import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-modal-sign-up',
  templateUrl: './modal-sign-up.component.html',
  styleUrls: ['./modal-sign-up.component.css', '../modal/modal.component.css']
})
export class ModalSignUpComponent extends ModalComponent implements OnInit {

  constructor(modalService: ModalService) { 
    super(modalService)
  }
  
  ngOnInit(): void {
  }

}
