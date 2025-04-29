import { getDb } from "./db.js";

const MAX_DOCUMENTS = 2000;

const DATA_LENGTH = 1000;

const DATA = "a".repeat(DATA_LENGTH);

async function main() {
  const { collection, client } = await getDb();

  await collection.deleteMany({});

  console.log("deleted");

  for (let index = 0; index < MAX_DOCUMENTS; index++) {
    await collection.insertOne({
      data: DATA,
    });

    if (index % 50 === 0) {
      console.log(index);
    }
  }

  console.log(`inserted ${MAX_DOCUMENTS} documents`);

  client.close();

  console.log("client closed");
}

main();
