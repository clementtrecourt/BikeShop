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
  res.render("index", { title: "Express", dataBike });
});
let basketBike = [];
router.get("/shop", function (req, res, next) {
  let bikeRef = req.query.ref;
  basketBike.push(req.query);
  console.log("one", basketBike);
  res.render("shop", { title: "Express", basketBike, ref: bikeRef });
});
router.post("/updateShop", function (req, res, next) {
  console.log("hello");
  let position = req.body.position;
  let newQuantity = req.body.quantity;
  console.log("basketBike", basketBike[0]);
  console.log("position", position);
  basketBike[position].quantity = newQuantity;
  res.render("shop", { basketBike });
});
router.get("/delete", function (req, res, next) {
  console.log(req.query.position);
  basketBike.splice(req.query.position, 1);
  console.log(basketBike);
  res.render("shop", { basketBike });
});
module.exports = router;
