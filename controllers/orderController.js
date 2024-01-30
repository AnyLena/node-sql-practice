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
    res.send(rows[0]);
  } catch (error) {
    res.sendStatus(500);
  }
};
