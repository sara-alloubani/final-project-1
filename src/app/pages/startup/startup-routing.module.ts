import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStartupComponent } from './pages/add-startup/add-startup.component';
import { PreviewComponent } from './pages/preview/preview.component';
import { RequestComponent } from './pages/request/request.component';
import { UpdateStartupComponent } from './pages/update-startup/update-startup.component';
import { StartupComponent } from './startup/startup.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'all-startup',
    pathMatch:'full',
  },
  {
    path:'all-startup',
    component:StartupComponent
  },
  {
    path:'add-startup',
    component:AddStartupComponent
  },
  {
    path:'update-startup',
    component:UpdateStartupComponent
  },
  {
    path:'preview-startup',
    component:PreviewComponent
  },
  {
    path:'request-startup',
    component:RequestComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartupRoutingModule { }
