import knex from "knex";
import knexfile from "../../../common/db/knexfile.js";
import { attachPaginate } from "knex-paginate";

attachPaginate();

export class DbServiceBase {
  Knex;

  constructor() {
    this.Knex = knex(knexfile[process.env.NODE_ENV]);
  }
}

export default new DbServiceBase();
