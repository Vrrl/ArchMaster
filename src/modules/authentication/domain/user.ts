import { Entity } from '@src/core/domain/entity';

export interface UserProps {
  externalId: string;
  username: string;
  email: string;
  emailVerified: boolean;
}

export class User extends Entity<UserProps> {}
