import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NavItem } from '../../core/models';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainNavComponent {
  public navItems: NavItem[] = [
    { title: 'Candidates', link: 'candidates', shown: false, },
    { title: 'Add Candidate', link: 'add-candidate', shown: false, },
    { title: 'Sign in', link: 'signin', shown: true, },
    { title: 'Sign Up', link: 'signup', shown: true, },
  ];

  @Input() isMobileMode = false;

  @Input() set isLoggedIn(isLoggedIn: boolean | null) {
    this.updateNavItems(isLoggedIn);
  }

  @Output() navItemClick = new EventEmitter<void>();

  public updateNavItems(isLoggedIn: boolean | null) {
    this.navItems = [
      { title: 'Candidates', link: 'candidates', shown: !!isLoggedIn, },
      { title: 'Add Candidate', link: 'add-candidate', shown: !!isLoggedIn, },
      { title: 'Sign in', link: 'signin', shown: !isLoggedIn, },
      { title: 'Sign Up', link: 'signup', shown: !isLoggedIn, },
    ];
  }
}
