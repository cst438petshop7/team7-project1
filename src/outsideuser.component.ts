import { User } from './user.component';
import { Pass } from './pass.component';
export class OutsideUser {
  user: User;
  pass: Pass;

  OutsideUser() {
    this.user = new User();
    this.pass = new Pass();
  }
}
