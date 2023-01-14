import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Startup } from 'src/app/core/interfaces/startups.interface';
import { StartupsService } from 'src/app/core/services/startups.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css'],
})
export class ApprovalComponent implements OnInit {
  dataSource = new MatTableDataSource<Startup>([]);
  displayedColumns = ['name', 'emailAdress', 'sectors', 'city', 'actions'];
  userData: any;
  loading = true;
  //
  key:string='';
  loading2 = true;
  startup:Startup={

    name:'',
     sectors:[],
     websiteUrl:'',
     emailAddress:'',
     logo:'',
    city:'',
    numberOfEmployees:0,
    yearsOfEstablish:'',
};
//
formGroup:FormGroup;


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _startupService: StartupsService,
    private router: Router,
    private activatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder,public matDialog:MatDialog) {
    this.formGroup=this.formBuilder.group({
      name:[null,[Validators.required]],
       logo:null,
       city:null,
       sectors:[null,[Validators.required]],
       numberOfEmployees:null,
       yearsOfEstablish:null,
       websiteUrl:[null,[Validators.required]],
       emailAddress:[null,[Validators.email,Validators.required]],
    })
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((result)=>{
      if(result['key'])
      {
        this.key=result['key'];
        this.getDataById();
      }
    })
    this.gellAllData();
  }

  getDataById()
  {
    this._startupService.getByIdRequest(this.key).subscribe((result:any)=>{
      this.formGroup=this.formBuilder.group({
        name:result['name'],
         logo:result['logo'],
         city:result['city'],
         sectors:result['sectors'],
         numberOfEmployees:result['numberOfEmployees'],
         yearsOfEstablish:result['yearsOfEstablish'],
         websiteUrl:result['websiteUrl'],
         emailAddress:result['emailAddress'],

      })
    });

  }

  gellAllData() {
    this._startupService.getAllRequested().subscribe((result: any) => {
      if (result) {
        this.dataSource = new MatTableDataSource(result);
        console.log(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource._updateChangeSubscription();
        setTimeout(() => this.dataSource.paginator = this.paginator);

        this.loading = false;
      }
    });
  }
  applyFilter($event: any) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onApproveClicked(row: Startup) {
    Swal.fire({
      title: 'Are you sure you want to aprove this startup?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, approve it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.value) {
         this._startupService.create(row).then(()=>{
      this._startupService.deleteRequset(row.key);
    });
        Swal.fire(
          'approved!',
          'New startup has been approved.',
          'success'
        )
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {}
    })
  }
  onDeleteClicked(row: Startup) {

    Swal.fire({
      title: 'Are you sure you want to delete this startup?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.value) {
        this._startupService.deleteRequset(row.key).then(() => {
          Swal.fire(
            'Done!',
            'The startup has been deleted.',
            'success'
          )
        });

      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) { }
    })

  }

}
