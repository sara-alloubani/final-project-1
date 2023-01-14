import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav/side-nav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


const MatImports=[ MatSidenavModule,MatToolbarModule,MatIconModule,MatListModule,MatButtonModule,MatProgressSpinnerModule];

@NgModule({
  declarations: [
    SideNavComponent
  ],
  imports: [
    CommonModule,RouterModule,
    ...MatImports
  ],
  exports:[SideNavComponent]


})
export class SideNavModule { }
