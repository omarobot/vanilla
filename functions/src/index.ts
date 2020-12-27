// import * as functions from "firebase-functions";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";

//initialize firebase inorder to access its services
admin.initializeApp(functions.config().firebase);

// rest of the code remains same
const app = express();
const main = express();

//add the path to receive request and set json as bodyParser to process the body

main.use("/", app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

//initialize the database and the collection
const db = admin.firestore();
const userCollection = "users";

console.log(db);
console.log(userCollection);

interface User {
  firstName: String;
  lastName: String;
  userName: String;
  email: String;
}

app.use(cors());

// Create new user
app.post("/users", async (req, res) => {
  try {
    const user: User = {
      firstName: req.body["firstName"],
      lastName: req.body["lastName"],
      userName: req.body["userName"],
      email: req.body["email"],
    };

    const newDoc = await db.collection(userCollection).add(user);
    res.status(201).send(`Created a new user: ${newDoc.id}`);
  } catch (error) {
    res
      .status(400)
      .send(
        `User should contain firstName, lastName, email, areaNumber, department, id and contactNumber!!!`
      );
  }
});

//get all users
app.get("/users", async (req, res) => {
  try {
    const userQuerySnapshot = await db.collection(userCollection).get();
    const users: any[] = [];
    userQuerySnapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

//get a single contact
app.get("/users/:userId", (req, res) => {
  const userId = req.params.userId;
  db.collection(userCollection)
    .doc(userId)
    .get()
    .then((user) => {
      if (!user.exists) throw new Error("User not found");
      res.status(200).json({ id: user.id, data: user.data() });
    })
    .catch((error) => res.status(500).send(error));
});

// Delete a user
app.delete("/users/:userId", (req, res) => {
  db.collection(userCollection)
    .doc(req.params.userId)
    .delete()
    .then(() => res.status(204).send("Document successfully deleted!"))
    .catch(function (error) {
      res.status(500).send(error);
    });
});

// Update user
app.put("/users/:userId", async (req, res) => {
  await db
    .collection(userCollection)
    .doc(req.params.userId)
    .set(req.body, { merge: true })
    .then(() => res.json({ id: req.params.userId }))
    .catch((error) => res.status(500).send(error));
});

app.get("/name", (req: any, res: any) => res.json({ username: "papi" }));

app.get("/first", (req: any, res: any) => res.json({ username: "omar" }));

//define google cloud function name
export const api = functions.https.onRequest(main);

// const PORT = 8000;
// app.listen(PORT, () => {
//   console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
// });

// app.get("/", (req: any, res: any) => res.send("Express + TypeScript Server"));

// app.get("/name", (req: any, res: any) => res.json({ username: "papi" }));

// app.get("/first", (req: any, res: any) => res.json({ username: "omar" }));

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello Papi!", { structuredData: true });
//   response.send("What's Good!");
// });
