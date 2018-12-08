import { User } from './user.component';
import { Pass } from './pass.component';
export class OutsideUser {
  username: User;
  password: Pass;

  OutsideUser() {
    this.username = new User();
    this.password = new Pass();
  }
}
