import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidate, CandidateParams, CandidatesData } from '../models';
import { environment } from '../../../environments/environment';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class CandidatesService extends ApiService {
  constructor(override http: HttpClient) {
    super(http);
  }

  public getCandidates(params: CandidateParams): Observable<CandidatesData> {
    return this.get<CandidatesData>(
      `${environment.apiUrl}/candidates`, params);
  }

  public getCandidate(id: string): Observable<Candidate> {
    return this.http.get<Candidate>(`${environment.apiUrl}/candidate?id=${id}`);
  }

  public createCandidate(candidate: Candidate): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/create-candidate', candidate)
  }

  public editCandidate(id: string, candidate: Candidate): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/edit-candidate/${id}`, candidate);
  }

  public deleteCandidate(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/delete-candidate/${id}`);
  }

  public getPopularSkills(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:3000/api/popular-skills');
  }
}
