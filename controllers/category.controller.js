const db = require("../config/db");
const queryGenerate = require("../utils/query.generate");
const categoryValidationSchema = require("../validation/category.validation");

const getAllCategories = (req, res) => {
  db.query(`SELECT * FROM category`, (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.status(200).send({ data: result });
  });
};

const getCategoryById = (req, res) => {
  const { id } = req.params;
  db.query(`SELECT * FROM category WHERE id = ?`, [id], (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.status(200).send({ data: result[0] });
  });
};

const createCategory = (req, res) => {
  const { error } = categoryValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  const { name } = req.body;
  db.query(`INSERT INTO category (name) VALUES (?)`, [name], (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res
      .status(201)
      .send({ message: "Category created successfully", id: result.insertId });
  });
};

const updateCategory = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const { error } = categoryValidationSchema.validate(data);

  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  const updateValue = queryGenerate(data);
  const values = Object.values(data);

  db.query(
    `UPDATE category SET ${updateValue} WHERE id = ?`,
    [...values, id],
    (err, result) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      res.status(200).send({ message: "Category Updated successfully" });
    }
  );
};

const deleteCategory = (req, res) => {
  const { id } = req.params;
  db.query(`DELETE FROM category WHERE id = ?`, [id], (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.status(200).send({ message: "Category deleted successfully" });
  });
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
