import { Contact } from './contact.model';
import { Grade } from '../constants';
import { PageParams, TableData } from '../../shared/models';

export type CandidatesData = TableData<Candidate>;

export interface Candidate {
  _id: string;
  fullName: string;
  contacts: Contact[];
  recruiterContact: Contact;
  skills: string[];
  lastContactDateMs: number;
  grade: Grade;
  experience: number;
}

export interface CandidateFilterParams {
  fullName: string | null;
  recruiterContact: string | null;
  skills: string[];
  grade: Grade | null;
  experience: number | null;
}

export interface CandidateParams extends CandidateFilterParams, PageParams {}
