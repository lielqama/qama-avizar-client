import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchSelectFilter'
})
export class SearchSelectFilterPipe implements PipeTransform {

  transform(items: { id: string, name: string }[], value: any): any {
    if (value === null || !items) return [];
    if (value !== '*')
      items = items.filter(x => x.name.includes(value) || x.id.includes(value));

    var sorted = items.sort(function (a, b) {
      return a.id === '*' ? -1 : b.id === '*' ? 1 : ('' + a.name).localeCompare(b.name);
    })

    return sorted;
  }

}
