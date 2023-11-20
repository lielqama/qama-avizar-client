import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ServerService } from 'src/app/services/service';
import { LocalStorage } from 'src/app/services/LocalStorage';
import { AppState } from 'src/app/services/AppState';
import { ViewManager } from 'src/app/viewManager';
import { FormsModule } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';
@Component({
  selector: 'app-logparts',
  templateUrl: './logparts.component.html',
  styleUrls: ['./logparts.component.css']
})
export class LogpartsComponent extends ViewManager  implements OnInit {
  partplaceholder:string = "...הקלד שם מוצר או ברקוד";
  public get userName() { return AppState.UserName; }
  isLoading: boolean = false;
  isLoading1: boolean = false;
  parts: any[] = [];
  lock: boolean = false;

  constructor(private service: ServerService) 
  {
    super();
     this.filter = '';
  this.model = {
    LOGPART: {}
  };
  this.model.LOGCOUNTERS_SUBFORM = [];
}

async ngOnInit() {
  this.isLoading = true;
  this.parts = (await this.service.GetResources("LOGPARTfa", true)).list;
  this.isLoading = false;

}
public comp():number {
if (this.model.LOGCOUNTERS_SUBFORM[0]) {
  
  return this.model.LOGCOUNTERS_SUBFORM[0].BALANCE - this.model.LOGCOUNTERS_SUBFORM[0].ORDERS ; }
return 0.0;}

  async  onSelectpart(){
    
      this.isLoading1 = true;
       this.model = (await this.service.GetLOGPART(this.model.PARTNAME)).singel;
       this.isLoading1 = false;
      }
      
  async  onSearchPart(val: string){
    
    this.isLoading = true;
    this.parts = (await this.service.GetResources("LOGPARTfa", true, this.filter)).list;
    this.isLoading = false;
  }
    
  

  

}
