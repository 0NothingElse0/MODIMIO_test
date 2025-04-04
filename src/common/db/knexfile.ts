import path from "path";
import dotenv from "dotenv";
dotenv.config({path: process.env.ENV_PATH});
let backendMigrationsDirectory = path.resolve("./src/backend/db/migrations");

if(process.env.ENV_PATH=="../../../.env") {
  backendMigrationsDirectory = path.resolve("../../backend/db/migrations");
}

const migrationsDirectories = [backendMigrationsDirectory];

const knexConfig =  {
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: migrationsDirectories,
      tableName: "knex_migrations",
    },
    useNullAsDefault: true,
  }
};

export default knexConfig;