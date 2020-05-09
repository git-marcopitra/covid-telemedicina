import { Component } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({ template: ''})
export class ModalComponent {

  error: {}

  modals: string[] = this.modalService.getModals()

  currentModal: string
  constructor(private modalService: ModalService) { }

  ngDoCheck(): void{
    this.currentModal = this.modalService.getModal();
  }

  changeModal($modal: string): void {
    this.modalService.setModal($modal)
  }
  
  firstTime = (): boolean => this.modalService.getFirstTime();


  endFirstTime(): void {
    this.modalService.noMoreFirstTime();
  }

  checkError (event:any, status: boolean) {
    const key = event.srcElement.id;
   
    this.error[key] = status;
  }
}
