const db = require("../config/db");
const warrantyValidationSchema = require("../validation/warranty.validation");
const queryGenerate = require("../utils/query.generate");

const getAllWarranties = (req, res) => {
  db.query("SELECT * FROM warranty", (err, result) => {
    if (err) return res.status(500).send({ message: err.message });
    res.status(200).send(result);
  });
};

const getWarrantyById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM warranty WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).send({ message: err.message });
    if (result.length === 0)
      return res.status(404).send({ message: "Not found" });
    res.status(200).send(result[0]);
  });
};

const createWarranty = (req, res) => {
  const { error } = warrantyValidationSchema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const { contract_id, warranty_period_month, warranty_start, warranty_end } =
    req.body;

  db.query(
    "INSERT INTO warranty (contract_id, warranty_period_month, warranty_start, warranty_end) VALUES (?, ?, ?, ?)",
    [contract_id, warranty_period_month, warranty_start, warranty_end],
    (err, result) => {
      if (err) return res.status(500).send({ message: err.message });
      res
        .status(201)
        .send({ message: "Warranty created", id: result.insertId });
    }
  );
};

const updateWarranty = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const { error } = warrantyValidationSchema.validate(data);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const updateStr = queryGenerate(data);
  const values = [...Object.values(data), id];

  db.query(`UPDATE warranty SET ${updateStr} WHERE id = ?`, values, (err) => {
    if (err) return res.status(500).send({ message: err.message });
    res.status(200).send({ message: "Warranty updated successfully" });
  });
};

const deleteWarranty = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM warranty WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).send({ message: err.message });
    res.status(200).send({ message: "Warranty deleted" });
  });
};

module.exports = {
  getAllWarranties,
  getWarrantyById,
  createWarranty,
  updateWarranty,
  deleteWarranty,
};
