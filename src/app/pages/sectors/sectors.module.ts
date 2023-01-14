import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectorsRoutingModule } from './sectors-routing.module';
import { SectorsComponent } from './sectors/sectors.component';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AddSectorComponent } from './pages/add-sector/add-sector.component';
import { UpdateSectorComponent } from './pages/update-sector/update-sector.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
const MatImports=[
  MatTableModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatSortModule
  ]
@NgModule({
  declarations: [
    SectorsComponent,
    AddSectorComponent,
    UpdateSectorComponent
  ],
  imports: [
    CommonModule,
    SectorsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ...MatImports
  ]
})
export class SectorsModule { }
