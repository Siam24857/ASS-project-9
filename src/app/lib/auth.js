import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error("MONGO_URI is missing");
}

let client;
let clientPromise;

if (!global._mongoClientPromise) {

  client = new MongoClient(uri);

  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

const mongoClient = await clientPromise;

const db = mongoClient.db(
  process.env.MONGODB_DB_NAME || "user"
);

export const auth = betterAuth({
  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 60 * 60 * 24 * 7,
    },
  },

  plugins: [
    jwt(),
  ],
});