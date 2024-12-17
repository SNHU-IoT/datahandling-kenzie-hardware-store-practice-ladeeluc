console.log("Hello, Kenzie Hardware Store!");
const express = require('express');
const { Board, Digital } = require("node-grovepi").GrovePi; // GrovePi Library
const app = express();

const PORT = process.env.PORT || 3000;

//Sample endpoint
app.get('/', (req, res) => {
  res.send('Hello, Kenzie Hardware Store!');
});

//Serve static files (if any frontend is added later)
app.use(express.static("public"));

// Sample Inventory File
let products = [
  { id: "15215", name: "25' Garden Hose", price: 9.5, quantity: 1, department: "garden" },
  { id: "15123", name: "Bag of Garden Soil", price: 5.0, quantity: 1, department: "garden" },
  { id: "15312", name: "Shovel", price: 12.0, quantity: 1, department: "garden" },
  { id: "15215", name: "Screwdriver", price: 4.5, quantity: 0, department: "tool" },
  { id: "15215", name: "Corded Drill", price: 124.5, quantity: 1, department: "tool" },
  { id: "15215", name: "Pack of 50 Screws", price: 8.5, quantity: 2, department: "hardware" },
  { id: "15215", name: '1/8" washers', price: 4.5, quantity: 1, department: "hardware" },
];

// Initialize GrovePi
const board = new Board({
  debug: true,
  onError: (err) => console.error("GrovePi Error:", err),
});

// Sensor Setup (Button on Port D5)
let button;

board.init(() => {
  console.log("GrovePi Initialized");

// Set up Digital Input for Button on Port D5
button = new Digital(5);
button.on("change", (value) => {
  if (value === 1) {
    console.log("Button Pressed! Updating Inventory...");

    // Example: Increment the quantity of the first product
    products[0].quantity += 1;
    console.log("Updated Inventory:", products);
  }
});

// Start watching for button events
button.watch();
});

// API to get products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
