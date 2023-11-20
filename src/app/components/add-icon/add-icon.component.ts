import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/services/AppState';

@Component({
  selector: 'app-add-icon',
  templateUrl: './add-icon.component.html',
  styleUrls: ['./add-icon.component.css']
})
export class AddIconComponent implements OnInit {



  constructor() { }

  get show() { return AppState.Role === 'S'; }

  ngOnInit() {
  }

}
