const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan"); // Tambahkan ini
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(morgan("dev")); // Menggunakan morgan untuk logging

// Routes
app.use("/transaksi", require("./routes/transaksi"));
app.use("/barang", require("./routes/barang"));
app.use("/customer", require("./routes/customer"));

// Middleware Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack); // Cetak error ke konsol
  res.status(500).json({ error: err.message });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
