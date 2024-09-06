import swaggerJsdoc from "swagger-jsdoc";
import config from "./config";
import { UserSchema } from "./swagger/user.schema";
import { OrderSchema } from "./swagger/order.schema";
import { CustomerSchema } from "./swagger/customer.schema";
import { ShopSchema } from "./swagger/shop.schema";
import { ItemSchema } from "./swagger/item.schema";
import { PackageSchema } from "./swagger/package.schema";
import { TreatmentCostSchema } from "./swagger/treatmentCost.schema";
import { TreatmentSchema } from "./swagger/treatment.schema";

// Import other schemas

const swaggerDefinition = {
  openapi: "3.1.0",
  info: {
    title: "Laundbot API",
    version: "1.0.0",
    description: "API documentation for the Laundbot application.",
  },
  servers: [
    {
      url: `http://localhost:${config.port}/`,
      description: "Local server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      User: UserSchema,
      Order: OrderSchema,
      Customer: CustomerSchema,
      Shop: ShopSchema,
      Item: ItemSchema,
      Package: PackageSchema,
      TreatmentCost: TreatmentCostSchema,
      Treatment: TreatmentSchema,
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [
    "./src/controllers/*.ts",
  ],
};

const specs = swaggerJsdoc(options);

export default specs;
