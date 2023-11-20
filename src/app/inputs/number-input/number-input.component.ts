
import { Component, OnInit, Input, forwardRef, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
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
  @Input() min: number = null;
  @Input() max: number = 100000;

  @Output() onSave: EventEmitter<any> = new EventEmitter();


  ngOnInit(): void {
    this.innerValue = null;
  }

  Update(val) {

    if (this.max)
      val = Math.min(val, this.max);

    if (this.min !== null) {
      val = Math.max(val, this.min);
    }

    this.innerValue = val;
    this.onChange(this.innerValue);

    this.onSave.emit();
  }

  add() {
    if (this.disabled) return;

    if (!this.innerValue)
      this.innerValue = 0;

    this.innerValue += this.step;
    this.Update(this.innerValue);
  }

  minus() {
    if (this.disabled) return;

    if (!this.innerValue)
      this.innerValue = 0;

    this.innerValue -= this.step;

    this.Update(this.innerValue);

  }



}
