import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SkillsService extends ApiService {
  constructor(override http: HttpClient) {
    super(http);
  }

  public getSkills(): Observable<string[]> {
    return this.get(`${environment.apiUrl}/skills`);
  }
}
