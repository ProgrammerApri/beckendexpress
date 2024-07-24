const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Daftar Customer
router.get("/", async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const customers = await conn.query("SELECT * FROM m_customer");
    conn.release();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Tambah Customer
router.post("/", async (req, res) => {
  const { kode, nama, telp } = req.body;
  const missingFields = [];

  if (!kode) missingFields.push("kode");
  if (!nama) missingFields.push("nama");
  if (!telp) missingFields.push("telp");

  if (missingFields.length > 0) {
    return res.status(400).json({ error: `Fields missing: ${missingFields.join(", ")}` });
  }

  try {
    const conn = await pool.getConnection();
    const result = await conn.query("INSERT INTO m_customer (kode, nama, telp) VALUES (?, ?, ?)", [kode, nama, telp]);
    conn.release();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ubah Customer
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { kode, nama, telp } = req.body;
  const missingFields = [];

  if (!kode) missingFields.push("kode");
  if (!nama) missingFields.push("nama");
  if (!telp) missingFields.push("telp");

  if (missingFields.length > 0) {
    return res.status(400).json({ error: `Fields missing: ${missingFields.join(", ")}` });
  }

  try {
    const conn = await pool.getConnection();
    const result = await conn.query("UPDATE m_customer SET kode = ?, nama = ?, telp = ? WHERE id = ?", [kode, nama, telp, id]);
    conn.release();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Hapus Customer
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const conn = await pool.getConnection();
    const result = await conn.query("DELETE FROM m_customer WHERE id = ?", [id]);
    conn.release();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
