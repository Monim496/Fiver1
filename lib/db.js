import { MongoClient } from "mongodb";
const { ObjectId } = require("mongodb");

export async function connectToDatabase() {
  let client;

  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.psik2ae.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

  try {
    client = new MongoClient(connectionString, {
      connectTimeoutMS: 300000,
      
    });
    console.log("Connecting to MongoDB Atlas cluster...");
    await client.connect();
    console.log("Successfully connected to MongoDB Atlas!");

    return client;
  } catch (error) {
    console.error("Connection to MongoDB Atlas failed!", error);
    process.exit();
  }
}

export async function getAllPosts() {
  const client = await connectToDatabase();
  const db = client.db();

  const data = await db.collection("PostedItem").find({}).toArray();

  return data;
}

export async function getPostDataById(id) {
  const client = await connectToDatabase();
  const usersCollection = client.db().collection("PostedItem");
  const postobjectId = new ObjectId(id);

  const user = await usersCollection.findOne({
    _id: postobjectId,
  });

  return user;
}

export async function getResponseDataById(id) {
  const client = await connectToDatabase();

  const usersCollection = client.db().collection("QAnswers");

  const user = await usersCollection
    .find({
      PostID: id,
    })
    .toArray();
  return user;
}

export async function fetchallemails() {
  const client = await connectToDatabase();

  const usersCollection = client.db().collection("users");

  const allemails = await usersCollection
    .find({}, { projection: { password: 0, name: 0, _id: 0 } })
    .toArray();

  return allemails;
}
