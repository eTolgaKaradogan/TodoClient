import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private added = new Subject<boolean>();
  private search = new BehaviorSubject<string>('');
  private dates = new Subject<{startDate: Date, endDate: Date}>();
  constructor() { }

  sendAddedUpdate(added: boolean) {
    this.added.next(added);
  }
  getAddedUpdate(): Observable<boolean> {
    return this.added.asObservable(); 
  }

  sendSearchUpdate(searchText: string) {
    this.search.next(searchText);
  }
  getSearchUpdate(): Observable<string> {
    return this.search.asObservable(); 
  }

  sendDates(startDate: Date, endDate: Date) {
    this.dates.next({startDate, endDate});
  }
  getDates(): Observable<{startDate: Date, endDate: Date}> {
    return this.dates.asObservable(); 
  }
}
