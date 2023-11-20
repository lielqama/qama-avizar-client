
import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputBase } from '../inputBase';

@Component({
  selector: 'number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberInputComponent),
      multi: true
    }
  ]
})
export class NumberInputComponent extends InputBase implements ControlValueAccessor {

  @Input() label: string = "מספר";
  @Input() step: number = 1;
  @Input() min: number = 0;
  @Input() max: number = 100000;

  ngOnInit(): void {
    this.innerValue = null;
  }

  Update(val) {
    this.innerValue = val;
    this.onChange(this.innerValue);
  }



}
