import { resetPasswordTokenDuration } from "../../configs/tokenConfig.js";
import apiError from "../../exceptions/apiError.js";
import { DbServiceBase } from "./dbServiceBase.js";
import { createILikeQuery } from "../../helpers/queryHelper.js";
import {User} from "../../models/userModel";
import {Token} from "../../models/tokenModel";

export class UsersDbServiceBase extends DbServiceBase {
  constructor() {
    super();
  }

  async createUser(user : User) {
    return await this.Knex("users")
      .insert(user)
      .then(async () => {
        if(user.login){
          return await this.Knex("users")
          .where({ login: user.login})
          .first();
        } else {
          return await this.Knex("users")
          .where({ email: user.email})
          .first();
        }
      })
      .catch((e) => {
        if (e.errno === 1062) {
          throw apiError.BadRequest("login or email must be unique");
        }
        throw apiError.InternalServerError(e);
      });
  }

  async getUserById(id : number) {
    return await this.Knex("users").where({ id: id }).first();
  }

  async getUser(user : User) {
    if(user.login){
      return await this.Knex("users").where({ login: user.login }).first();
    } else {
      return await this.Knex("users").where({ email: user.email }).first();
    }
  }

  async getAllUser(page : number, limit : number, query?) {
    query = createILikeQuery(query, ["login", "email"]);

    let value = this.Knex("users");

    query.forEach((query?) => {
      value = value.whereILike(query.key, query.value);
    });

    return value.paginate({ perPage: limit, currentPage: page });
  }

  async countUsers(query?) {
    if (!query) query = {};

    query = createILikeQuery(query, ["login", "email"]);

    let value = this.Knex("users");

    query.forEach((query?) => {
      value = value.whereILike(query.key, query.value);
    });

    const count = await value.count();
    return count[0]["count(*)"];
  }
}

export default new UsersDbServiceBase();
