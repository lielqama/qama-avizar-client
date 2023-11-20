import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { InputBase } from '../inputBase';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'priority-bool-input',
  templateUrl: './priority-bool-input.component.html',
  styleUrls: ['./priority-bool-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PriorityBoolInputComponent),
      multi: true
    }
  ]
})
export class PriorityBoolInputComponent extends InputBase implements ControlValueAccessor {

  @Input() label: string = "בוליאני";

  constructor() {
    super();
    this.innerValue = '';
  }
  ngOnInit(): void {
  }

  Update(val) {
    if (val === true) {
      this.innerValue = 'Y';
    }
    else {
      this.innerValue = null;
    }
    this.onChange(this.innerValue);

  }


}
