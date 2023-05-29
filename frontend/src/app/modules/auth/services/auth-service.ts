import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignInCredentials } from '../models';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly ACCESS_TOKEN_COOKIE_KEY = 'accessToken';
  private isLoggedIn$$ = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedIn$$.asObservable();

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
  ) {}

  public updateLoggedInStatus(loggedIn: boolean): void {
    this.isLoggedIn$$.next(loggedIn);
  }

  get isLoggedIn(): boolean {
    return this.isLoggedIn$$.getValue() || !!this.cookieService.get(this.ACCESS_TOKEN_COOKIE_KEY);
  }

  public signin(data: SignInCredentials) {
    return this.http.post<any>('http://localhost:3000/api/signin', data)
      .pipe(
        tap((res) => {
          this.updateLoggedInStatus(true);
          this.cookieService.set(this.ACCESS_TOKEN_COOKIE_KEY, res.accessToken);
          this.router.navigate(['/candidates']);
        }),
      );
  }

  public signup(data: SignInCredentials): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/signup`, data)
      .pipe(
        tap((res) => {
          this.updateLoggedInStatus(true);
          this.cookieService.set(this.ACCESS_TOKEN_COOKIE_KEY, res.accessToken);
          this.router.navigate(['/candidates']);
        }),
      );
  }

  public logout() {
    return this.http.post<any>(`${environment.apiUrl}/logout`, {})
      .pipe(
        tap(() => {
          this.cookieService.delete(this.ACCESS_TOKEN_COOKIE_KEY);
          this.updateLoggedInStatus(false);
          this.router.navigate(['/welcome']);
        }),
      );
  }
}
