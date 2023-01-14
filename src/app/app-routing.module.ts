import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NotAuthGuard } from './core/guards/not-auth.guard';
import { HomeComponent } from './pages/home/home/home.component';

const routes: Routes = [

  {
    path:'',
    redirectTo:'startup',
    pathMatch:'full'
  },
  {
    path:'auth',
    loadChildren:()=>import('./pages/auth/auth.module').then((m)=>m.AuthModule),
    canLoad:[NotAuthGuard]
  },
  {
    path:'home',
    loadChildren:()=>import('./pages/home/home.module').then((m)=>m.HomeModule),
    component:HomeComponent,
    canLoad:[NotAuthGuard]

  },
  {
    path:'startup',
    loadChildren:()=>import('./pages/startup/startup.module').then((m)=>m.StartupModule),
    canLoad:[AuthGuard]


  },
  {
    path:'sectors',
    loadChildren:()=>import('./pages/sectors/sectors.module').then((m)=>m.SectorsModule),
    canLoad:[AuthGuard]


  },
  {
    path:'approval',
    loadChildren:()=>import('./pages/approval/approval.module').then((m)=>m.ApprovalModule),
    canLoad:[AuthGuard]

  },
  {
    path:'**',
    redirectTo:'home',
    pathMatch:'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
