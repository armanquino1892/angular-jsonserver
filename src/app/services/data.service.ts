import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const BASE_URL = environment.apiConfig.baseUrl;


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(private _httpClient: HttpClient) { }

  public get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
    console.log(BASE_URL + path);
    return this._httpClient.get(BASE_URL + path, { params }).pipe(
      catchError(this.formatErrors)
    );
  }

  public put<T>(path: string, body: object = {}): Observable<T> {
    return this._httpClient
      .put(BASE_URL + path, JSON.stringify(body), this.options)
      .pipe(catchError(this.formatErrors));
  }

  public post<T>(path: string, body: object = {}): Observable<T> {
    return this._httpClient
      .post(BASE_URL + path, JSON.stringify(body), this.options)
      .pipe(catchError(this.formatErrors));
  }

  public delete(path: string): Observable<any> {
    return this._httpClient.delete(BASE_URL + path).pipe(catchError(this.formatErrors));
  }

  public formatErrors(error: any): Observable<any> {
    return throwError(error.error);
  }
}
