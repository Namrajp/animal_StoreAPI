const express = require("express");
const app = express();


require('dotenv').config();

app.use(express.static('./public'));
app.use(express.json());

const mongo = require("mongodb").MongoClient;
let db, collection;

const url = process.env.MONGO_URI || "mongodb://localhost:27017";
const client = mongo.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, client) => {
      if (err) {
        console.error(err);
        return;
      }
      //...
      console.log("Connected to db successfully.");
      
      db = client.db("kennel");
      collection = db.collection("animals");
    }
  );

app.get("/names", (req, res) => {
  collection.find().toArray((err, users) => {
    if (err) {
      console.log(err);
      return;
    }
    res.status(200).json({
      posts: users,
    });
  });
});
app.post("/animals", (req, res) => {
  const name = req.body.name;
  collection.insert({ name: name }, (err, result) => {
    if (err) {
      console.err(err);
      res.status(500).json({ err: err });
      // return;
    }
    res.status(200).json({ okey: true });
  });
});
app.get("/animal", (req, res) => {
  res.send("hello animal world");
});
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    app.listen(port, () => {
  console.log("Server is listening on port 5000");
})} catch (error) {
    console.error("Database connection failed:", error);
  }
};
start();

// to try post // @curl http://localhost:4000/animals -X POST -d '{"name": "Bhakti"}' -H "Content-type: application/json"
