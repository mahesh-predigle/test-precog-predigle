import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DummyComponent } from './dummy/dummy.component';

const routes: Routes = [
  {pathMatch:'full', path: '', redirectTo: 'home' },
  {path: 'home', component: HomeComponent},
  {path: 'im-dummy', component: DummyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
