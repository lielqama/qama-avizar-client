import { Component, OnInit, Input, forwardRef, EventEmitter, Output } from '@angular/core';
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
  @Input() parameters = "";
  @Input() autoSelect = false;
  @Input() _items: any[] = null;
  @Input() hasAllItem: boolean = false;

  @Input() hideIfEmpty: boolean = false;

  hide: boolean = false;

  items: any[] = null;

  @Output() setFullItem = new EventEmitter<object>();


  constructor(private service: ServerService) { super(); }

  disabled: boolean = false;
  isLoadnig: boolean = false;

  async ngOnInit() {
    if (this._items) {
      this.items = this._items;
    }
    else {
      this.isLoadnig = true;
      this.items = (await this.service.GetResources(this.resource, true, this.parameters)).list;
      this.isLoadnig = false;
    }

    if (this.hideIfEmpty) {
      if (!this.items || this.items.length === 0) {
        this.hide = true;
      }
    }

    if (this.hasAllItem) {
      var allItem = { id: '*', name: 'הכול' };
      this.items.unshift(allItem);
      this.innerValue = allItem.id;
      if (typeof (this.onChange) === 'function')
        this.onChange(this.innerValue);
    }
    if (this.autoSelect && this.items && this.items.length > 0) {
      this.innerValue = this.items[0].id;
      if (typeof (this.onChange) === 'function')
        this.onChange(this.innerValue);
    }

  }



  Update(val) {
    this.innerValue = val;
    this.onChange(this.innerValue);


    let obj = this.items.find(x => x.id === val);
    this.setFullItem.emit(obj);
  }

}
