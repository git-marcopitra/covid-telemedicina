import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menu: boolean
  logged: boolean
  constructor(private modalService: ModalService, private router: Router, private userService: UserService) {
    this.menu = false
    // this.logged = this.userService.getStatus()
    this.modalService.setModal('welcome')
   }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.logged = this.userService.getState();
  }

  toggleMenu($active: boolean): void {
    this.menu = $active == this.menu ? this.menu : !this.menu
  }

  changeModal($modal: string): void {
    this.toggleMenu(false)
    this.modalService.setModal($modal)
  }

  routeTo($route: string): void {
    this.toggleMenu(false)
    this.router.navigate([$route])
  }

}
