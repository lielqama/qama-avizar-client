import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputBase } from '../inputBase';

@Component({
  selector: 'textarea-input',
  templateUrl: './textarea-input.component.html',
  styleUrls: ['./textarea-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaInputComponent),
      multi: true
    }
  ]
})
export class TextareaInputComponent extends InputBase implements ControlValueAccessor {

  @Input() label: string = "טקסט ארוך";

  ngOnInit(): void {
    this.innerValue = "";
  }

  Update(val) {
    this.innerValue = val;
    this.onChange(this.innerValue);
  }



}

