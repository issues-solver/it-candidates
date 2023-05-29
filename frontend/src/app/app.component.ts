import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { AuthService } from './modules/auth/services/auth-service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  public isTablet$: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Tablet);

  public title$!: Observable<string>;

  public theme = 'default-theme';

  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.checkLoggedInStatus();
    this.title$ = this.getPageTitle();
  }

  private getPageTitle(): Observable<string> {
    return this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let child = this.route.firstChild;
          while (child) {
            if (child.firstChild) {
              child = child.firstChild;
            } else if (child.snapshot?.data?.['title']) {
              return child.snapshot.data['title'];
            } else {
              return '';
            }
          }
          return '';
        })
      );
  }

  public logout() {
    this.authService.logout().subscribe();
  }

  public checkLoggedInStatus(): void {
    // Need it every time user reloads the page
    const isLoggedIn = this.authService.isLoggedIn;
    this.authService.updateLoggedInStatus(isLoggedIn);
  }
}
