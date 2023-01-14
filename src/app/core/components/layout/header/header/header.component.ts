import { Component, OnInit } from '@angular/core';
import { StartupsService } from 'src/app/core/services/startups.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _startupService:StartupsService,) { }

  ngOnInit(): void {
  }
  gellAllData()
  {
this._startupService.getAll().subscribe((result:any)=>{
  if(result)
  {
  //   this.dataSource=new MatTableDataSource(result);
  // console.log(result);
  // this.dataSource.paginator=this.paginator;
  // this.dataSource._updateChangeSubscription();
  // this.loading=false;

  }
});
  }


}
