import "reflect-metadata";
import { DataSource } from "typeorm";
import config from "./config";
// import { User, Shop, Package, Order, OrderItem, Item, Treatment, Customer } from "./models";
import { User } from "./models/user.model";
import { Customer } from "./models/customer.model";
import { Item } from "./models/item.model";
import { Package } from "./models/package.model";
import { Shop } from "./models/shop.model";
import { Order } from "./models/order.model";
import { OrderItem } from "./models/orderItem.model";
import { Treatment } from "./models/treatment.model";
import logger from "./utils/logger";
import { hashPassword } from "./utils/hash";

const AppDataSource = new DataSource({
  type: "postgres",
  host: config.DB_HOST,
  port: Number(config.DB_PORT) || 5432,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  synchronize: true, // use true for development to sync the database
  logging: false,
  entities: ["src/models/**/*.ts"],
  migrations: ["src/migrations/**/*.ts"],
  migrationsTableName: "migrations",
});

const createUsers = async () => {
  try {
    logger.info("Creating users...");
    const user1 = new User();
    user1.name = "John Doe";
    user1.email = "johndoe@example.com";
    user1.password = await hashPassword("password");
    await AppDataSource.manager.save(user1);

    const user2 = new User();
    user2.name = "Jane Doe";
    user2.email = "janedoe@example.com";
    user2.password = await hashPassword("password");
    await AppDataSource.manager.save(user2);

    logger.info("Users created successfully.");
    return [user1, user2];
  } catch (error) {
    logger.error("Error creating users: ", error.message);
    throw error;
  }
};

const createShops = async (users: User[]) => {
  try {
    logger.info("Creating shops...");
    const shop1 = new Shop();
    shop1.name = "Shop 1";
    shop1.user = users[0];
    await AppDataSource.manager.save(shop1);

    const shop2 = new Shop();
    shop2.name = "Shop 2";
    shop2.user = users[1];
    await AppDataSource.manager.save(shop2);

    logger.info("Shops created successfully.");
    return [shop1, shop2];
  } catch (error) {
    logger.error("Error creating shops: ", error.message);
    throw error;
  }
};

const createPackages = async (shops: Shop[]) => {
  try {
    logger.info("Creating packages...");
    const package1 = new Package();
    package1.name = "Basic Package";
    package1.shop = shops[0];
    await AppDataSource.manager.save(package1);

    const package2 = new Package();
    package2.name = "Premium Package";
    package2.shop = shops[1];
    await AppDataSource.manager.save(package2);

    logger.info("Packages created successfully.");
    return [package1, package2];
  } catch (error) {
    logger.error("Error creating packages: ", error.message);
    throw error;
  }
};

const createCustomers = async () => {
  try {
    logger.info("Creating customers...");
    const customer1 = new Customer();
    customer1.name = "Customer 1";
    await AppDataSource.manager.save(customer1);

    const customer2 = new Customer();
    customer2.name = "Customer 2";
    await AppDataSource.manager.save(customer2);

    logger.info("Customers created successfully.");
    return [customer1, customer2];
  } catch (error) {
    logger.error("Error creating customers: ", error.message);
    throw error;
  }
};

const createOrders = async (customers: Customer[], packages: Package[]) => {
  try {
    logger.info("Creating orders...");
    const order1 = new Order();
    order1.customer = customers[0];
    order1.package = packages[0];
    await AppDataSource.manager.save(order1);

    const order2 = new Order();
    order2.customer = customers[1];
    order2.package = packages[1];
    await AppDataSource.manager.save(order2);

    logger.info("Orders created successfully.");
    return [order1, order2];
  } catch (error) {
    logger.error("Error creating orders: ", error.message);
    throw error;
  }
};

const createOrderItems = async (orders: Order[], items: Item[]) => {
  try {
    logger.info("Creating order items...");
    const orderItem1 = new OrderItem();
    orderItem1.order = orders[0];
    orderItem1.item = items[0];
    await AppDataSource.manager.save(orderItem1);

    const orderItem2 = new OrderItem();
    orderItem2.order = orders[1];
    orderItem2.item = items[1];
    await AppDataSource.manager.save(orderItem2);

    logger.info("Order items created successfully.");
    return [orderItem1, orderItem2];
  } catch (error) {
    logger.error("Error creating order items: ", error.message);
    throw error;
  }
};

const createItems = async () => {
  try {
    logger.info("Creating items...");
    const item1 = new Item();
    item1.name = "Shirt";
    await AppDataSource.manager.save(item1);

    const item2 = new Item();
    item2.name = "Pants";
    await AppDataSource.manager.save(item2);

    logger.info("Items created successfully.");
    return [item1, item2];
  } catch (error) {
    logger.error("Error creating items: ", error.message);
    throw error;
  }
};

const createTreatments = async () => {
  try {
    logger.info("Creating treatments...");
    const treatment1 = new Treatment();
    treatment1.name = "Washing";
    treatment1.cost = 10;
    await AppDataSource.manager.save(treatment1);

    const treatment2 = new Treatment();
    treatment2.name = "Ironing";
    treatment2.cost = 5;
    await AppDataSource.manager.save(treatment2);

    logger.info("Treatments created successfully.");
    return [treatment1, treatment2];
  } catch (error) {
    logger.error("Error creating treatments: ", error.message);
    throw error;
  }
};

const seed = async () => {
  try {
    await AppDataSource.initialize();
    const users = await createUsers();
    const shops = await createShops(users);
    const packages = await createPackages(shops);
    const customers = await createCustomers();
    const orders = await createOrders(customers, packages);
    const items = await createItems();
    await createOrderItems(orders, items);
    await createTreatments();
    logger.info("Seeding completed successfully.");
    await AppDataSource.destroy();
  } catch (error) {
    logger.error("Error during seeding: ", error.message);
  }
};

seed().catch((error) => {
  logger.error("Unhandled error during seeding: ", error.message);
});
