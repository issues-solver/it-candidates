import { ContactType } from '../constants';

export interface Candidate {
  id: string;
  name: string;
  contacts: Partial<CandidateContacts>;
}

export interface CandidateContacts {
  [ContactType.Linkedin]: string;
  [ContactType.Email]: string;
  [ContactType.Telegram]: string;
  [ContactType.Other]: string;
}
