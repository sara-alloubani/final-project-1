import { Injectable } from '@angular/core';
import { NavItemDto } from '../dto/nav-item';
import { NavMenuDto } from '../dto/nav-menu';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  constructor() { }
  getNavMeu () : NavMenuDto
  {
    return new  NavMenuDto('NavMenu',[
      new NavItemDto('Startups','view_in_ar_new','/startup',''),
      new NavItemDto('Approval','approval_delegation','/approval','admin'),
      new NavItemDto('Sectors','dashboard','/sectors','admin'),
      ]);  }


    }
