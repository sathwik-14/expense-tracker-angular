import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list'
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule} from '@angular/material/icon';
import {
  NgApexchartsModule
} from "ng-apexcharts";

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    NgApexchartsModule
  ]
})
export class UserModule { }
