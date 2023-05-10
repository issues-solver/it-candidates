import { ContactType } from '../constants';

export interface CandidatesData {
  candidates: Candidate[];
}

export interface Candidate {
  id: string;
  name: string;
  contacts: Partial<CandidateContacts>;
}

export interface CandidateContacts {
  [ContactType.Linkedin]: string;
  [ContactType.Telegram]: string;
  [ContactType.Email]: string;
  [ContactType.Discord]: string;
  [ContactType.Slack]: string;
}
