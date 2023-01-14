import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sectors } from 'src/app/core/interfaces/sectors.interface';
import { Startup } from 'src/app/core/interfaces/startups.interface';
import { SectorsService } from 'src/app/core/services/sectors.service';
import { StartupsService } from 'src/app/core/services/startups.service';
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css'],
  animations: [
    trigger("enterAnimation", [
      transition(":enter", [
        style({ transform: "translateX(100%)", opacity: 0 }),
        animate(
          "500ms",
          style({
            transform: "translateX(0)",
            opacity: 1,
            "overflow-x": "hidden"
          })
        )
      ]),
      transition(":leave", [
        style({ transform: "translateX(0)", opacity: 1 }),
        animate("500ms", style({ transform: "translateX(100%)", opacity: 0 }))
      ])
    ]),
    trigger("slideIn", [
      state("*", style({ "overflow-y": "hidden" })),
      state("void", style({ "overflow-y": "hidden" })),
      transition("* => void", [
        style({ height: "*" }),
        animate(250, style({ height: 0 }))
      ]),
      transition("void => *", [
        style({ height: "0" }),
        animate(250, style({ height: "*" }))
      ])
    ])
  ]
})
export class StartupComponent implements OnInit {
  sectorsList$: any;
  startuplist: Startup[] = [];
  filteredData: Startup[] = [];
  selectedSector: Sectors = {};

  constructor(
    private _sectorsService: SectorsService,
    private _startupService: StartupsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.gellAllSectors();
    this.getAllStartup();
  }
  getAllStartup() {
    this._startupService.getAll().subscribe((result: any[]) => {
      if(result){
        this.startuplist = result;
        this.filter();
      }

    });
  }
  gellAllSectors() {
    this.sectorsList$ = this._sectorsService.getAll();
  }

  onChipsClicked(chips: Sectors) {
    this.selectedSector = chips;
    this.filter();
  }

  filter() {
    this.filteredData = [];
    if (this.selectedSector.key) {
      this.startuplist.forEach((element) => {
        const filteredList = element.sectors.filter(
          (obj) => obj.key === this.selectedSector.key
        );

        if (filteredList.length > 0) {
          this.filteredData.push(element);
        }
      });
    } else {
      this.filteredData = this.startuplist;
    }
  }
  onStartupClicked(startup:Startup)
  {
    this.router.navigate(['/home/preview-startup'], {
      queryParams: {
        key: startup.key,
      },
    });

  }


  onAllChipsClicked()
  {
    this._startupService.getAll().subscribe((result: any[]) => {
      if(result){
        this.startuplist = result;
       this.filteredData=result;


      }

    });

  }
}
