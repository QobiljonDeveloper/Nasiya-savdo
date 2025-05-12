const db = require("../config/db");
const notificationValidationSchema = require("../validation/notify.validation");

const getAllNotifications = (req, res) => {
  db.query(`SELECT * FROM notifications`, (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.status(200).send({ data: result });
  });
};

const getNotificationById = (req, res) => {
  const { id } = req.params;
  db.query(`SELECT * FROM notifications WHERE id = ?`, [id], (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.status(200).send({ data: result[0] });
  });
};

const createNotification = (req, res) => {
  const { error } = notificationValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  const { user_id, contract_id, notification } = req.body;

  db.query(
    `INSERT INTO notifications (user_id, contract_id, notification) VALUES (?, ?, ?)`,
    [user_id, contract_id, notification],
    (err, result) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      res.status(201).send({
        message: "Notification created successfully",
        id: result.insertId,
      });
    }
  );
};

const updateNotification = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const { error } = notificationValidationSchema.validate(data);

  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  const updateValue = queryGenerate(data);
  const values = Object.values(data);

  db.query(
    `UPDATE notifications SET ${updateValue} WHERE id = ?`,
    [...values, id],
    (err, result) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      res.status(200).send({ message: "Notification updated successfully" });
    }
  );
};

const deleteNotification = (req, res) => {
  const { id } = req.params;
  db.query(`DELETE FROM notifications WHERE id = ?`, [id], (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }

    res.status(200).send({ message: "Notification deleted successfully" });
  });
};

module.exports = {
  getAllNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification,
};
