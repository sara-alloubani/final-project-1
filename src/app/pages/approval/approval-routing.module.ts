import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalComponent } from './approval/approval.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'all-approval',
    pathMatch:'full',
  },
  {
    path:'all-approval',
    component:ApprovalComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovalRoutingModule { }
