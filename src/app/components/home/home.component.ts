import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/service';
import { AppState } from 'src/app/services/AppState';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: ServerService, private nav: Router) { }

  ngOnInit() {
    if (!AppState.isAuth) {
      this.nav.navigate(['/signin']);
    }

    this.service.Status().then(x => {
      if (x.isOk) {
        AppState.SetUserProfile(x.singel);

        this.nav.navigate(['/Logparts']);

      }
      else {
        this.nav.navigate(['/signin']);
      }
    })

  }

}
