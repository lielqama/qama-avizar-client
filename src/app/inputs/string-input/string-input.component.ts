

import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputBase } from '../inputBase';

@Component({
  selector: 'string-input',
  templateUrl: './string-input.component.html',
  styleUrls: ['./string-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StringInputComponent),
      multi: true
    }
  ]
})
export class StringInputComponent extends InputBase implements ControlValueAccessor {

  @Input() label: string = "טקסט";

  ngOnInit(): void {
    this.innerValue = "";
  }

  Update(val) {
    this.innerValue = val;
    this.onChange(this.innerValue);
  }



}
