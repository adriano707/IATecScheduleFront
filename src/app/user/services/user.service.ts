import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  ObterTodasAsPessoas(): Observable<any>{
    return this.http.get<Observable<any>>(`${environment.UserService}users`);
  }

  ObterPessoas(filter = '', sortOrder = 'asc',
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

  obterTodos(filter: string = '', sortOrder: string = 'asc', pageNumber: number = 0, pageSize: number = 20): Observable<any> {
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

  cadastrarUsuario(data): Observable<any>{
    return this.http
      .post<any>(`${environment.UserService}users`, data);

  }
}
