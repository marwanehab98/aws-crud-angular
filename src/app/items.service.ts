import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('id_token')}`,
    }),
  };

  constructor(private http: HttpClient) {}

  getItems() {
    return this.http
      .get(
        environment.API_URL,
        this.httpOptions
      )
      .pipe(catchError(this.handleError(false)));
  }

  putItems(id: string | null, name: string, price: string) {
    let reqId = id || crypto.randomUUID();
    return this.http
      .put(
        environment.API_URL,
        { id: reqId, price, name },
        this.httpOptions
      )
      .pipe(catchError(this.handleError(false)));
  }

  deleteItem(id: string) {
    return this.http
      .delete(
        `${environment.API_URL}${id}`,
        this.httpOptions
      )
      .pipe(catchError(this.handleError(false)));
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
