const db = require("../config/db");
const queryGenerate = require("../utils/query.generate");
const featureValidationSchema = require("../validation/features.validation");

const getAllFeatures = (req, res) => {
  db.query(`SELECT * FROM features`, (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.status(200).send({ data: result });
  });
};

const getFeatureById = (req, res) => {
  const { id } = req.params;
  db.query(`SELECT * FROM features WHERE id = ?`, [id], (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.status(200).send({ data: result[0] });
  });
};

const createFeature = (req, res) => {
  const { error } = featureValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  const { name, is_main, value_type } = req.body;
  db.query(
    `INSERT INTO features (name, is_main, value_type) VALUES (?, ?, ?)`,
    [name, is_main, value_type],
    (err, result) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      res
        .status(201)
        .send({ message: "Feature created successfully", id: result.insertId });
    }
  );
};

const updateFeature = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const { error } = featureValidationSchema.validate(data);

  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  const updateValue = queryGenerate(data);
  const values = Object.values(data);

  db.query(
    `UPDATE features SET ${updateValue} WHERE id = ?`,
    [...values, id],
    (err, result) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      res.status(200).send({ message: "Feature Updated successfully" });
    }
  );
};

const deleteFeature = (req, res) => {
  const { id } = req.params;
  db.query(`DELETE FROM features WHERE id = ?`, [id], (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.status(200).send({ message: "Feature deleted successfully" });
  });
};

module.exports = {
  getAllFeatures,
  getFeatureById,
  createFeature,
  updateFeature,
  deleteFeature,
};
