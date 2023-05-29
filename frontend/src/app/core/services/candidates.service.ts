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

  public createCandidate(candidate: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/create-candidate', candidate)
  }

  public getPopularSkills(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:3000/api/popular-skills');
  }
}
