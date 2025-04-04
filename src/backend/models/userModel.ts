export class User {
  constructor(user : {
    id? : number,
    login? : string,
    email? : string,
    role? : string,
    isActivate? : boolean,
    accessToken? : string,
    refreshToken? : string,
    password? : string,
  }) {
    this.id = user.id;
    this.login = user.login;
    this.email = user.email;
    this.role = user.role;
    this.isActivate = user.isActivate;
    this.accessToken = user. accessToken;
    this.refreshToken = user.refreshToken;
    this.password = user.password;
  }

  id? : number;
  login? : string;
  email? : string;
  role? : string;
  isActivate? : boolean;
  accessToken? : string;
  refreshToken? : string;
  password? : string;
}
