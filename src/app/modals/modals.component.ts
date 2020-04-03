import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.css']
})
export class ModalsComponent extends ModalComponent implements OnInit {

  constructor(modalService: ModalService) {
    super(modalService)
   }

  ngOnInit(): void {
  }

}
