import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-modal-sign-in',
  templateUrl: './modal-sign-in.component.html',
  styleUrls: ['./modal-sign-in.component.css', '../modal/modal.component.css']
})
export class ModalSignInComponent extends ModalComponent implements OnInit {


  constructor(modalService: ModalService) { 
    super(modalService)
  }


  ngOnInit(): void {
  }

}
