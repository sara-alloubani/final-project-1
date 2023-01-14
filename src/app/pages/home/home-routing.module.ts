import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreviewStartupComponent } from './home/preview-startup/preview-startup.component';
import { StartupComponent } from './home/startup/startup.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'startup',
    pathMatch:'full'
  },
{
  path:'startup',
  component:StartupComponent
},
{
  path:'preview-startup',
  component:PreviewStartupComponent
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
