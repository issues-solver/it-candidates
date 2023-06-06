import { Contact } from './contact.model';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  contacts: Contact[];
}
