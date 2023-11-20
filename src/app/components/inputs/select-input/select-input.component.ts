import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ServerService } from 'src/app/services/service';
import { InputBase } from '../inputBase';

@Component({
  selector: 'select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectInputComponent),
      multi: true
    }
  ]
})
export class SelectInputComponent extends InputBase implements ControlValueAccessor {

  @Input() label: string = "בחירה";
  @Input() resource = "";
  @Input() hasAllItem: boolean = true;

  @Input() _items: any[] = null;

  items: any[] = [];

  constructor(private service: ServerService) { super(); }

  disabled: boolean = false;

  ngOnInit(): void {
    if (this._items) {
      this.items = this._items;
    }
    else {
      this.service.GetResources(this.resource, true).then(x => {
        this.items = x.list;

        if (this.hasAllItem) {
          var allItem = { id: '*', name: 'הכול' };
          this.items.unshift(allItem);
          this.innerValue = allItem.id;
          this.onChange(this.innerValue);
        }

      });
    }

  }



  Update(val) {
    this.innerValue = val;
    this.onChange(this.innerValue);
  }

}
