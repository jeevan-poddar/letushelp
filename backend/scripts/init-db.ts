import fs from "fs";
import path from "path";
import pool from "../config/database.js";

async function initializeDatabase() {
  try {
    console.log("Initializing database...");

    // Read and execute schema.sql
    const schemaPath = path.join(process.cwd(), "schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf-8");

    await pool.query(schema);

    console.log("Database initialized successfully!");
    console.log("Tables created:");
    console.log("- users (with roles: user, provider)");
  } catch (error) {
    console.error("Error initializing database:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  initializeDatabase();
}

export { initializeDatabase };
