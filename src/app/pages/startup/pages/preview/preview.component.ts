import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Startup } from 'src/app/core/interfaces/startups.interface';
import { StartupsService } from 'src/app/core/services/startups.service';
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
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
export class PreviewComponent implements OnInit {
  private closer$=new Subject
key:string='';
loading=true;
startup:Startup={

    name:'',
     sectors:[],
     websiteUrl:'',
     emailAddress:'',

};
  constructor(private _startupService:StartupsService,
    private activatedRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((result)=>{
      if(result['key'])
      {
        this.key=result['key'];
        this.getDataById();

      }
    })
  }

  getDataById()
  {
    this._startupService.getById(this.key).pipe(takeUntil(this.closer$)).subscribe((result:any)=>{
      if(result)
      {
          this.startup=result;
          this.loading=false;
      }
      })

  }


  goToLink(url: string){
    window.open('//'+url, "_blank");
}
}
