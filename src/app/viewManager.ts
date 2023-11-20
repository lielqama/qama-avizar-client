import { ViewChild, Directive } from "@angular/core";

@Directive()
export class ViewManager {


    public isSaving: boolean = false;

    public model: any = {};

    public options: any[] = [];

    public saveResult: any = null;
    get hasResult() { return this.saveResult !== null; }

    public errors: any[] = [];
    get hasErrors() { return this.errors && this.errors.length > 0; }

    public filter: any = {};

    public isLoading: boolean = false;
    public items: any[] = [];
    public resultCounter: number = 0;


   

    public jsonCopy(src) {
        return JSON.parse(JSON.stringify(src));
    }

    getWazeLink(addr) {
        return "https://www.waze.com/ul?q=" + encodeURI(addr) + "&navigate=yes";
    }
    getWazeLinkPIN(X,Y) {
return "https://www.waze.com/ul?ll=" + X+","+Y + "&navigate=yes";      

    }

}