const db = require("../config/db");
const queryGenerate = require("../utils/query.generate");
const paymentValidationSchema = require("../validation/payment.validation");

const getAllPayments = (req, res) => {
  db.query(`SELECT * FROM payments`, (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.status(200).send({ data: result });
  });
};

const getPaymentById = (req, res) => {
  const { id } = req.params;
  db.query(`SELECT * FROM payments WHERE id = ?`, [id], (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.status(200).send({ data: result[0] });
  });
};

const createPayment = (req, res) => {
  const { error } = paymentValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  const { contract_id, amount_paid, payment_method, paid_date } = req.body;

  db.query(
    `INSERT INTO payments (contract_id, amount_paid, payment_method, paid_date) VALUES (?, ?, ?, ?)`,
    [contract_id, amount_paid, payment_method, paid_date],
    (err, result) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      res.status(201).send({
        message: "Payment created successfully",
        id: result.insertId,
      });
    }
  );
};

const updatePayment = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const { error } = paymentValidationSchema.validate(data);

  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  const updateValue = queryGenerate(data);
  const values = Object.values(data);

  db.query(
    `UPDATE payments SET ${updateValue} WHERE id = ?`,
    [...values, id],
    (err, result) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      res.status(200).send({ message: "Payment Updated successfully" });
    }
  );
};

const deletePayment = (req, res) => {
  const { id } = req.params;
  db.query(`DELETE FROM payments WHERE id = ?`, [id], (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }

    res.status(200).send({ message: "Payment deleted successfully" });
  });
};

module.exports = {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
};
