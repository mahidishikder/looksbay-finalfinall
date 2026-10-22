const dns = require("dns");
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {}

const fs = require("fs");
const path = require("path");
const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://looksbayAdmin:looksbayAdmin12345@cluster0.xf2ny.mongodb.net/looksbay?retryWrites=true&w=majority";

async function migrate() {
  console.log("Connecting to MongoDB Atlas...");
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("looksbay");

  // 1. Portfolio
  const portfolioPath = path.join(process.cwd(), "data", "portfolio.json");
  if (fs.existsSync(portfolioPath)) {
    const portfolio = JSON.parse(fs.readFileSync(portfolioPath, "utf-8") || "[]");
    if (portfolio.length > 0) {
      await db.collection("portfolio").deleteMany({});
      await db.collection("portfolio").insertMany(portfolio);
      console.log(`✅ Migrated ${portfolio.length} portfolio projects to MongoDB.`);
    }
  }

  // 2. Templates
  const templatesPath = path.join(process.cwd(), "data", "templates.json");
  if (fs.existsSync(templatesPath)) {
    const templates = JSON.parse(fs.readFileSync(templatesPath, "utf-8") || "[]");
    if (templates.length > 0) {
      await db.collection("templates").deleteMany({});
      await db.collection("templates").insertMany(templates);
      console.log(`✅ Migrated ${templates.length} templates to MongoDB.`);
    }
  }

  // 3. Inquiries
  const inquiriesPath = path.join(process.cwd(), "data", "inquiries.json");
  if (fs.existsSync(inquiriesPath)) {
    const inquiries = JSON.parse(fs.readFileSync(inquiriesPath, "utf-8") || "[]");
    if (inquiries.length > 0) {
      await db.collection("inquiries").deleteMany({});
      await db.collection("inquiries").insertMany(inquiries);
      console.log(`✅ Migrated ${inquiries.length} client inquiries to MongoDB.`);
    }
  }

  // 4. Analytics
  const analyticsPath = path.join(process.cwd(), "data", "analytics.json");
  if (fs.existsSync(analyticsPath)) {
    const analytics = JSON.parse(fs.readFileSync(analyticsPath, "utf-8") || "{}");
    await db.collection("analytics").updateOne(
      { key: "site_analytics" },
      { $set: { key: "site_analytics", data: analytics, updatedAt: new Date() } },
      { upsert: true }
    );
    console.log("✅ Migrated analytics tracking to MongoDB.");
  }

  await client.close();
  console.log("🎉 ALL DATA SUCCESSFULLY STORED IN MONGODB ATLAS!");
}

migrate().catch((err) => {
  console.error("Migration error:", err);
  process.exit(1);
});
