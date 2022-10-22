var express = require("express");
var router = express.Router();
let dataBike = [
  {
    name: "BIKO45",
    image: "/images/bike-1.jpg",
    price: "536",
    quantity: "4",
  },
  {
    name: "ZOOK7",
    image: "/images/bike-2.jpg",
    price: "642",
    quantity: "2",
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
router.get("/shop", function (req, res, next) {
  res.render("shop", { title: "Express", dataBike });
});

module.exports = router;
