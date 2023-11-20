import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { TextareaInputComponent } from '../textarea-input/textarea-input.component';
import { InputBase } from '../inputBase';
import { AppState } from 'src/app/services/AppState';

@Component({
  selector: 'priority-text',
  templateUrl: './priority-text-input.component.html',
  styleUrls: ['./priority-text-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PriorityTextInputComponent),
      multi: true
    }
  ]
})
export class PriorityTextInputComponent extends InputBase implements ControlValueAccessor {

  @Input() label: string = "טקסט ארוך";
  @Input() rows: number = 5;


  plainText: string = '';
  ngOnInit(): void {
  }

  writeValue(obj: any): void {
    if (AppState.user.priorityVersion >= 20) {
      obj = obj ?? {};
      this.innerValue = obj;
      this.plainText = obj.TEXT;
    }
    else {
      obj = obj !== null ? obj : [];
      this.innerValue = obj;
      this.plainText = '';
      if (this.innerValue) {
        this.innerValue.forEach(element => {
          this.plainText += element.TEXT + '\n';
        });
      }
    }


  }


  Update(val) {
    this.plainText = val;
  }
  fireChange() {
    if (AppState.user.priorityVersion >= 20) {
      let val = this.plainText;
      this.innerValue = {
        TEXT: this.plainText
      };
    }
    else {
      let val = this.plainText;
      this.innerValue = [];
      if (val) {
        var pointer = 0;
        var maxLength = val.length;
        while (pointer <= maxLength) {
          var endOfText = Math.min(pointer + 68, maxLength);
          var slice = val.slice(pointer, endOfText);

          var lines = slice.split("\n");
          for (let index = 0; index < lines.length; index++) {
            const t = lines[index];
            if (t && t.length > 0) {
              var newItem = {
                TEXT: t
              }
              this.innerValue.push(newItem);
            }
          }
          pointer += 68;
        }
      }
    }

    this.onChange(this.innerValue);
  }

}
