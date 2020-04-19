import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OptionsComponent } from './options/options.component';
import { ResumeComponent } from './resume/resume.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AppointmentComponent } from './appointment/appointment.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path:'', component: OptionsComponent },
      { path:'resume', component: ResumeComponent },
      { path:'calendar', component: CalendarComponent },
      { path:'appointment', component: AppointmentComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TelemedicinaRoutingModule { }
