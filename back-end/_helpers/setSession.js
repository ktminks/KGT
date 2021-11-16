import session from "express-session";
import MongoStore from "connect-mongo";

export default function setSession(app, client) {
  const clientPromise = new Promise((res) => res(client));

  app.use(session({
    secret: process.env.SESSION_SECRET || "catballs",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      httpOnly: false,
      secure: "auto",
    },
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      clientPromise,
      dbName: "KGT",
      autoRemove: "interval",
      autoRemoveInterval: 60,
    }),
  }));
  console.log("Session set");
}
