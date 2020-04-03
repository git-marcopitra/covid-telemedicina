import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-modal-welcome',
  templateUrl: './modal-welcome.component.html',
  styleUrls: ['./modal-welcome.component.css', '../modal/modal.component.css']
})
export class ModalWelcomeComponent extends ModalComponent implements OnInit {

  constructor(modalService: ModalService) { 
    super(modalService)
  }

  ngOnInit(): void {
  }

  ngOnDestoy(): void {
    this.endFirstTime()
  }

}
