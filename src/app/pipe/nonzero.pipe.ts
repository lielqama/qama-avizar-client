import { Pipe, PipeTransform } from '@angular/core';
import { AppState } from '../services/AppState';

@Pipe({
  name: 'nonzero'
})
export class NonzeroPipe implements PipeTransform {

  transform(items: any[], from: number, take: number, flag: string = null, final: boolean = false): any {
    let res = items.filter(x => ((flag ? x[flag] === 'Y' : true) || final) && x.TQUANT > 0).slice(from, from + take);
    return res;
  }

}
