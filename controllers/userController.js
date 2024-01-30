import { pool } from "../db/pool.js";

export const getUsers = async (req,res) => {
    try {
        const {rows} = await pool.query('SELECT * FROM users');
        res.json(rows)
    } catch (error) {
        res.sendStatus(500)
    }
}