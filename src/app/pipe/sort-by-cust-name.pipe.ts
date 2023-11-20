import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByCustName'
})
export class SortByCustNamePipe implements PipeTransform {

  transform(items: any[]): any {
    return items.sort((a, b) => a.CUSTNAME.localeCompare(b.CUSTNAME));
  }

}
