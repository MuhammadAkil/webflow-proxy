require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// CORS ko allow karne ke liye middleware use kar rahe hain
app.use(cors()); 
app.use(express.json());

// Webflow API se blogs fetch karne ka endpoint
app.get("/api/webflow/blogs", async (req, res) => {
  try {
    const response = await axios.get(
    //   "https://api.webflow.com/v2/collections/67b479a0870ee7b88b5eaf55/items",
      "https://api.webflow.com/v2/sites/67b4791569e93db872775575/collections",
      {
        headers: {
          Authorization: `Bearer ${process.env.WEBFLOW_API_KEY}`,
          "accept-version": "1.0.0",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Webflow data:", error);
    res.status(error.response?.status || 500).json({ message: "Error fetching data" });
  }
});

// Server start karein
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
