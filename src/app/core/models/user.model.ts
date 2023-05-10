import { ContactType } from '../constants';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  contacts: Partial<UserContacts>;
}

export interface UserContacts {
  [ContactType.Linkedin]: string[];
  [ContactType.Telegram]: string[];
  [ContactType.Email]: string[];
  [ContactType.Discord]: string[];
  [ContactType.Slack]: string[];
}
