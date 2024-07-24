const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Daftar Barang
router.get("/", async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const items = await conn.query("SELECT * FROM m_barang");
    conn.release();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Tambah Barang
router.post("/", async (req, res) => {
  const { kode, nama, harga, stock } = req.body;
  const missingFields = [];

  if (!kode) missingFields.push("kode");
  if (!nama) missingFields.push("nama");
  if (!harga) missingFields.push("kode");
  if (!stock) missingFields.push("stock");

  if (missingFields.length > 0) {
    return res.status(400).json({ error: `Fields missing: ${missingFields.join(", ")}` });
  }

  try {
    const conn = await pool.getConnection();
    const result = await conn.query(
      `
      INSERT INTO m_barang (kode, nama, harga,stock)
      VALUES (?, ?, ?, ?)
    `,
      [kode, nama, harga, stock]
    );
    conn.release();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ubah Barang
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { kode, nama, harga, stock } = req.body;
  const missingFields = [];

  if (!kode) missingFields.push("kode");
  if (!nama) missingFields.push("nama");
  if (!harga) missingFields.push("harga");
  if (!stock) missingFields.push("stock");

  if (missingFields.length > 0) {
    return res.status(400).json({ error: `Fields missing: ${missingFields.join(", ")}` });
  }

  try {
    const conn = await pool.getConnection();
    const result = await conn.query(
      `
      UPDATE m_barang
      SET kode = ?, nama = ?, harga = ?, stock = ?
      WHERE id = ?
    `,
      [kode, nama, harga, stock, id]
    );
    conn.release();

    if (result.affectedRows > 0) {
      res.json({ message: `Barang dengan ID ${id} telah diperbarui` });
    } else {
      res.status(404).json({ error: `Barang dengan ID ${id} tidak ditemukan` });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Hapus Barang
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const conn = await pool.getConnection();
    const result = await conn.query("DELETE FROM m_barang WHERE id = ?", [id]);
    conn.release();

    if (result.affectedRows > 0) {
      res.json({ message: `Barang dengan ID ${id} telah dihapus` });
    } else {
      res.status(404).json({ error: `Barang dengan ID ${id} tidak ditemukan` });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
