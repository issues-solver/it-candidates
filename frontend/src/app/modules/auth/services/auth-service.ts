import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignInCredentials } from '../models';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { User } from '../../../core/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public readonly ACCESS_TOKEN_COOKIE_KEY = 'accessToken';
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

  public getUser(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/user`);
  }

  public getAccessToken(): string {
    return this.cookieService.get(this.ACCESS_TOKEN_COOKIE_KEY);
  }

  public isTokenExpired(): boolean {
    const token = this.getAccessToken();
    if (token) {
      const tokenData = this.parseToken(token); // Parse the token to extract expiration information
      const expirationDate = new Date(tokenData.exp * 1000); // Convert the expiration timestamp to milliseconds

      // Compare the expiration date with the current date
      console.log('tokenData', tokenData);
      console.log('expirationDate', expirationDate);
      return expirationDate <= new Date();
    }
    return true; // Treat token as expired if it doesn't exist
  }

  private parseToken(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c: string) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  }
}
