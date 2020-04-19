import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TelemedicinaRoutingModule } from './telemedicina-routing.module';
import { OptionsComponent } from './options/options.component';
import { HeaderComponent } from './header/header.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { ResumeComponent } from './resume/resume.component';


@NgModule({
  declarations: [OptionsComponent, HeaderComponent, CalendarComponent, AppointmentComponent, ResumeComponent],
  imports: [
    CommonModule,
    TelemedicinaRoutingModule
  ]
})
export class TelemedicinaModule { }
