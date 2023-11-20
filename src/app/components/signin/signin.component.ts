import { Component, OnInit } from '@angular/core';
import { LoginViewModel, AuthenticationService } from 'src/app/services/Authentication';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  error: string;
  loading: boolean;
  agent: LoginViewModel = new LoginViewModel();
  cust: LoginViewModel = new LoginViewModel();

  company:string;
  selectedCompany = null;
  constructor(private auth: AuthenticationService, private nav: Router) {
    AuthenticationService.ClearToken();
  }

  ngOnInit() {

   
      }
   

  Login(type) {
    this.error = "";
    this.loading = true;

    var model = new LoginViewModel();
    model.UserName = this.agent.UserName ;
    model.Password = this.agent.Password;

    this.auth.Login(model).then(x => {
      if (x) {
        this.nav.navigate(['/']);
      }
      else {
        this.error = "שם משתמש או סיסמה שגויים";
      }
    }).catch(error => {
      this.error = error.message;
    }).finally(() => {
      this.loading = false;
    })

  }
}
