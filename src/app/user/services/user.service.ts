import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map, retry} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  url = 'http://localhost:44317/users';

  GetAllPeople(): Observable<any>{
    return this.http.get<Observable<any>>(`${environment.UserService}users`);
  }

  GetUser(): Observable<User[]>{
    return this.http.get<User[]>(this.url)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )

  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

  GetPeople(filter = '', sortOrder = 'asc',
               pageNumber = 0, pageSize = 10): Observable<any>{
    return this.http.get<Observable<any>>(`${environment.UserService}users`, {
      params: new HttpParams()
        .set('Filter', filter)
        .set('SortOrder', sortOrder)
        .set('PageNumber', pageNumber.toString())
        .set('PageSize', pageSize.toString())
    })
      .pipe(
        map(res =>  res)
      );
  }

  GetAll(filter: string = '', sortOrder: string = 'asc', pageNumber: number = 0, pageSize: number = 20): Observable<any> {
    return this.http.get<Observable<any>>(`${environment.UserService}users`, {
      params: new HttpParams()
        .set('Filter', filter)
        .set('SortOrder', sortOrder)
        .set('PageNumber', pageNumber.toString())
        .set('PageSize', pageSize.toString())
    })
      .pipe(
        map(res =>  res)
      );
  }

  RegisterUser(data): Observable<any>{
    return this.http
      .post<any>(`${environment.UserService}users`, data);

  }
}
