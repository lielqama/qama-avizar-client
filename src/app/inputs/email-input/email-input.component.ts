
import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputBase } from '../inputBase';

@Component({
  selector: 'email-input',
  templateUrl: './email-input.component.html',
  styleUrls: ['./email-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmailInputComponent),
      multi: true
    }
  ]
})
export class EmailInputComponent extends InputBase implements ControlValueAccessor {

  @Input() label: string = "מייל";

  ngOnInit(): void {
    this.innerValue = "";
  }

  Update(val) {
    this.innerValue = val;
    this.onChange(this.innerValue);
  }

}

