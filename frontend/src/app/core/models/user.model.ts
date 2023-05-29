import { Contact } from './contact.model';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  contacts: Contact[];
}
