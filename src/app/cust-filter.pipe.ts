import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custFilter'
})
export class CustFilterPipe implements PipeTransform {

  transform(items: any[], term: string): any {
    if (!term) {
      return [];
    }
    return items.filter(x => x.CUSTNAME.includes(term) || x.CUSTDES.includes(term));
  }

}
