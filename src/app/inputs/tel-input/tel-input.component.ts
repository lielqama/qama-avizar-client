import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputBase } from '../inputBase';

@Component({
  selector: 'tel-input',
  templateUrl: './tel-input.component.html',
  styleUrls: ['./tel-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TelInputComponent),
      multi: true
    }
  ]
})
export class TelInputComponent extends InputBase implements ControlValueAccessor {

  @Input() label: string = "טלפון";

  ngOnInit(): void {
    this.innerValue = "";
  }

  Update(val) {
    this.innerValue = val;
    this.onChange(this.innerValue);
  }
}
