import { Pipe, PipeTransform } from '@angular/core';
import { PriorityCustomerViewModel } from '../entities/CustomerViewModel';

@Pipe({
  name: 'custSelect'
})
export class CustSelectPipe implements PipeTransform {

  transform(cust: PriorityCustomerViewModel): unknown {
    if (cust) {
      return { id: cust.CUSTNAME, name: cust.CUSTDES };
    }
    return null;
  }

}
