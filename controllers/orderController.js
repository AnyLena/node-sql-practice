import { pool } from "../db/pool.js";

export const getOrders = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM orders");
    res.json(rows);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const getOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query("SELECT * FROM orders WHERE id=$1", [id]);
    if (rows.length === 0) {
      res.sendStatus(404);
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

export const postOrder = async (req, res) => {
  try {
    const { price, date, user_id } = req.body;
    const { rows } = await pool.query(
      "INSERT INTO orders (price,date,user_id) VALUES ($1, $2, $3) RETURNING *",
      [price, date, user_id]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const putOrder = async (req, res) => {
  try {
    const { user_id } = req.body;
    const { id } = req.params;
    const { rows } = await pool.query(
      "UPDATE orders SET user_id=$2 WHERE id=$1 RETURNING *",
      [id, user_id]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      "DELETE FROM orders WHERE id=$1 RETURNING *",
      [id]
    );
    res.status(200).json(rows[0]);
  } catch (error) {
    res.sendStatus(500);
  }
};
