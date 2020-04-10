import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toFixed'
})
export class ToFixedPipe implements PipeTransform {

  transform(value: number, fix?: number): string {
    return value.toFixed(isNaN(fix) ? 6 : fix);
  }

}
