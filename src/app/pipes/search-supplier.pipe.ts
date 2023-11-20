import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchSupplier'
})
export class SearchSupplierPipe implements PipeTransform {

  transform(items: any[], term: string): any {
    if (!term || term.length === 0)
      return items;

    return items.filter(x => x.UNSPSCDES.includes(term));
  }

}
