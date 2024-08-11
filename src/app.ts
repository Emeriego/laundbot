import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import "reflect-metadata";
import swaggerUi from "swagger-ui-express";
import config from "./config";
import AppDataSource from "./data-source";
// import { errorHandler, routeNotFound } from "./middleware";
// import {
//   adminRouter,
//   authRoute,
//   blogRouter,
//   contactRouter,
//   exportRouter,
//   faqRouter,
//   helpRouter,
//   jobRouter,
//   notificationRouter,
//   paymentFlutterwaveRouter,
//   paymentRouter,
//   paymentStripeRouter,
//   productRouter,
//   runTestRouter,
//   sendEmailRoute,
//   testimonialRoute,
//   userRouter,
// } from "./routes";
import authRoute  from "./routes/auth.route";
import shopRoute  from "./routes/shop.route";
import itemRoutes from "./routes/item.route";
import customerRoute  from "./routes/customer.route";
import orderRoutes from "./routes/order.route";

import swaggerSpec from "./swaggerConfig";
import logger from "./utils/logger";
dotenv.config();

const port = config.port;
const server: Express = express();
server.options("*", cors());
server.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Authorization",
    ],
  }),
);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get("/", (req: Request, res: Response) => {
  res.send({ message: "I am the laundbot API" });
});
server.get("/api", (req: Request, res: Response) => {
  res.json({ message: "I am the laundbot API waiting for requests" });
});

server.use("/api", authRoute);
server.use("/api", customerRoute);
// server.use("/api/v1/queues", ServerAdapter.getRouter());
server.use("/api", shopRoute);
server.use("/api", itemRoutes);
server.use("/api", orderRoutes);
// server.use("/api", productRouter);
// server.use("/api", paymentFlutterwaveRouter);
// server.use("/api", paymentStripeRouter);
// server.use("/api", smsRouter);
// server.use("/api", notificationRouter);
// server.use("/api", paymentRouter);
// server.use("/api", orgRouter);
// server.use("/api", exportRouter);
// server.use("/api", testimonialRoute);
// server.use("/api", blogRouter);
// server.use("/api", contactRouter);
// server.use("/api", jobRouter);
// server.use("/api", faqRouter);
// server.use("/api", roleRouter);

server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// server.use(routeNotFound);
// server.use(errorHandler);

AppDataSource.initialize()
  .then(async () => {
    server.listen(port, () => {
      logger.info(`Server is listening on port ${port}`);
    });
  })
  .catch((error) => console.error(error));

export default server;
