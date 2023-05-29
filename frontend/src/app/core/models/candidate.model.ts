import { Contact } from './contact.model';
import { Grade } from '../constants';

export interface CandidatesData {
  candidates: Candidate[];
}

export interface Candidate {
  id: string;
  name: string;
  country: string;
  city: string;
  contacts: Contact[];
  recruiterContact: Contact;
  skills: string[];
  lastContactDateMs: number;
  grade: Grade;
  experience: number;
}
