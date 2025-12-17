const { MongoClient } = require("mongodb");
const url =
  "mongodb+srv://badshahvirus:mahakal%402004%40@namaste.pdv9blg.mongodb.net/namaste?retryWrites=true&w=majority";
const client = new MongoClient(url);

const dbName = "namaste";

async function main() {
  await client.connect();
  console.log("connected successfully to server ");
  const db = client.db(dbName);
  const collection = db.collection("nam");

  //read the data in the database
  const findres = await collection.find({}).count();
  console.log("found document", findres);

  //push the data into database
  // const data = {
  //   firstname: "khalanayak",
  //   lastname: "3 idiots",
  //   city: "pruthaviraj gadh",
  // };
  // const insertdata = await collection.insertOne(data);
  // console.log("insert data successfully", insertdata);
  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
