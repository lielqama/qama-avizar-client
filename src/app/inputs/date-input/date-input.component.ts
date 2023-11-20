import { Component, OnInit, Input, forwardRef } from '@angular/core';
import * as moment from 'moment';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputBase } from '../inputBase';

@Component({
  selector: 'date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true
    }
  ]
})
export class DateInputComponent extends InputBase implements ControlValueAccessor {

  @Input() label: string = "תאריך";

  ngOnInit(): void {
    this.innerValue = new Date();
  }

  UpdateDate(val) {
    var date = moment(val, 'YYYY-MM-DD');
    this.innerValue = date.toDate();
    this.onChange(this.innerValue);
  }

}
