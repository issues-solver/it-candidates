import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBySearchTerm'
})
export class FilterBySearchTermPipe implements PipeTransform {
  transform(list: string[] | null, searchValue: string): string[] {
    if (!searchValue) {
      return list || [];
    }
    if (list?.length) {
      return list.filter((item: string) => item.toLowerCase().includes(searchValue.trim().toLowerCase()));
    }
    return [];
  }
}
