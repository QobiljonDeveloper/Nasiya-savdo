const db = require("../config/db");
const contractValidationSchema = require("../validation/contracts.validation");

const getAllContracts = (req, res) => {
  db.query("SELECT * FROM contracts", (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.status(200).send({ data: result });
  });
};

const getContractById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM contracts WHERE id = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    if (!result.length) {
      return res.status(404).send({ message: "Contract not found" });
    }
    res.status(200).send({ data: result[0] });
  });
};

const createContract = (req, res) => {
  const { error } = contractValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  const {
    customer_id,
    laptop_id,
    contract_date,
    duration_month,
    total_price_with_interest,
    contract_status,
    interest_rate,
    base_price,
    initial_payment,
    first_payment_date,
    monthly_payment,
    amount_paid,
    remaining_balance,
    end_payment_date,
  } = req.body;

  db.query(
    `INSERT INTO contracts (
      customer_id, laptop_id, contract_date, duration_month, 
      total_price_with_interest, contract_status, interest_rate, 
      base_price, initial_payment, first_payment_date, 
      monthly_payment, amount_paid, remaining_balance, end_payment_date
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      customer_id,
      laptop_id,
      contract_date,
      duration_month,
      total_price_with_interest,
      contract_status,
      interest_rate,
      base_price,
      initial_payment,
      first_payment_date,
      monthly_payment,
      amount_paid,
      remaining_balance,
      end_payment_date,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      res.status(201).send({
        message: "Contract created successfully",
        id: result.insertId,
      });
    }
  );
};

const updateContract = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const { error } = contractValidationSchema.validate(data);

  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  const updateValues = Object.entries(data)
    .map(([key, value]) => `${key} = ?`)
    .join(", ");
  const values = Object.values(data);

  db.query(
    `UPDATE contracts SET ${updateValues} WHERE id = ?`,
    [...values, id],
    (err, result) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      res.status(200).send({ message: "Contract updated successfully" });
    }
  );
};

const deleteContract = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM contracts WHERE id = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.status(200).send({ message: "Contract deleted successfully" });
  });
};

module.exports = {
  getAllContracts,
  getContractById,
  createContract,
  updateContract,
  deleteContract,
};
