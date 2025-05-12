const db = require("../config/db");
const queryGenerate = require("../utils/query.generate");
const brandValidationSchema = require("../validation/brand.validation.");

const getAllBrands = (req, res) => {
  db.query(`SELECT * FROM brands`, (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.status(200).send({ data: result });
  });
};

const getBrandById = (req, res) => {
  const { id } = req.params;
  db.query(`SELECT * FROM brands WHERE id = ?`, [id], (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.status(200).send({ data: result[0] });
  });
};

const createBrand = (req, res) => {
  const { error } = brandValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  const { name } = req.body;
  db.query(`INSERT INTO brands (name) VALUES (?)`, [name], (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res
      .status(201)
      .send({ message: "Brand created successfully", id: result.insertId });
  });
};

const updateBrand = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const { error } = brandValidationSchema.validate(data);

  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  const updateValue = queryGenerate(data);
  const values = Object.values(data);

  db.query(
    `UPDATE brands SET ${updateValue} WHERE id = ?`,
    [...values, id],
    (err, result) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      res.status(200).send({ message: "Brand Updated successfully" });
    }
  );
};

const deleteBrand = (req, res) => {
  const { id } = req.params;
  db.query(`DELETE FROM brands WHERE id = ?`, [id], (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.status(200).send({ message: "Brand deleted successfully" });
  });
};

module.exports = {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
};
