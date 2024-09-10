import "reflect-metadata";
import { DataSource } from "typeorm";
import config from "./config/index";
import { User } from "./models/user.model";
import { Customer } from "./models/customer.model";
import { Item } from "./models/item.model";
import { Package } from "./models/package.model";
import { Shop } from "./models/shop.model";
import { Order } from "./models/order.model";
import { OrderItem } from "./models/orderItem.model";
import { Treatment } from "./models/treatment.model";
import { TreatmentCost } from "./models/treatmentCost.model"; // Import TreatmentCost
import logger from "./utils/logger";
import { hashPassword } from "./utils/hash";

const AppDataSource = new DataSource({
  type: "postgres",
  host: config.DB_HOST,
  port: Number(config.DB_PORT) || 5432,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  url: config.DATABASE_URL,
  logging: false,
  entities: ["src/models/**/*.ts"],
  migrations: ["src/migrations/**/*.ts"],
  migrationsTableName: "migrations",
  ssl: {
    rejectUnauthorized: false, // Necessary if you're connecting to a Render-hosted DB with SSL
  },
  
});

const createUsers = async () => {
  try {
    logger.info("Creating users...");
    const user1 = new User();
    user1.firstname = "John";
    user1.lastname = "Doe";
    user1.address = "7, Ibom street";
    user1.phone = "080338732773";
    user1.email = "johndoe@example.com";
    user1.password = await hashPassword("password");
    await AppDataSource.manager.save(user1);

    const user2 = new User();
    user2.firstname = "Jane";
    user2.lastname = "Doe";
    user2.address = "8, Ibom street";
    user2.phone = "080338732774";
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
    shop1.name = "Shop 7";
    shop1.user = users[0];
    shop1.description = "This is a shop";
    shop1.location = "Location 1";
    shop1.phone = "123-456-7890";
    shop1.imageUrl = "https://via.placeholder.com/150";
    
    await AppDataSource.manager.save(shop1);
    
    const shop2 = new Shop();
    shop2.name = "Shop 8";
    shop2.user = users[1];
    shop2.location = "Location 2";
    shop2.description = "This is another shop";
    shop2.phone = "098-765-4321";
    shop2.imageUrl = "https://via.placeholder.com/150";

    await AppDataSource.manager.save(shop2);

    logger.info("Shops created successfully.");
    return [shop1, shop2];
  } catch (error) {
    logger.error("Error creating shops: ", error.message);
    throw error;
  }
};

// const createPackages = async (shops: Shop[]) => {
//   try {
//     logger.info("Creating packages...");
//     const package1 = new Package();
//     package1.name = "Basic Package2";
//     package1.shop = shops[0];
//     await AppDataSource.manager.save(package1);

//     const package2 = new Package();
//     package2.name = "Premium Package2";
//     package2.shop = shops[1];
//     await AppDataSource.manager.save(package2);


//     const package3 = new Package();
//     package3.name = "Premium Package2";
//     package3.shop = shops[0];
//     await AppDataSource.manager.save(package3);

//     const package4 = new Package();
//     package4.name = "Premium Package2";
//     package4.shop = shops[0];
//     await AppDataSource.manager.save(package4);

//     logger.info("Packages created successfully.");
//     return [package1, package2, package3, package4];
//   } catch (error) {
//     logger.error("Error creating packages: ", error.message);
//     throw error;
//   }
// };
// const createItems = async (shops: Shop[]) => {
//   try {
//     logger.info("Creating items...");
    
//     const item1 = new Item();
//     item1.name = "Shirt";
//     item1.shop = shops[0];
//     await AppDataSource.manager.save(item1);

//     const item2 = new Item();
//     item2.name = "Pants";
//     item2.shop = shops[1];
//     await AppDataSource.manager.save(item2);

//     const item3 = new Item();
//     item3.name = "Shirt";
//     item3.shop = shops[0];
//     await AppDataSource.manager.save(item3);

//     const item4 = new Item();
//     item4.name = "Pants";
//     item4.shop = shops[0];
//     await AppDataSource.manager.save(item4);

