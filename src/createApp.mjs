import express from "express";
import routes from "./routes/index.mjs"
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";

export function createApp() {
    const app = express();

app.use(express.json());
/// we want to make sure that we register cookie before routes otherwise it won't parse the cookies for those routes
app.use(cookieParser("helloworld"));
app.use(session({
  secret: "anson the dev",
  saveUninitialized: true,
  resave: false,
  cookie:{
    maxAge: 60000 * 60,
  },
  store: MongoStore.create({
    client: mongoose.connection.getClient(),
  }),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(routes)

app.post("/api/auth", passport.authenticate("local"), (request, response) => {
  response.sendStatus(200);
});

app.get("/api/auth/status", (request, response) => {
//   console.log("Inside /auth/status endpoint");
//   console.log(request.user);
//   console.log(request.session);
//   console.log(request.sessionID);
  return request.user ? response.send(request.user) : response.sendStatus(401);
});

app.post("/api/auth/logout", (request, response) => {
  if (request.user) return response.sendStatus(401);
  request.logout((err) => {
    if (err) return response.sendStatus(404);
    response.send(200);
  });
});

app.get("/api/auth/discord", passport.authenticate("discord"));
app.get("/api/auth/discord/redirect", passport.authenticate("discord"), (request, response) => {
  console.log(request.session);
  console.log(request.user);
  response.sendStatus(200);
});
return app;
}