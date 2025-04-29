import express from "express";
import { getDb } from "./db.js";

async function main() {
  setInterval(() => {
    const { arrayBuffers, external, heapUsed } = process.memoryUsage();
    console.log(
      "Memory usage:",
      ((arrayBuffers + external + heapUsed) / 1024 / 1024).toPrecision(3),
      "MB"
    );
  }, 500);

  const { collection } = await getDb();

  const app = express();

  app.get("/stream/:limit", async (req, res) => {
    const limit = parseInt(req.params.limit, 10);
    if (isNaN(limit) || limit <= 0) {
      return res.status(400).send("Invalid limit");
    }

    const cursor = collection
      .find(
        {},
        {
          limit,
        }
      )
      .stream();

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Transfer-Encoding", "chunked");

    res.write("[");

    let first = true;

    cursor.on("data", (data) => {
      {
        if (!first) {
          res.write(",");
        } else {
          first = false;
        }
        res.write(JSON.stringify(data));
      }
    });

    cursor.on("error", (err) => {
      console.error("Error:", err);
      res.status(500).send("Internal Server Error");
    });

    cursor.on("end", () => {
      res.write("]");
      res.end();
    });
  });

  app.get("/plain/:limit", async (req, res) => {
    const limit = parseInt(req.params.limit, 10);

    if (isNaN(limit) || limit <= 0) {
      return res.status(400).send("Invalid limit");
    }

    const data = await collection
      .find(
        {},
        {
          limit,
        }
      )
      .toArray();

    res.setHeader("Content-Type", "application/json");

    res.status(200);

    res.json(data);

    res.end();
  });

  app.listen(3001, () => console.log("listening on port 3001"));
}

main();
