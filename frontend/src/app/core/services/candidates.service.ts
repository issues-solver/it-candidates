import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidate, CandidatesData } from '../models';
import { TableLoadData } from '../../shared/models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CandidatesService {
  constructor(private http: HttpClient) {}

  public getCandidates(data: TableLoadData): Observable<CandidatesData> {
    const { page, limit } = data;
    return this.http.get<CandidatesData>(`${environment.apiUrl}/candidates?page=${page}&limit=${limit}`);
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
