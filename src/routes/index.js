const { Router, request, response } = require("express");
//const { response, request } = require("../app");
const router = Router();
const admin = require("firebase-admin");

var serviceAccount = require("../../node-firebase-e9197-firebase-adminsdk-8sa9m-bd657b4c97.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://node-firebase-e9197-default-rtdb.firebaseio.com/",
});

const db = admin.database();

router.get("/", (require, response) => {
  db.ref("contacts").once("value", (snapshot) => {
    const data = snapshot.val();
    response.render("index", { contacts: data });
  });
});

router.post("/new-contact", (request, response) => {
  const newContact = {
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    phone: request.body.phone,
  };
  db.ref("contacts").push(newContact);
  response.redirect("/");
});

router.get("/delete-contact/:id", (request, response) => {
  db.ref("contacts/" + request.params.id).remove();
  response.redirect("/");
});
module.exports = router;
