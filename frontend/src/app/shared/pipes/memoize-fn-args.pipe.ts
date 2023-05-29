import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'memoizePipe'
})
export class MemoizePipe implements PipeTransform {
  transform<T>(fn: (...args: any[]) => T, ...args: any[]): T {
    return fn(...args);
  }
}
