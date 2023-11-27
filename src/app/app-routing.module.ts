import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './common_component/login/login.component';

const routes: Routes = [
  {
    path: '',
    component:LoginComponent
  },
  {
    path: 'home',
    loadChildren: () => import('../app/user/user.module').then(m => m.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
