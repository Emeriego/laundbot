import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./models/user.model";
import { Customer } from "./models/customer.model";
import { Item } from "./models/item.model";
import { Package } from "./models/package.model";
import { Shop } from "./models/shop.model";
import { Order } from "./models/order.model";
import { OrderItem } from "./models/orderItem.model";
import { Treatment } from "./models/treatment.model";
import config from "./config";

const isDevelopment = config.NODE_ENV === "development";

const AppDataSource = new DataSource({
  type: "postgres",
  host: config.DB_HOST,
  port: Number(config.DB_PORT) || 5432,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  synchronize: isDevelopment,
  logging: false,
  entities: [
    User,
    Customer,
    Item,
    Package,
    Shop,
    Order,
    OrderItem,
    Treatment,
  ],
  migrations: ["src/migrations/**/*.ts"],
  migrationsTableName: "migrations",
  // Uncomment and configure SSL if needed
  // ssl: true,
  // extra: {
  //   ssl: {
  //     rejectUnauthorized: false,
  //   },
  // },
});

export async function initializeDataSource() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
}

export default AppDataSource;
