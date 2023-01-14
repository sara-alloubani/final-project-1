import { Sectors } from "./sectors.interface";

export interface Startup
{
  key?:string;
 name:string;
  logo?:string;
  city?:string;
  sectors:Sectors[];
  numberOfEmployees?:number|null;
  yearsOfEstablish?:string;
  websiteUrl:string;
  emailAddress:string;


}
