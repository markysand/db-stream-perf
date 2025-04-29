import { MongoClient } from "mongodb";
const databaseName = "performance_test";
const collectionName = "test_collection";
export async function getDb() {
  const client = new MongoClient("mongodb://localhost:27017", {
    monitorCommands: true,
  });

  await client.connect();

  const db = client.db(databaseName);
  const collection = db.collection(collectionName);

  return {
    collection,
    db,
    client,
  };
}
