import { StringLiteral } from "typescript";

export class UserDto {
  constructor(user : {
    id? : number,
    login? : string,
    email? : string,
    isActivate? : boolean,
    role? : string;
  }) {
    this.id = user.id;
    this.login = user.login;
    this.email = user.email;
    this.isActivate = user.isActivate;
    this.role = user.role;
  }

  id? : number;
  login? : string;
  email? : string;
  isActivate? : boolean;
  role? : string;
}
