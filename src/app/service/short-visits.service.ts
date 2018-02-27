import { Injectable } from '@angular/core';
import { ShortVisit} from '../item/short-visit';
import {Observable} from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Visit } from '../item/visit';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ShortVisitsService {
  private Url = 'http://localhost:8080/';
  private visitUrl = this.Url + 'Visit';  // URL to web api

  constructor(private http: HttpClient) { }

  getShortVisits (): Observable<ShortVisit[]> {
    return this.http.get<ShortVisit[]>(this.visitUrl + '/Short');
  }

  deleteVisit(visit: Visit | number): Observable<Visit> {
    const id = typeof visit === 'number' ? visit : visit.idVisit;
/*AAAAAAAAAA*/    console.log('id=' + id);
    const url = `${this.visitUrl}/aa${id}`;
    return this.http.delete<Visit>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Visit>('deleteHero'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
