import { User } from './user.component';
export class OutsideUser {
  user: User;

  OutsideUser() {
    this.user = new User();
  }
}
