import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSectorComponent } from './pages/add-sector/add-sector.component';
import { UpdateSectorComponent } from './pages/update-sector/update-sector.component';
import { SectorsComponent } from './sectors/sectors.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'all-sector',
    pathMatch:'full',

  },
{
  path:'all-sector',
  component:SectorsComponent
},
{
  path:'add-sector',
  component:AddSectorComponent
},
{
  path:'update-sector',
  component:UpdateSectorComponent
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectorsRoutingModule { }
