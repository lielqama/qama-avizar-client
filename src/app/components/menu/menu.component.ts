import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/services/AppState';
import { AuthenticationService } from 'src/app/services/Authentication';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public get userName() { return AppState.UserName; }
  public get companyName() { return AppState.ComapnyName; }

  public get isAuth() { return AppState.isAuth; }
  public get isDriver() { return AppState.Role === "D"; }
  public get isTech() { return AppState.Role === "T"; }

  constructor() { }

  ngOnInit() {
  }

}
