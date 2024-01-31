import { pool } from "../db/pool.js";
import { body, validationResult } from "express-validator";

export const userValidation = [
  body("first_name").isString().notEmpty(),
  body("last_name").isString().notEmpty(),
  body("age").isInt({ min: 18 }),
];

export const getUsers = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
    if (rows.length === 0) {
      res.sendStatus(404);
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

export const getUserOrders = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query(
      "SELECT * FROM orders JOIN users ON orders.user_id = users.id WHERE orders.user_id=$1",
      [id]
    );
    if (rows.length === 0) {
      res.sendStatus(404);
    } else {
      res.json(rows);
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

export const postUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { first_name, last_name, age } = req.body;
    const { rows } = await pool.query(
      "INSERT INTO users (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *",
      [first_name, last_name, age]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.sendStatus(500);
  }
};

export const putUser = async (req, res) => {
  const { id } = req.params;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { first_name, last_name, age, active } = req.body;
    const query =
      "UPDATE users SET age=$2, last_name = $3, first_name = $4, active =$5 WHERE id=$1 RETURNING *";
    const values = [id, age, last_name, first_name, active];
    const { rows } = await pool.query(query, values);
    res.json(rows[0]);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const putInactive = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query(
      "SELECT * FROM orders WHERE user_id = $1;",
      [id]
    );
    if (rows.length === 0) {
      const result = await pool.query(
        "UPDATE users SET active=false WHERE id=$1 RETURNING *",
        [id]
      );
      res.json(result.rows[0]);
    } else {
      const result = await pool.query(
        "UPDATE users SET active=true WHERE id=$1 RETURNING *",
        [id]
      );
      res.json(result.rows[0]);
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      "DELETE FROM users WHERE id=$1 RETURNING *",
      [id]
    );
    res.status(200).json(rows[0]);
  } catch (error) {
    res.sendStatus(500);
  }
};
