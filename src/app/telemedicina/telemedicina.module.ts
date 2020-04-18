import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TelemedicinaRoutingModule } from './telemedicina-routing.module';
import { OptionsComponent } from './options/options.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [OptionsComponent, HeaderComponent],
  imports: [
    CommonModule,
    TelemedicinaRoutingModule
  ]
})
export class TelemedicinaModule { }
