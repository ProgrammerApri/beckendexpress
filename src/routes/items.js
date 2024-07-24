// routes/items.js
const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Daftar Barang
router.get("/barang", async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const items = await conn.query(`
      SELECT * FROM m_barang
    `);
    conn.release();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Daftar Customer
router.get("/customer", async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const customers = await conn.query(`
      SELECT * FROM m_customer
    `);
    conn.release();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
