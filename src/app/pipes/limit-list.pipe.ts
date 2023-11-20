import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitList'
})
export class LimitListPipe implements PipeTransform {

  transform(value: any[]): unknown {
    return value.slice(0, 3);
  }

}
