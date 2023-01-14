import { animate, keyframes, query, stagger, state, style, transition, trigger } from '@angular/animations';

export const fade=trigger('fade',[
  state('void',style({opacity:0})),
  transition('void <=>*',[
    animate(2000)
  ]),

]);

export const listAnimation=trigger('listAnimation',[
  transition('*=>*',[
    query(':enter',style({opacity:0}),{optional:true})]),

    query(':enter',stagger('300ms',[
      animate('1s ase-in',keyframes([
        style({opactiy:0,transform:'translateY(-75px)',offset:0}),
        style({opactiy:0.5,transform:'translateY(35px)',offset:0.3}),
        style({opactiy:1,transform:'translateY(0px)',offset:1}),
      ]))
    ]),{optional:true}),

    query(':leave',stagger('300ms',[
      animate('1s ase-in',keyframes([
        style({opactiy:1,transform:'translateY(0px)',offset:0}),
        style({opactiy:0.5,transform:'translateY(35px)',offset:0.3}),
        style({opactiy:0,transform:'translateY(-75px)',offset:1}),
      ]))
    ]),{optional:true}),


])
