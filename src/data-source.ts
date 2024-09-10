import "reflect-metadata";
import { DataSource } from "typeorm";
import config from "./config/index";
const isDevelopment = config.NODE_ENV === "development";

const AppDataSource = new DataSource({
  type: "postgres",
  url: config.DATABASE_URL,
  synchronize: isDevelopment,
  logging: false,
  entities: ["build/models/**/*.js"],
  migrations: ["src/migrations/**/*.ts"],
  migrationsTableName: "migrations",
  ssl: {
    rejectUnauthorized: false, // Necessary if you're connecting to a Render-hosted DB with SSL
  },
  
});

// host: config.DB_HOST,
// port: Number(config.DB_PORT) || 5432,
// username: config.DB_USER,
// password: config.DB_PASSWORD,
// database: config.DB_NAME,


export async function initializeDataSource() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
}

export default AppDataSource;
