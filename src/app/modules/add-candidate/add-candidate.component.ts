import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCandidateComponent {}
