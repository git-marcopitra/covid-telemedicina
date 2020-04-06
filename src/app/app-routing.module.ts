import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TeamComponent } from './team/team.component';
import { ContributorsComponent } from './contributors/contributors.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { DailyTestComponent } from './daily-test/daily-test.component';
import { MapComponent } from './map/map.component';
import { TelemedicinaComponent } from './telemedicina/telemedicina.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'maps', component: MapComponent },
  { path: 'home', component: HomeComponent },
  { path: 'team', component: TeamComponent },
  { path: 'contributors', component: ContributorsComponent  },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'dailytest', component: DailyTestComponent },
  { path: 'telemedicina', component: TelemedicinaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
