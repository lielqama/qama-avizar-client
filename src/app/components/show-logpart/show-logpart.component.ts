import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ServerService } from 'src/app/services/service';
import { ActivatedRoute } from '@angular/router'; 
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-show-logpart',
  templateUrl: './show-logpart.component.html',
  styleUrls: ['./show-logpart.component.css']
})
export class ShowLogpartComponent implements OnInit {


  searchTerm: string = "";
  isLoading: boolean = false;

 id:string;
part:any;
  constructor(private service: ServerService, route:ActivatedRoute) { 
    this.id = route.snapshot.params['id'];
  }

  ngOnInit() {
    if( this.id)
      {
    this.isLoading = true;
    this.service.GetLOGPART(this.id).then(x => {
      this.part = x.singel;
      this.isLoading = false;
    
    })
  }}

  

 

}
