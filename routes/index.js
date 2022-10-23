var express = require("express");
var router = express.Router();

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
module.exports = router;
