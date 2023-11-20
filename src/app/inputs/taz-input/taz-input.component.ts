
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputBase } from '../inputBase';

@Component({
  selector: 'taz-input',
  templateUrl: './taz-input.component.html',
  styleUrls: ['./taz-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TazInputComponent),
      multi: true
    }
  ]
})
export class TazInputComponent extends InputBase implements ControlValueAccessor {

  @Input() label: string = "ת.ז";

  ngOnInit(): void {
    this.innerValue = "";
  }

  Update(val) {
    this.innerValue = val;
    this.onChange(this.innerValue);
  }


}





