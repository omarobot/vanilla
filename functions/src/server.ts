// // import * as functions from "firebase-functions";

// // // Start writing Firebase Functions
// // // https://firebase.google.com/docs/functions/typescript
// //
// const express = require("express");
// const PORT = 3000;
// const app = express();

// app.get("/hello", (req, res, next) => {
//   res.send("Hello World!");
// });

// app.listen(PORT, () => {
//   console.log("Server is running on PORT", PORT);
// });

import express = require("express");
// Create a new express app instance
const app: express.Application = express();
app.get("/", function (req, res) {
  res.send("Hello World!");
});
app.listen(3000, function () {
  console.log("‘App is listening on port 3000!’");
});
