const db = require("../config/db");
const queryGenerate = require("../utils/query.generate");
const laptopValidationSchema = require("../validation/laptops.validation");

const getAllLaptops = (req, res) => {
  db.query(`SELECT * FROM laptops`, (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.status(200).send({ data: result });
  });
};

const getLaptopById = (req, res) => {
  const { id } = req.params;
  db.query(`SELECT * FROM laptops WHERE id = ?`, [id], (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.status(200).send({ data: result[0] });
  });
};

const createLaptop = (req, res) => {
  const { error } = laptopValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  const { name, brand_id, price, quantity, release_date, category_id } =
    req.body;

  db.query(
    `INSERT INTO laptops (name, brand_id, price, quantity, release_date, category_id) 
    VALUES (?, ?, ?, ?, ?, ?)`,
    [name, brand_id, price, quantity, release_date, category_id],
    (err, result) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      res.status(201).send({
        message: "Laptop created successfully",
        id: result.insertId,
      });
    }
  );
};

const updateLaptop = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const { error } = laptopValidationSchema.validate(data);

  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  const updateValue = queryGenerate(data);
  const values = Object.values(data);

  db.query(
    `UPDATE laptops SET ${updateValue} WHERE id = ?`,
    [...values, id],
    (err, result) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      res.status(200).send({ message: "Laptop Updated successfully" });
    }
  );
};

const deleteLaptop = (req, res) => {
  const { id } = req.params;
  db.query(`DELETE FROM laptops WHERE id = ?`, [id], (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }

    res.status(200).send({ message: "Laptop deleted successfully" });
  });
};

module.exports = {
  getAllLaptops,
  getLaptopById,
  createLaptop,
  updateLaptop,
  deleteLaptop,
};
