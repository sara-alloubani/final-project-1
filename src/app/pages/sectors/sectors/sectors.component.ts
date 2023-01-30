import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Sectors } from 'src/app/core/interfaces/sectors.interface';
import { SectorsService } from 'src/app/core/services/sectors.service';
import Swal from 'sweetalert2';
import { MatSort } from '@angular/material/sort';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.css'],
})
export class SectorsComponent implements OnInit ,OnDestroy{
  private closer$=new Subject<void>();
  loading = true;
  dataSource = new MatTableDataSource<Sectors>([]);
  displayedColumns = ['name', 'designColor', 'parentCategoryName', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;


  constructor(
    private _sectorsService: SectorsService,
    private router: Router
  ) {}
  ngOnDestroy(): void {

if(this.closer$)
{
  this.closer$.next();
  this.closer$.unsubscribe();
}  }

  ngOnInit(): void {
    this.getAllData();
  }
  applyFilter($event: any) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getAllData() {
    this._sectorsService.getAll().pipe(takeUntil(this.closer$))
    .subscribe((result: any) => {
      if (result) {
        this.dataSource = new MatTableDataSource(result);
        console.log(result);
        this.dataSource._updateChangeSubscription();
        setTimeout(() =>{
          (this.dataSource.paginator = this.paginator);
          this.dataSource.sort = this.matSort;
        } , 1000);

        this.loading = false;
      }
    });
  }

  onAddClicked() {
    this.router.navigate(['/sectors/add-sector']);
  }
  onEditClicked(row: Sectors) {
    this.router.navigate(['/sectors/update-sector'], {
      queryParams: {
        key: row.key,
      },
    });
  }

  onDeleteClicked(row: Sectors) {
    Swal.fire({
      title: 'Are you sure you want to delete this sector?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.value) {
        this._sectorsService.delete(row.key).then(() => {
          Swal.fire(
            'Deleted!',
            'Your sector has been deleted.',
             'success');
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }
}
