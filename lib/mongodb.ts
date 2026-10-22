import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI || "";
const options = {};

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export function isMongoConfigured(): boolean {
  return Boolean(
    process.env.MONGODB_URI &&
      (process.env.MONGODB_URI.startsWith("mongodb://") ||
        process.env.MONGODB_URI.startsWith("mongodb+srv://"))
  );
}

export async function getMongoClient(): Promise<MongoClient | null> {
  if (!isMongoConfigured()) return null;

  try {
    if (process.env.NODE_ENV === "development") {
      if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
      }
      return await global._mongoClientPromise;
    } else {
      if (!clientPromise) {
        client = new MongoClient(uri, options);
        clientPromise = client.connect();
      }
      return await clientPromise;
    }
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    return null;
  }
}

export async function getMongoDb(): Promise<Db | null> {
  const connectedClient = await getMongoClient();
  if (!connectedClient) return null;
  const dbName = process.env.MONGODB_DB || "looksbay";
  return connectedClient.db(dbName);
}
