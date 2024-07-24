// routes/transaksi.js
const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Daftar Transaksi
router.get("/", async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const transaksi = await conn.query(`
      SELECT * FROM t_sales
    `);
    conn.release();
    res.json(transaksi);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Form Input Transaksi
router.post("/", async (req, res) => {
  const { kode, tgl, cus_id, subtotal, diskon, ongkir, total_bayar } = req.body;
  const missingFields = [];

  if (!kode) missingFields.push("kode");
  if (!tgl) missingFields.push("tgl");
  if (!cus_id) missingFields.push("cus_id");
  if (!subtotal) missingFields.push("subtotal");
  if (!diskon) missingFields.push("diskon");
  if (!ongkir) missingFields.push("ongkir");
  if (!total_bayar) missingFields.push("total_bayar");

  if (missingFields.length > 0) {
    return res.status(400).json({ error: `Fields missing: ${missingFields.join(", ")}` });
  }

  try {
    const conn = await pool.getConnection();
    const result = await conn.query(
      `
      INSERT INTO t_sales (kode, tgl, cus_id, subtotal, diskon, ongkir, total_bayar)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
      [kode, tgl, cus_id, subtotal, diskon, ongkir, total_bayar]
    );
    conn.release();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ubah Transaksi
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { kode, tgl, cus_id, subtotal, diskon, ongkir, total_bayar } = req.body;
  const missingFields = [];

  if (!kode) missingFields.push("kode");
  if (!tgl) missingFields.push("tgl");
  if (!cus_id) missingFields.push("cus_id");
  if (!subtotal) missingFields.push("subtotal");
  if (!diskon) missingFields.push("diskon");
  if (!ongkir) missingFields.push("ongkir");
  if (!total_bayar) missingFields.push("total_bayar");

  if (missingFields.length > 0) {
    return res.status(400).json({ error: `Fields missing: ${missingFields.join(", ")}` });
  }

  try {
    const conn = await pool.getConnection();
    const result = await conn.query(
      `
      UPDATE t_sales
      SET kode = ?, tgl = ?, cus_id = ?, subtotal = ?, diskon = ?, ongkir = ?, total_bayar = ?
      WHERE id = ?
    `,
      [kode, tgl, cus_id, subtotal, diskon, ongkir, total_bayar, id]
    );
    conn.release();

    if (result.affectedRows > 0) {
      res.json({ message: `Transaksi dengan ID ${id} telah diperbarui` });
    } else {
      res.status(404).json({ error: `Transaksi dengan ID ${id} tidak ditemukan` });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Hapus Transaksi
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const conn = await pool.getConnection();
    const result = await conn.query("DELETE FROM t_sales WHERE id = ?", [id]);
    conn.release();

    if (result.affectedRows > 0) {
      res.json({ message: `Transaksi dengan ID ${id} telah dihapus` });
    } else {
      res.status(404).json({ error: `Transaksi dengan ID ${id} tidak ditemukan` });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
