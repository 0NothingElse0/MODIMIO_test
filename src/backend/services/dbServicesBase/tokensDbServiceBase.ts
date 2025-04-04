import { DbServiceBase } from "./dbServiceBase.js";
import {Token} from "../../models/tokenModel";

export class TokensDbServiceBase extends DbServiceBase {
  constructor() {
    super();
  }

  async deleteRefreshToken(id : number) {
    await this.addRefreshToken(id, null);
  }

  async deleteAccessToken(id : number) {
    await this.addAccessToken(id, null);
  }

  async addRefreshToken(id : number, token : string) {
    await this.Knex("users").where({ id: id }).update({ refreshToken: token });
  }

  async addAccessToken(id : number, token : string){
    await this.Knex("users").where({ id: id }).update({ accessToken: token });
  }
  async findUserByRefreshToken(refreshToken : string) {
    return await this.Knex("users")
      .where({ refreshToken: refreshToken })
      .first();
  }

  async findUserByAccessToken(accessToken : string) {
    return await this.Knex("users")
        .where({ accessToken: accessToken })
        .first();
  }
}

export default new TokensDbServiceBase();
