import { Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';
import { InputBase } from '../inputBase';

@Component({
  selector: 'month-input',
  templateUrl: './month-input.component.html',
  styleUrls: ['./month-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MonthInputComponent),
      multi: true
    }
  ]
})
export class MonthInputComponent extends InputBase implements OnInit {

  constructor() { super(); }

  month: string;
  year: string;

  monthOptions: any[] = [];
  yearOptions: any[] = [];

  ngOnInit(): void {

    for (let index = 1; index <= 12; index++) {
      let id = index < 10 ? `0${index}` : index.toString();
      this.monthOptions.push({ id: id, name: index })
    }

    const today = moment(new Date());
    for (let index = 0; index < 10; index++) {
      const year = today.format('YYYY');
      const id = today.format('YY');
      this.yearOptions.push({ id: id, name: year })
      today.add(1, 'year');
    }
  }

  writeValue(obj: string): void {
    this.innerValue = obj;

    if (obj) {
      let split = obj.split('/');
      if (split.length === 2) {
        if (split[0].length === 2) {
          this.month = split[0];
        }
        if (split[1].length === 2) {
          this.year = split[1];
        }
      }
    }
  }


  updateMonth(val) {
    this.month = val;
    if (!this.innerValue) {
      this.innerValue = "00/00";
    }
    this.innerValue = `${val}/${this.innerValue.split('/')[1]}`;

    if ('function' === typeof (this.onChange))
      this.onChange(this.innerValue);

  }
  updateYear(val) {
    this.year = val;
    if (!this.innerValue) {
      this.innerValue = "00/00";
    }
    this.innerValue = `${this.innerValue.split('/')[0]}/${val}`;


    if ('function' === typeof (this.onChange))
      this.onChange(this.innerValue);
  }

}
