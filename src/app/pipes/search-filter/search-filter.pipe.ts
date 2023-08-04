import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(
    value: { id: string, title: string, description: string, scheduledDate: Date}[],
    search: string,
  ): { id: string, title: string, description: string, scheduledDate: Date}[] {
    if(value) {
      const regexp = new RegExp(search, 'i');
      const properties = ["title", "description"]
      return [
        ...value.filter((item) => {
          return properties.some((property) => regexp.test(item[property]));
        }),
      ];
    }
  }

}
