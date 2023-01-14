export class NavItemDto
{
    displayName:string;
    icon:string;
    route:string;
    role:string;
    children!:NavItemDto[];

    constructor( displayName:string,
        icon:string,
        route:string,
        role:string,
        children?:NavItemDto[])
        {
            this.displayName=displayName;
            this.icon=icon;
           this. route=route;
           this.role=role;
            this.children=children?children:[];
        }
}
