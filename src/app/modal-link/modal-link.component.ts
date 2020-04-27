import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-modal-link',
  templateUrl: './modal-link.component.html',
  styleUrls: ['./modal-link.component.css', '../modal/modal.component.css']
})
export class ModalLinkComponent extends ModalComponent implements OnInit {

  wait: boolean
  link: string
  constructor(modalService: ModalService) { 
    super(modalService)
    this.wait = false
  }

  ngOnInit(): void {
  }

}