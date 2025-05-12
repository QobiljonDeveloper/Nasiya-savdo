const db = require("../config/db");
const laptopSpecificationValidationSchema = require("../validation/laptop_specifications.validation");

const getAllLaptopSpecifications = (req, res) => {
  db.query("SELECT * FROM laptop_specifications", (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.status(200).send({ data: result });
  });
};

const getLaptopSpecificationById = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM laptop_specifications WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      if (!result.length) {
        return res
          .status(404)
          .send({ message: "Laptop specification not found" });
      }
      res.status(200).send({ data: result[0] });
    }
  );
};

const createLaptopSpecification = (req, res) => {
  const { error } = laptopSpecificationValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  const { laptop_id, feature_id, value } = req.body;

  db.query(
    "INSERT INTO laptop_specifications (laptop_id, feature_id, value) VALUES (?, ?, ?)",
    [laptop_id, feature_id, value],
    (err, result) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      res.status(201).send({
        message: "Laptop specification created successfully",
        id: result.insertId,
      });
    }
  );
};

const updateLaptopSpecification = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const { error } = laptopSpecificationValidationSchema.validate(data);

  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  const updateValues = Object.entries(data)
    .map(([key, value]) => `${key} = ?`)
    .join(", ");
  const values = Object.values(data);

  db.query(
    `UPDATE laptop_specifications SET ${updateValues} WHERE id = ?`,
    [...values, id],
    (err, result) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      res
        .status(200)
        .send({ message: "Laptop specification updated successfully" });
    }
  );
};

const deleteLaptopSpecification = (req, res) => {
  const { id } = req.params;
  db.query(
    "DELETE FROM laptop_specifications WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      res
        .status(200)
        .send({ message: "Laptop specification deleted successfully" });
    }
  );
};

module.exports = {
  getAllLaptopSpecifications,
  getLaptopSpecificationById,
  createLaptopSpecification,
  updateLaptopSpecification,
  deleteLaptopSpecification,
};
