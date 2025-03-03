const express = require("express");
const router = express.Router();
const connection = require("../database/db");
router.post("/addRecord", (req, res) => {
    if (!req.body.amount ||!req.body.category) {
      return res.status(400).json({ error: "Missing required fields" });
    }
   //console.log(req.body.amount, req.body.category, req.body.label);
    //
  const amount = req.body.amount;
  const category = req.body.category;
  let label = req.body.label;
  if (!label) {
    label = "";
  }
  connection.query(
    "CALL add_record(?,?,?)",
    [amount, category, label],
    (error, results) => {
      if (error) {
        console.error("Error adding record:", error);
        res.status(500).json({ error: "Failed to add record" });
      } else {
        console.log("Record added successfully");
        res.status(200).json({ message: "Record added successfully" });
      }
    }
  );
});

module.exports = router;
