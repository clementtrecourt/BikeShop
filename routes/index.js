var express = require("express");
var router = express.Router();
const stripe = require("stripe")(
  "sk_test_51IbPPsG7aOX6S6V1nJ7Yq3xnWWSTcX1hGYsxymx1JyGDSjGsu87KYO43EqLJ5QhT22vVxErrjzLSdfzAjUbwUL2I00LEznhtV0"
);
const YOUR_DOMAIN = "http://localhost:3000/";
let dataBike = [
  {
    name: "BIKO45",
    image: "/images/bike-1.jpg",
    price: "536",
    quantity: "1",
  },
  {
    name: "ZOOK7",
    image: "/images/bike-2.jpg",
    price: "642",
    quantity: "1",
  },
  {
    name: "LIKO91",
    image: "/images/bike-3.jpg",
    price: "232",
    quantity: "1",
  },
];
/* GET home page. */
router.get("/", function (req, res, next) {
  if (req.session.basketBike == undefined) {
    req.session.basketBike = [];
  }
  console.log(req.session.basketBike);
  res.render("index", { title: "Express", dataBike });
});
router.get("/shop", function (req, res, next) {
  let bikeRef = req.query.ref;
  console.log(req.session.basketBike.length);
  if (req.session.basketBike.length != 0) {
    for (let i = 0; i < req.session.basketBike.length; i++) {
      console.log(i);
      console.log("hello");
      if (req.session.basketBike[i].name === req.query.name) {
        console.log("add quantity");
        req.session.basketBike[i].quantity++;
      } else {
        console.log("else");
        req.session.basketBike.push({
          name: req.query.name,
          price: req.query.price,
          image: req.query.image,
          quantity: req.query.quantity,
        });
      }
    }
  } else {
    req.session.basketBike.push({
      name: req.query.name,
      price: req.query.price,
      image: req.query.image,
      quantity: req.query.quantity,
    });
  }

  res.render("shop", { basketBike: req.session.basketBike, ref: bikeRef });
});
router.post("/updateShop", function (req, res, next) {
  console.log("hello");
  let position = req.body.position;
  let newQuantity = req.body.quantity;
  req.session.basketBike[position].quantity = newQuantity;
  res.render("shop", { basketBike: req.session.basketBike });
});
router.get("/delete", function (req, res, next) {
  console.log(req.query.position);
  req.session.basketBike.splice(req.query.position, 1);
  console.log(req.session.basketBike);
  res.render("shop", { basketBike: req.session.basketBike });
});
router.post("/create-checkout-session", async (req, res) => {
  let stripeItems = [];
  for (var i = 0; i < req.session.basketBike.length; i++) {
    stripeItems.push({
      price_data: {
        currency: "eur",
        product_data: {
          name: req.session.basketBike[i].name,
        },
        unit_amount: req.session.basketBike[i].price * 100,
      },
      quantity: req.session.basketBike[i].quantity,
    });
  }
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: stripeItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/",
  });

  res.redirect(303, session.url);
});
router.get("/success", function (req, res, next) {
  res.render("success", { title: "Express" });
});
module.exports = router;
