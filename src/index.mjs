// import express, { request, response } from "express";
// import { query, validationResult, body, matchedData, checkSchema } from "express-validator";
// import { createUserValidationSchema} from './utils/validationSchemas.mjs';
// import usersRouter from "./routes/users.mjs";
// import { mockUsers } from "./utils/constants.mjs"
// import { resolveIndexByUserId } from "./utils/middlewares.mjs";
// import productsRouter from "./routes/products.mjs"

//Client ID: 1219285401718751355
//Client Secret: aMN-A4lyn4OBLyDUYauOEPvzUOm-3Mbj
// Redirect URL: http://localhost:3000/api/auth/discord/redirect


// import routes from "./routes/index.mjs"
// import cookieParser from "cookie-parser";
// import session from "express-session";
// import { mockUsers } from "./utils/constants.mjs";
// import { body } from "express-validator";
// import passport from "passport";
// import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import './strategies/local-strategy.mjs'
import { createApp } from "./createApp.mjs";
// import "./strategies/discord-strategy.mjs";

mongoose.connect("mongodb://localhost:27017/") /*localhost:27017 */
.then(() => console.log("Connected to database"))
.catch((err) => console.log(`Error: ${err}`));

const app = createApp();

// const app = express();

// app.use(express.json());
// /// we want to make sure that we register cookie before routes otherwise it won't parse the cookies for those routes
// app.use(cookieParser("helloworld"));
// app.use(session({
//   secret: "anson the dev",
//   saveUninitialized: true,
//   resave: false,
//   cookie:{
//     maxAge: 60000 * 60,
//   },
//   store: MongoStore.create({
//     client: mongoose.connection.getClient(),
//   }),
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// app.use(routes)

// app.post("/api/auth", passport.authenticate("local"), (request, response) => {
//   response.sendStatus(200);
// });

// app.get("/api/auth/status", (request, response) => {
//   console.log("Inside /auth/status endpoint");
//   console.log(request.user);
//   console.log(request.session);
//   console.log(request.sessionID);
//   return request.user ? response.send(request.user) : response.sendStatus(401);
// });

// app.post("/api/auth/logout", (request, response) => {
//   if (request.user) return response.sendStatus(401);
//   request.logout((err) => {
//     if (err) return response.sendStatus(404);
//     response.send(200);
//   });
// });

// app.get("/api/auth/discord", passport.authenticate("discord"));
// app.get("/api/auth/discord/redirect", passport.authenticate("discord"), (request, response) => {
//   console.log(request.session);
//   console.log(request.user);
//   response.sendStatus(200);
// });

// app.use(usersRouter);
////Middleware
// const loggingMiddleware = (request, response, next) => {
//   console.log(`${request.method} - ${request.url}`);
//   next();
// };

///looging or registering middleware globaly
// app.use(loggingMiddleware);
// const resolveIndexByUserId = (request, response, next) => {
//   const {
//     params: { id },
//   } = request;
//   const parsedId = parseInt(id);
//   if (isNaN(parsedId)) return response.sendStatus(400);
//   const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
//   if (findUserIndex === -1) return response.sendStatus(404);
//   request.findUserIndex = findUserIndex;
//   next();
// };

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Running on port ${PORT}");
});

// const mockUsers = [
//   { id: 1, username: "anson", displayName: "Anson" },
//   { id: 2, username: "jack", displayName: "Jack" },
//   { id: 3, username: "adam", displayName: "Adam" },
//   { id: 4, username: "tina", displayName: "Tina" },
//   { id: 5, username: "jason", displayName: "Jason" },
//   { id: 6, username: "henry", displayName: "Henry" },
//   { id: 7, username: "marilyn", displayName: "Marilyn" },
// ];
///get & looging or registering middleware for certain points(Middlewar must be register before routes)
// app.get("/", (request, response) => {
//     console.log(request.session);
//     console.log(request.session.id);
//     request.session.visited = true;
//     response.cookie("hello", "world", {maxAge: 40000, signed: true });
//     response.status(201).send({ msg: "Hello" });
//   }
// );

// app.post('/api/auth', (request, response) => {
//   const {
//     body: { username, password },
//   } = request;
//   const findUser = mockUsers.find((user) => user.username === username);
//   if (!findUser || findUser.password !== password)
//   return response.status(401).send({ msg: "Bad Credentials" });

//   request.session.user = findUser;
//   return response.status(200).send(findUser);
// });

// app.get('/api/auth/status', (request, response) => {
//   request.sessionStore.get(request.sessionID, (err, session) =>{
//     console.log(session);
//   });
//   return request.session.user
//   ? response.status(200).send(request.session.user)
//   : response.status(401).send({ msg: "Not authenticated" });
// });

// app.post('/api/cart', (request, response) => {
//   if (!request.session.user) return response.sendStatus(401);
//   const { body: item } = request;
  
//   const { cart } = request.session;
//   if (cart) {
//     cart.push(item);
//   } else {
//     request.session.cart = [item];
//   }
//   return response.status(201).send(item);
  
// });

// app.get("/api/cart", (request, response) => {
//   if (!request.session.user) return response.sendStatus(401);
//   return response.send(request.session.cart ?? []);
// });

///get, query parameter are parsed as string so even if you pass in a numeric value in the address bar as the query parameter for our filter or really any query parameter it's going to be parsed as a string

// app.get(
//   "/api/users",
//   query("filter")
//     .isString()
//     .notEmpty()
//     .withMessage("must not be Empty")
//     .isLength({ min: 3, max: 10 })
//     .withMessage("must be between 3 to 10 char"),
//   (request, response) => {
//     const result = validationResult(request);
//     console.log(result);
//     const {
//       query: { filter, value },
//     } = request;

//     if (filter && value)
//       return response.send(
//         mockUsers.filter((user) => user[filter].includes(value))
//       );
//     return response.send(mockUsers);
//   }
// );
///Registering Middleware:
// app.use(loggingMiddleware, (request, response, next) => {
//   console.log("finished Logging...");
//   next();
// });

///post
// app.post(
//   "/api/users", checkSchema(createUserValidationSchema), (request, response) => {
//     const result = validationResult(request);
//     console.log(result);
//     if (!result.isEmpty())
//       return response.status(400).send({ errors: result.array() });
//     const data = matchedData(request);
//     console.log(data);
//     const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...data };
//     mockUsers.push(newUser);
//     return response.status(201).send(newUser);
//   }
// );

// app.get("/api/users/:id", resolveIndexByUserId, (request, response) => {
//   const { findUserIndex } = request;
//   const findUser = mockUsers[findUserIndex];
//   if (!findUser) return response.sendStatus(404);
//   return response.send(findUser);
// });

// app.get("/api/products", (request, response) => {
//   response.send([{ id: 123, name: "chicken breast", price: 12.99 }]);
// });
// ///put
// app.put("/api/users/:id", resolveIndexByUserId, (request, response) => {
//   const { body, findUserIndex } = request;

//   mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
//   return response.sendStatus(200);
// });
// ///patch
// app.patch("/api/users/:id", resolveIndexByUserId, (request, response) => {
//   const { body, findUserIndex } = request;

//   mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
//   return response.sendStatus(200);
// });
// ///delete
// app.delete("/api/users/:id", resolveIndexByUserId, (request, response) => {
//   const { findUserIndex } = request;

//   mockUsers.splice(findUserIndex, 1);
//   return response.sendStatus(200);
// });
