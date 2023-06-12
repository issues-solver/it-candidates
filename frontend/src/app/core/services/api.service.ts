import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomHttpParamEncoder } from '../utils/http-params-encoder';

interface Params {
  [param: string]: any;
}

type Headers = HttpHeaders | { [header: string]: string | string[] };

export abstract class ApiService {
  protected constructor(protected http: HttpClient) {}

  public get<T>(url: string, params: Params = {}, headers?: Headers): Observable<T> {
    return this.http.get<T>(url, { headers, params: this.generateParams(params) });
  }

  public post<T>(
    url: string,
    body: any | null,
    params: Params = {},
    headers?: Headers,
  ): Observable<T> {
    return this.http.post<T>(url, body, { headers, params: this.generateParams(params) });
  }

  public put<T>(
    url: string,
    body: any | null,
    params: Params = {},
    headers?: Headers,
  ): Observable<T> {
    return this.http.put<T>(url, body, { headers, params: this.generateParams(params) });
  }

  public delete<T>(url: string, params: Params = {}, headers?: Headers): Observable<T> {
    return this.http.delete<T>(url, { headers, params: this.generateParams(params) });
  }

  private generateParams(params: Params): HttpParams {
    let httpParams = new HttpParams({ encoder: new CustomHttpParamEncoder() });

    Object.keys(params).forEach((key: string) => {
      if (params[key] === undefined || params[key] === null || params[key] === '') {
        return;
      }
      if (Array.isArray(params[key])) {
        if (params[key].length) {
          httpParams = httpParams.append(key, params[key]);
        }
        return;
      }
      httpParams = httpParams.append(key, params[key]);
    });
    return httpParams;
  }
}