//     logger.info("Items created successfully.");
//     return [item1, item2, item3, item4];
//   } catch (error) {
//     logger.error("Error creating items: ", error.message);
//     throw error;
//   }
// };

// const createTreatments = async (packages: Package[], items: Item[]) => {
//   try {
//     logger.info("Creating treatments...");

//     if (packages.length === 0) {
//       throw new Error("No packages available to associate with treatments.");
//     }

//     if (items.length === 0) {
//       throw new Error("No items available to associate with treatments.");
//     }

//     const treatments = [];
//     const treatmentCosts = [];

//     // Manually create Treatment 1 and its TreatmentCosts
//     const treatment1 = new Treatment();
//     treatment1.name = "Standard Treatment2";
//     treatment1.packages = [packages[0]];
//     await AppDataSource.manager.save(treatment1);
//     treatments.push(treatment1);

//     const treatmentCost1 = new TreatmentCost();
//     treatmentCost1.treatment = treatment1;
//     treatmentCost1.item = items[0];
//     treatmentCost1.cost = 50; // Manually specified cost
//     await AppDataSource.manager.save(treatmentCost1);
//     treatmentCosts.push(treatmentCost1);

//     const treatmentCost2 = new TreatmentCost();
//     treatmentCost2.treatment = treatment1;
//     treatmentCost2.item = items[1];
//     treatmentCost2.cost = 75; // Manually specified cost
//     await AppDataSource.manager.save(treatmentCost2);
//     treatmentCosts.push(treatmentCost2);

//     // Manually create Treatment 2 and its TreatmentCosts
//     const treatment2 = new Treatment();
//     treatment2.name = "Treatment3";
//     treatment2.packages = [packages[0]];
//     await AppDataSource.manager.save(treatment2);
//     treatments.push(treatment2);

//     const treatmentCost3 = new TreatmentCost();
//     treatmentCost3.treatment = treatment2;
//     treatmentCost3.item = items[0];
//     treatmentCost3.cost = 60; // Manually specified cost
//     await AppDataSource.manager.save(treatmentCost3);
//     treatmentCosts.push(treatmentCost3);

//     const treatmentCost4 = new TreatmentCost();
//     treatmentCost4.treatment = treatment2;
//     treatmentCost4.item = items[1];
//     treatmentCost4.cost = 85; // Manually specified cost
//     await AppDataSource.manager.save(treatmentCost4);
//     treatmentCosts.push(treatmentCost4);

//     // Repeat similar blocks for other treatments and their costs
//     // ...

//     logger.info("Treatments and treatment costs created successfully.");
//     return { treatments, treatmentCosts };
//   } catch (error) {
//     logger.error("Error creating treatments and treatment costs: ", error.message);
//     throw error;
//   }
// };



// const createTreatmentCosts = async (treatments: Treatment[]) => {
//   try {
//     logger.info("Creating treatment costs...");
//     const cost1 = new TreatmentCost();
//     cost1.treatment = treatments[0];
//     cost1.cost = 1030;
//     await AppDataSource.manager.save(cost1);

//     const cost2 = new TreatmentCost();
//     cost2.treatment = treatments[1];
//     cost2.cost = 1530;
//     await AppDataSource.manager.save(cost2);

//     logger.info("Treatment costs created successfully.");
//     return [cost1, cost2];
//   } catch (error) {
//     logger.error("Error creating treatment costs: ", error.message);
//     throw error;
//   }
// };

// const createCustomers = async (shops: Shop[]) => {
//   try {
//     logger.info("Creating customers...");
//     const customer1 = new Customer();
//     customer1.firstname = "Customer 333";
//     customer1.lastname = "Doe2";
//     customer1.address = "7, Ibom street";
//     customer1.phone = "080338732773";
//     customer1.email = "customer333@example.com";
//     customer1.shops = [shops[0]];
//     await AppDataSource.manager.save(customer1);

