import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';


const MatImports = [
  MatToolbarModule,
  MatIconModule,
  MatTabsModule,
];

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, RouterModule, ...MatImports],
  exports: [HeaderComponent],
})
export class HeaderModule {}
