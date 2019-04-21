import { User } from './user';

export class Comment {
  id: number;
  user: User;
  date: Date;
  is_admin_comment: boolean;
  text: string;
}
