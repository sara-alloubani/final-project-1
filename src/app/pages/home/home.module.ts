import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HeaderModule } from 'src/app/core/components/layout/header/header.module';
import { RouterModule } from '@angular/router';
import { StartupComponent } from './home/startup/startup.component';
import { PreviewStartupComponent } from './home/preview-startup/preview-startup.component';
import { HomeRoutingModule } from './home-routing.module';
import { MatChipsModule } from '@angular/material/chips';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


const MatImports = [

  MatIconModule,
  MatChipsModule,
  MatListModule,
  MatFormFieldModule,
  MatTabsModule,
  MatCardModule,
  MatButtonModule,
  MatProgressSpinnerModule,
];

@NgModule({
  declarations: [
    HomeComponent,
    StartupComponent,
    PreviewStartupComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    RouterModule,
    HomeRoutingModule,
    ...MatImports,
  ]
})
export class HomeModule { }
