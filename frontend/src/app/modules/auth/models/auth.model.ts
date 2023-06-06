import { User } from '../../../core/models';

export interface SignInCredentials extends Pick<User, 'email' | 'password'> {}

export interface SignUpCredentials extends User {}
