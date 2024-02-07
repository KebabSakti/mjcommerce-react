require("dotenv").config();

import cors from "cors";
import express from "express";
import http from "http";
import { prisma } from "./lib/helper/prisma";
import { SocketIo } from "./lib/helper/socket-io";
import userMiddleware from "./view/middleware/user-middleware";
import userAccountRoute from "./view/route/user-account-route";
import userBannerRoute from "./view/route/user-banner-route";
import userCartRoute from "./view/route/user-cart-route";
import userCategoryRoute from "./view/route/user-category-route";
import userProductRatingRoute from "./view/route/user-product-rating-route";
import userProductRoute from "./view/route/user-product-route";
import userAuthRoute from "./view/route/user-auth-route";

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

//REST API
app.use("/user/auth", userAuthRoute);
app.use("/user/banner", userBannerRoute);
app.use("/user/category", userCategoryRoute);
app.use("/user/product", userProductRoute);
app.use("/user/product-rating", userProductRatingRoute);
//============================================================//
app.use("/user/protected", userMiddleware);
app.use("/user/protected/account", userAccountRoute);
app.use("/user/protected/cart", userCartRoute);

app.get("/user/debug", async (req, res) => {
  // const userId = randomUUID();

  // const query = {
  //   name: "kebab",
  //   age: 20,
  // };

  // const url = new URL("http://192.168.10.32:1001/banner");
  // url.search = new URLSearchParams(query as any) as any;

  // console.log(url.href);

  // const user = await prisma.user.create({
  //   data: {
  //     id: userId,
  //   },
  // });

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
  //             sell: faker.number.int({ max: 999 }),
  //             view: faker.number.int({ max: 999 }),
  //             rating: faker.number.float({ max: 5 }),
  //           },
  //         });

  //         await Promise.all(
  //           [...Array(10)].map(async (_) => {
  //             await prisma.productVariant.create({
  //               data: {
  //                 productId: product.id,
  //                 name: faker.commerce.productName(),
  //                 stok: faker.number.int({ max: 100 }),
  //                 price: faker.commerce.price({
  //                   min: 1000,
  //                   max: 1000000,
  //                   dec: 0,
  //                 }),
  //                 wholesalePrice: faker.commerce.price({
  //                   min: 1000,
  //                   max: 1000000,
  //                   dec: 0,
  //                 }),
  //                 wholesaleMin: faker.number.int({ min: 3, max: 10 }),
  //                 unit: faker.science.unit.name,
  //                 weight: faker.number.int({ min: 1000, max: 5000 }),
  //               },
  //             });
  //           })
  //         );
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

  // const productController = new ProductController();

  // const result = await productController.getFilteredProduct({
  //   filter: req.query,
  //   paginate: { skip: 0, take: 2 },
  //   sort: {
  //     field: ProductSortingField.PRICE,
  //     direction: SortingDirection.DESC,
  //   },
  // });

  // const products = await prisma.product.findMany({
  //   include: { productVariant: true },
  // });

  // await Promise.all(
  //   products.map(async (e) => {
  //     await prisma.product.update({
  //       where: { id: e.id },
  //       data: {
  //         price: e.productVariant[0].price,
  //       },
  //     });

  //     await Promise.all(
  //       [...Array(100)].map(async () => {
  //         await prisma.productRating.create({
  //           data: {
  //             productId: e.id,
  //             userId: "73929587-4053-446e-ac20-31a79c07a86d",
  //             productName: e.productVariant![0].name,
  //             rating: faker.number.float({ min: 1, max: 5 }),
  //             comment: faker.lorem.paragraph(),
  //           },
  //         });
  //       })
  //     );
  //   })
  // );

  const data = await prisma.$transaction(async (tx) => {
    const query = await tx.cart.upsert({
      where: { userId: "73929587-4053-446e-ac20-31a79c07a86d" },
      update: {
        qty: 2,
        total: 20,
      },
      create: {
        userId: "73929587-4053-446e-ac20-31a79c07a86d",
        qty: 1,
        total: 10,
      },
    });

    return query;
  });

  console.log(data);

  res.end();
});

app.post("/user/debug", async (req, res) => {
  res.end();
});

//route not found 404
app.use("*", (_, res) => res.status(404).json("Route path not found"));

server.listen(port);
