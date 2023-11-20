import { Component } from '@angular/core';
import { ServerService } from './services/service';
import { AppState } from './services/AppState';
import { Cart } from './services/Cart';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'YanshufClient';
  
  constructor(private service: ServerService) {

    AppState.Cart = new Cart();
    this.service.Status().then(x=>{
      if(x.isOk){
        AppState.SetUserProfile(x.singel);
      }
  })

  }
}
