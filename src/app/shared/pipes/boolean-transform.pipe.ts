import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
@Pipe({
  name: 'boolTransform',
})
export class BoolTransfrom implements PipeTransform {
  transform(value: boolean) {
    return value ? 'Da' : 'Ne';
  }
}
