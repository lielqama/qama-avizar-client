import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortbyproductname'
})
export class FilterbyvaluePipe implements PipeTransform {

  transform(items: any[]): any {
    return items.sort(function (a, b) {
      return ('' + a.product.name).localeCompare(b.product.name);
    })
  }

}
