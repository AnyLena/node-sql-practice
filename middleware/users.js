import { body } from "express-validator";
import { pool } from "../db/pool.js";

export const userValidation = [
  body("first_name").isString().notEmpty(),
  body("last_name").isString().notEmpty(),
  body("age").isInt({ min: 18 }),
];

export const userValidationUpdate = [
  body("first_name").optional().isString(),
  body("last_name").optional().isString(),
  body("age").optional().isInt({ min: 18 }),
];

export const checkUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const userExist = await pool.query("SELECT * FROM users WHERE id = $1;", [
      id,
    ]);
    if (userExist.rows.length === 0) {
      return res.status(404).send("User not found at all");
      // return res.sendStatus(418)
    }
    req.user = userExist.rows[0];
    next();
  } catch (error) {
    res.status(500).json({ error });
  }
};
