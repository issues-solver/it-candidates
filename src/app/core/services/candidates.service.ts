import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CandidatesData } from '../models';

@Injectable({ providedIn: 'root' })
export class CandidatesService {
  constructor(private http: HttpClient) {}

  public getCandidates(): Observable<CandidatesData> {
    return this.http.get<CandidatesData>('http://localhost:3000/api/candidates');
  }
}
