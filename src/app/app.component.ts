import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public isTablet$: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Tablet);

  public title$!: Observable<string>;

  public navItems: { title: string; link: string; }[] = [
    { title: 'Candidates', link: 'candidates' },
    { title: 'Add Candidate', link: 'add-candidate' },
  ];

  public theme = 'default-theme';

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) {}
}
