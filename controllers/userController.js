import { pool } from "../db/pool.js";

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

export const postUser = async (req, res) => {
  try {
    const { first_name, last_name, age, active } = req.body;
    const { rows } = await pool.query(
      "INSERT INTO users (first_name, last_name, age, active) VALUES ($1, $2, $3, $4) RETURNING *",
      [first_name, last_name, age, active]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const putUser = async (req, res) => {
  try {
    const { age } = req.body;
    const { id } = req.params;
    const { rows } = await pool.query(
      "UPDATE users SET age=$2 WHERE id=$1 RETURNING *",
      [id, age]
    );
    res.status(201).json(rows[0]);
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
