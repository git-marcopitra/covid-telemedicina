import { Component } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({ template: ''})
export class ModalComponent {

  currentModal: string

  constructor(private modalService: ModalService) { }

  ngDoCheck(): void{
    this.currentModal = this.modalService.getModal();
  }

  changeModal($modal: string): void {
    this.modalService.setModal($modal)
  }
  
  firstTime = (): boolean => this.modalService.getFirstTime();

  modals = (): string[] => this.modalService.getModals()

  endFirstTime(): void {
    this.modalService.noMoreFirstTime();
  }
}
