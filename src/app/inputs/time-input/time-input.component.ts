import { Component, OnInit, Input, forwardRef } from '@angular/core';
import * as moment from 'moment';
import { InputBase } from '../inputBase';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'time-input',
  templateUrl: './time-input.component.html',
  styleUrls: ['./time-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimeInputComponent),
      multi: true
    }
  ]
})
export class TimeInputComponent extends InputBase implements ControlValueAccessor {

  @Input() label: string = "שעה";

  ngOnInit(): void {
    this.innerValue = "00:00";
  }

  UpdateDate(val) {
    this.innerValue = val;
    this.onChange(this.innerValue);
  }

}
