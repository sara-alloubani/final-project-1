import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import{BreakpointObserver, BreakpointState}from '@angular/cdk/layout';
import { delay } from 'rxjs';
import { SidenavService } from 'src/app/core/services/sidenav.service';
import { NavMenuDto } from 'src/app/core/dto/nav-menu';
import { AuthService } from 'src/app/core/services/auth.service';



@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit ,AfterViewInit{
  @ViewChild(MatSidenav)
  sideNav!: MatSidenav;
navMenu:NavMenuDto;
userData:any;
loading=true;
  constructor(private breakpoint:BreakpointObserver,private _sidenav:SidenavService,private _authService:AuthService ) {
    this.navMenu=this._sidenav.getNavMeu()

  }
  ngAfterViewInit(): void {
    this.breakpoint.observe(['(max-width:800px)']).pipe(delay(1)).
    subscribe((state:BreakpointState)=>{
      if(state.matches)
      {
        this.sideNav.mode='over';
        this.sideNav.close();
      }
      else{
        this.sideNav.mode='side';
        this.sideNav.open();

      }
          })

  }

  ngOnInit(): void {
    this.getuserInfo();

  }

  getuserInfo()
  {
    this._authService.userInfo.subscribe((user)=>{
      this.userData=user;
      if(this.userData.role)
      {
        this.loading=false;

      }
    })
  }



  onItemClicked()
   {
    if(this.sideNav.mode==='over')
    {
      this.sideNav.close();

    }
   }
   onLoggedoutClicked(){
    this._authService.logout();

   }

}
