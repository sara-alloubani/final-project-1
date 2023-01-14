import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Startup } from 'src/app/core/interfaces/startups.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { StartupsService } from 'src/app/core/services/startups.service';
import Swal from 'sweetalert2';
import { SectorsService } from 'src/app/core/services/sectors.service';
import { MatSort } from '@angular/material/sort';

import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
  state,
  keyframes,
} from '@angular/animations';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css'],
  // animations:[listAnimation]
  // animations: [
  //   trigger("listAnimation", [
  //     transition("* => *", [
  //       // each time the binding value changes
  //       query(
  //         ":leave",
  //         [stagger(100, [animate("0.5s", style({ opacity: 0 }))])],
  //         { optional: true }
  //       ),
  //       query(
  //         ":enter",
  //         [
  //           style({ opacity: 0 }),
  //           stagger(100, [animate("0.5s", style({ opacity: 1 }))])
  //         ],
  //         { optional: true }
  //       )
  //     ])
  //   ]),
  //   trigger("enterAnimation", [
  //     transition(":enter", [
  //       style({ transform: "translateX(100%)", opacity: 0 }),
  //       animate(
  //         "500ms",
  //         style({
  //           transform: "translateX(0)",
  //           opacity: 1,
  //           "overflow-x": "hidden"
  //         })
  //       )
  //     ]),
  //     transition(":leave", [
  //       style({ transform: "translateX(0)", opacity: 1 }),
  //       animate("500ms", style({ transform: "translateX(100%)", opacity: 0 }))
  //     ])
  //   ]),
  //   trigger("slideIn", [
  //     state("*", style({ "overflow-y": "hidden" })),
  //     state("void", style({ "overflow-y": "hidden" })),
  //     transition("* => void", [
  //       style({ height: "*" }),
  //       animate(250, style({ height: 0 }))
  //     ]),
  //     transition("void => *", [
  //       style({ height: "0" }),
  //       animate(250, style({ height: "*" }))
  //     ])
  //   ])
  // ]
})
export class StartupComponent implements OnInit {
  dataSource = new MatTableDataSource<Startup>([]);
  displayedColumns = ['name', 'emailAdress', 'sectors', 'city'];
  userData: any;
  loading = true;
  sectorsData$: any;
  apiResponse: any = [];
  filterObj = {
    name: '',
    sectors: '',
  };
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  constructor(
    private _startupService: StartupsService,
    private router: Router,
    private _authService: AuthService,
    private _sectorsService: SectorsService
  ) {}

  ngOnInit(): void {
    this.getuserInfo();
    this.getAllData();
    this.gellAllSectors();
  }
  gellAllSectors() {
    this.sectorsData$ = this._sectorsService.getAll();
  }
  getuserInfo() {
    this._authService.userInfo.subscribe((user) => {
      this.userData = user;
      if (this.userData.role) {
        this.displayedColumns = ['name', 'emailAdress', 'sectors', 'city'];
        if (this.userData.role === 'admin') {
          this.displayedColumns.push('actions');
        }
        this.getAllData();
      }
    });
  }
  getAllData() {
    this._startupService.getAll().subscribe((result: any) => {
      if (result) {
        this.apiResponse = result;
        this.dataSource = new MatTableDataSource(result);
        console.log(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = this.customFilter();

        this.dataSource.sort = this.matSort;
        this.dataSource._updateChangeSubscription();
        setTimeout(() => (this.dataSource.paginator = this.paginator), 1000);
        this.loading = false;
      }
    });
  }
  applyFilter($event: any) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.filterObj.name = filterValue;
    this.dataSource.filter = JSON.stringify(this.filterObj);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onChange($event: any) {
    console.log($event.value.name);
    if ($event.value === 'All') {
      this.filterObj.sectors = '';
      this.dataSource.filter = JSON.stringify(this.filterObj);
    } else {
      this.filterObj.sectors = $event.value.name;
      this.dataSource.filter = JSON.stringify(this.filterObj);
    }
  }

  customFilter() {
    const coustom = (data: Startup, filter: string): boolean => {
      const filterObj = JSON.parse(filter);
      let filterSectors = data.sectors.some(
        (sector) =>
          sector.name === filterObj.sectors || filterObj.sectors === ''
      );

      let filterName = data.name
        .toLowerCase()
        .includes(filterObj.name.toLowerCase());

      return filterSectors && filterName;
    };
    return coustom;
  }

  onAddClicked() {
    this.router.navigate(['/startup/add-startup']);
  }

  onEditClicked(row: Startup) {
    this.router.navigate(['/startup/update-startup'], {
      queryParams: {
        key: row.key,
      },
    });
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
        this._startupService.delete(row.key).then(() => {
          Swal.fire('Deleted!', 'Your startup has been deleted.', 'success');
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  onRowClicked(row: Startup) {
    this.router.navigate(['/startup/preview-startup'], {
      queryParams: {
        key: row.key,
      },
    });
  }

  onRequestNewStartupClicked() {
    this.router.navigate(['/startup/request-startup']);
  }
}