//     const customer2 = new Customer();
//     customer2.firstname = "Customer 444";
//     customer2.lastname = "Doe2";
//     customer2.address = "8, Ibom street";
//     customer2.phone = "080338732773";
//     customer2.email = "customer444@example.com";
//     customer2.shops = [shops[1]];
//     await AppDataSource.manager.save(customer2);

//     logger.info("Customers created successfully.");
//     return [customer1, customer2];
//   } catch (error) {
//     logger.error("Error creating customers: ", error.message);
//     throw error;
//   }
// };

// const createOrders = async (customers: Customer[], packages: Package[], shops: Shop[]) => {
//   try {
//     logger.info("Creating orders...");
//     const order1 = new Order();
//     order1.customer = customers[0];
//     order1.tag = "AA01";
//     order1.package = packages[0];
//     order1.shop = shops[0];
//     order1.status = "PENDING";
//     await AppDataSource.manager.save(order1);

//     const order2 = new Order();
//     order2.customer = customers[0];
//     order2.tag = "AA02";
//     order2.package = packages[1];
//     order2.shop = shops[1];
//     order2.status = "DELIVERED";
//     await AppDataSource.manager.save(order2);

//     logger.info("Orders created successfully.");
//     return [order1, order2];
//   } catch (error) {
//     logger.error("Error creating orders: ", error.message);
//     throw error;
//   }
// };

// const createOrderItems = async (orders: Order[], items: Item[], packages: Package[]) => {
//   try {
//     logger.info("Creating order items...");

//     // 
//     // Create OrderItem 1 with the first package
//     const orderItem1 = new OrderItem();
//     orderItem1.quantity = 2;
//     orderItem1.tag = "AA01-1";
//     orderItem1.order = orders[0];
//     orderItem1.item = items[0];
//     orderItem1.package = packages[0]; // Associate with the first package
//     await AppDataSource.manager.save(orderItem1);
//     // Create OrderItem 2 with the second package
//     const orderItem2 = new OrderItem();
//     orderItem2.quantity = 1;
//     orderItem2.tag = "AA01-2";
//     orderItem2.order = orders[0];
//     orderItem2.item = items[1];
//     orderItem2.package = packages[1]; // Associate with the second package
//     await AppDataSource.manager.save(orderItem2);

//     const orderItem3 = new OrderItem();
//     orderItem3.quantity = 2;
//     orderItem3.tag = "AA02-1";
//     orderItem3.order = orders[1];
//     orderItem3.item = items[0];
//     orderItem3.package = packages[0]; // Associate with the first package
//     await AppDataSource.manager.save(orderItem3);

//     const orderItem4 = new OrderItem();
//     orderItem4.quantity = 1;
//     orderItem4.tag = "AA02-2";
//     orderItem4.order = orders[1];
//     orderItem4.item = items[1];
//     orderItem4.package = packages[1]; // Associate with the second package
//     await AppDataSource.manager.save(orderItem4);

//     logger.info("Order items created successfully.");
//     return [orderItem1, orderItem2, orderItem3, orderItem4];
//   } catch (error) {
//     logger.error("Error creating order items: ", error.message);
//     throw error;
//   }
// };



const seed = async () => {
  try {
    await AppDataSource.initialize();
    const users = await createUsers();
    const shops = await createShops(users);
    // const packages = await createPackages(shops);
    // // const treatments = await createTreatments(packages);
    // // const treatmentCosts = await createTreatmentCosts(treatments);
    // const customers = await createCustomers(shops);
    // const orders = await createOrders(customers, packages, shops);
    // const items = await createItems(shops); // Add this line to create items
    // const { treatments, treatmentCosts } = await createTreatments(packages, items); // Pass items to createTreatments

    // const orderItems = await createOrderItems(orders, items, packages); // Add this line to create order items
    logger.info("Seeding completed successfully.");
    await AppDataSource.destroy();
  } catch (error) {
    logger.error("Error during seeding: ", error.message);
  }
};

seed().catch((error) => {
  logger.error("Unhandled error during seeding: ", error.message);
});
