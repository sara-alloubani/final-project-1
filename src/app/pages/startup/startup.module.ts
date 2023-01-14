import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartupRoutingModule } from './startup-routing.module';
import { StartupComponent } from './startup/startup.component';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { AddStartupComponent } from './pages/add-startup/add-startup.component';
import { UpdateStartupComponent } from './pages/update-startup/update-startup.component';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreviewComponent } from './pages/preview/preview.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { RequestComponent } from './pages/request/request.component';
import { MatSortModule } from '@angular/material/sort';



const MatImports=[
  MatTableModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatMenuModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatSortModule
];

@NgModule({
  declarations: [
    StartupComponent,
    AddStartupComponent,
    UpdateStartupComponent,
    PreviewComponent,
    RequestComponent
  ],
  imports: [
    CommonModule,
    StartupRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ...MatImports
  ]
})
export class StartupModule { }
