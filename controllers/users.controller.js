const db = require("../config/db");
const queryGenerate = require("../utils/query.generate");
const userValidationSchema = require("../validation/user.validation");

const getAllUsers = (req, res) => {
  db.query(`SELECT * FROM users`, (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.status(200).send({ data: result });
  });
};

const getUsersById = (req, res) => {
  const { id } = req.params;
  db.query(`SELECT * FROM users WHERE id =?`, [id], (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.status(200).send({ data: result[0] });
  });
};

const createUser = (req, res) => {
  const { error } = userValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  const {
    full_name,
    email,
    phone,
    address,
    location,
    passport_id,
    card_number,
  } = req.body;
  db.query(
    `INSERT INTO users (full_name, email, phone, address, location, passport_id, card_number) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [full_name, email, phone, address, location, passport_id, card_number],
    (err, result) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      res
        .status(201)
        .send({ message: "User created successfully", id: result.insertId });
    }
  );
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const { error } = userValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  const updateValue = queryGenerate(data);
  const values = Object.values(data);

  db.query(
    `UPDATE users SET ${updateValue} WHERE id = ?`,
    [...values, id],
    (err, result) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      res.status(200).send({ message: "User Updated successfully" });
    }
  );
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  db.query(`DELETE FROM users WHERE id = ?`, [id], (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }

    res.status(200).send({ message: "User o'chirildi" });
  });
};

module.exports = {
  getAllUsers,
  getUsersById,
  createUser,
  updateUser,
  deleteUser,
};
