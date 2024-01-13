require("dotenv").config();

import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express from "express";
import http from "http";
import { SocketIo } from "./lib/helper/socket-io";
import userMiddleware from "./view/middleware/user-middleware";
import userAuthRoute from "./view/route/user-auth-route";
import userBannerRoute from "./view/route/user-banner-route";
import userCartRoute from "./view/route/user-cart-route";
import userCategoryRoute from "./view/route/user-category-route";

const app = express();
const server = http.createServer(app);
const io = SocketIo.init(server);
const port = 1001;

//websocket
io.use(async (_, next) => {
  next();
}).on("connection", async (socket) => {
  console.log(socket);
});

//global middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//REST
app.use("/auth/user", userAuthRoute);
app.use("/user", userMiddleware);
app.use("/user/cart", userCartRoute);
app.use("/user/banner", userBannerRoute);
app.use("/user/category", userCategoryRoute);

app.get("/user/debug", async (req, res) => {
  const prisma = new PrismaClient();
  const userId = req.app.locals.id;

  const query = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      store: true,
    },
  });

  //store
  // const store = await prisma.store.create({
  //   data: {
  //     userId: userId,
  //     name: faker.company.name(),
  //     description: faker.lorem.lines({ min: 1, max: 3 }),
  //     address: faker.location.streetAddress(),
  //     phone: faker.phone.number(),
  //     lat: `${faker.location.latitude()}`,
  //     lng: `${faker.location.longitude()}`,
  //   },
  // });

  // await Promise.all(
  //   [...Array(10)].map(async (_) => {
  //     //category
  //     const category = await prisma.category.create({
  //       data: {
  //         name: faker.commerce.department(),
  //         picture: faker.image.urlLoremFlickr({ category: "fashion" }),
  //       },
  //     });

  //     await Promise.all(
  //       [...Array(25)].map(async (_) => {
  //         //product
  //         const product = await prisma.product.create({
  //           data: {
  //             storeId: store.id,
  //             categoryId: category.id,
  //             name: faker.commerce.productName(),
  //             description: faker.lorem.lines(1),
  //             picture: faker.image.urlLoremFlickr({ category: "fashion" }),
  //             stok: faker.number.int({ max: 100 }),
  //             price: faker.commerce.price({
  //               min: 1000,
  //               max: 1000000,
  //               dec: 0,
  //             }),
  //             wholesalePrice: faker.commerce.price({
  //               min: 1000,
  //               max: 1000000,
  //               dec: 0,
  //             }),
  //             wholesaleMin: faker.number.int({ min: 3, max: 10 }),
  //             unit: faker.science.unit.name,
  //             weight: faker.number.int({ min: 1000, max: 5000 }),
  //             sell: faker.number.int({ max: 999 }),
  //             view: faker.number.int({ max: 999 }),
  //             rating: faker.number.float({ max: 5 }),
  //           },
  //         });
  //       })
  //     );
  //   })
  // );

  // const cart = await prisma.cart.create({
  //   data: {
  //     userId: req.app.locals.id,
  //     qty: faker.number.int({ max: 5 }),
  //     total: faker.commerce.price({
  //       min: 1000,
  //       max: 1000000,
  //       dec: 0,
  //     }),
  //   },
  // });

  // await Promise.all(
  //   [...Array(20)].map(async (_) => {
  //     await prisma.cartItem.create({
  //       data: {
  //         cartId: cart.id,
  //         productId: randomUUID(),
  //         qty: faker.number.int({ max: 5 }),
  //         total: faker.commerce.price({
  //           min: 1000,
  //           max: 1000000,
  //           dec: 0,
  //         }),
  //       },
  //     });
  //   })
  // );

  res.json(query);
});

//route not found 404
app.use("*", (_, res) => res.status(404).json("Route path not found"));

server.listen(port);
