require("dotenv").config();

import cors from "cors";
import express from "express";
import http from "http";
import { SortingDirection } from "./lib/config/type";
import ProductController from "./lib/controller/product-controller";
import { SocketIo } from "./lib/helper/socket-io";
import { ProductSortingField } from "./lib/model/product-model";
import userMiddleware from "./view/middleware/user-middleware";
import userAuthRoute from "./view/route/user-auth-route";
import userBannerRoute from "./view/route/user-banner-route";
import userCategoryRoute from "./view/route/user-category-route";
import userProductRoute from "./view/route/user-product-route";

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
// app.use(queryParser);

//REST
app.use("/auth/user", userAuthRoute);
app.use("/user", userMiddleware);
app.use("/user/banner", userBannerRoute);
app.use("/user/category", userCategoryRoute);
app.use("/user/product", userProductRoute);

app.get("/user/debug", async (req, res) => {
  // const userId = req.app.locals.id;

  // const query = {
  //   name: "kebab",
  //   age: 20,
  // };

  // const url = new URL("http://192.168.10.32:1001/banner");
  // url.search = new URLSearchParams(query as any) as any;

  // console.log(url.href);

  // await Promise.all(
  //   [...Array(10)].map(async (_) => {
  //     await prisma.banner.create({
  //       data: {
  //         name: faker.commerce.productName(),
  //         picture: faker.image.urlLoremFlickr({ category: "food" }),
  //         active: true,
  //         big: true,
  //       },
  //     });
  //   })
  // );

  // const query = await prisma.user.findFirst({
  //   where: {
  //     id: userId,
  //   },
  //   include: {
  //     store: true,
  //   },
  // });

  // store
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
  //   [...Array(20)].map(async (_) => {
  //     //category
  //     const category = await prisma.category.create({
  //       data: {
  //         name: faker.commerce.department(),
  //         picture: faker.image.urlLoremFlickr({ category: "food" }),
  //         active: true,
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
  //             picture: faker.image.urlLoremFlickr({ category: "food" }),
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

  // let condition: any = { where: { active: true } };

  // condition.where = {active: false, asd:'asd' };

  const productController = new ProductController();

  const result = await productController.getFilteredProduct({
    filter: req.query,
    paginate: { skip: 0, take: 2 },
    sort: {
      field: ProductSortingField.PRICE,
      direction: SortingDirection.DESC,
    },
  });

  res.json(result);
});

//route not found 404
app.use("*", (_, res) => res.status(404).json("Route path not found"));

server.listen(port);
