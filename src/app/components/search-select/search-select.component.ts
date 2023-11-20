import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, forwardRef } from '@angular/core';
import { ServerService } from 'src/app/services/service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputBase } from '../../inputs/inputBase';

@Component({
  selector: 'search-select',
  templateUrl: './search-select.component.html',
  styleUrls: ['./search-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchSelectComponent),
      multi: true
    }
  ]
})
export class SearchSelectComponent extends InputBase implements ControlValueAccessor {

  @Input() _items = null;
  @Input() resource = "";
  @Input() parameters = "";
  @Input() label = "בחר אפשרות";
  @Input() selected: any = null;
  @Input() hasAllItem: boolean = false;
  @Input() required: boolean = false;
  @Input() placeholder = "";
  @Output() setFullItem = new EventEmitter<object>();

  // @Output() onSelectItem: EventEmitter<any> = new EventEmitter();

  items: any[] = [];
  filter: string = null;

  showValidationFeedback: boolean = false;
  hideOptions: boolean = false;

  get hasValue() { return this.selected !== null; }


  constructor(private service: ServerService) { super(); }

  ngOnInit() {
    if (this._items) {
      this.items = this._items;
    }
    else {
      this.loadData();
    }
  }
  async loadData() {


    var result = await this.service.GetResources(this.resource, true, this.parameters);
    this.items = result.list;
    if (this.hasAllItem) {
      var allItem = { id: '*', name: 'הכול' };
      this.items.unshift(allItem);
      this.selected = allItem;
    }

    if (this.innerValue) {
      this.restoreValueByID(this.innerValue);
    }
  }

  async onFilterChange(ev) {
    this.showValidationFeedback = true;
    this.hideOptions = !ev.isTrusted; //if fire from code (validation) hide, otherwise show;
    // if (this.filterByServer) {
    //   await this.loadData();
    // }

    var currFilterExist = this.items.find(x => x.name == this.filter);
    if (currFilterExist) {
      this.selectItem(currFilterExist);
    }
    else {
      this.cleanSelect();
    }
  }

  selectItem(item) {
    if (item) {
      this.filter = item.name;
      this.innerValue = item.id;
    }

    if (this.selected !== item) {
      this.selected = item;
      if (item === null) {
        this.onChange(null);
      }
      else {
        this.onChange(this.selected.id);
        this.setFullItem.emit(this.selected);
      }
    }
  }

  writeValue(_id: any): void {
    this.innerValue = _id;
    this.restoreValueByID(_id);
  }

  async restoreValueByID(_id: any) {
    var obj = this.items.find(x => x.id == _id); //value compeare important
    if (obj) {
      this.selected = obj;
      this.filter = obj.name;
    }
    else {
      this.selected = null;
      this.filter = '';
      this.hideOptions = true;
    }
  }

  cleanSelect() {
    this.selectItem(null);
  }


  focusOut() {
    this.hideOptions = true;
  }

}
