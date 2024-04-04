import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _httpClient = inject(HttpClient);

  get<T>(urlPath: string, params?: HttpParams): Observable<T> {
    return this._httpClient.get<T>(urlPath.replace(/\s/g, ''), {
      params: params,
    });
  }

  post<T>(urlPath: string, body: {} = {}): Observable<T> {
    return this._httpClient.post<T>(urlPath.replace(/\s/g, ''), body);
  }
}
