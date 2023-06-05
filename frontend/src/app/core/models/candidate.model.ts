import { Contact } from './contact.model';
import { Grade } from '../constants';
import { TableData } from '../../shared/models';

export type CandidatesData = TableData<Candidate>;

export interface Candidate {
  _id: string;
  fullName: string;
  country: string;
  city: string;
  contacts: Contact[];
  recruiterContact: Contact;
  skills: string[];
  lastContactDateMs: number;
  grade: Grade;
  experience: number;
}
