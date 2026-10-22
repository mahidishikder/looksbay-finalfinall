import { MongoClient, Db } from "mongodb";
import dns from "dns";

// Configure reliable DNS servers to avoid Windows SRV lookup failures
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {}

const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://looksbayAdmin:looksbayAdmin12345@cluster0.xf2ny.mongodb.net/looksbay?retryWrites=true&w=majority";

const options = {
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 5000,
};

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export function isMongoConfigured(): boolean {
  return Boolean(
    uri && (uri.startsWith("mongodb://") || uri.startsWith("mongodb+srv://"))
  );
}

export async function getMongoClient(): Promise<MongoClient | null> {
  if (!isMongoConfigured()) return null;

  try {
    if (process.env.NODE_ENV === "development") {
      if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect().catch((err) => {
          global._mongoClientPromise = undefined;
          throw err;
        });
      }
      return await global._mongoClientPromise;
    } else {
      if (!clientPromise) {
        client = new MongoClient(uri, options);
        clientPromise = client.connect().catch((err) => {
          clientPromise = null;
          throw err;
        });
      }
      return await clientPromise;
    }
  } catch (err: any) {
    console.warn("MongoDB connection fallback to local:", err?.message || err);
    return null;
  }
}

export async function getMongoDb(): Promise<Db | null> {
  const connectedClient = await getMongoClient();
  if (!connectedClient) return null;
  const dbName = process.env.MONGODB_DB || "looksbay";
  return connectedClient.db(dbName);
}
