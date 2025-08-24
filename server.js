const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const twilio = require("twilio");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Twilio credentials
const accountSid = "YOUR_TWILIO_ACCOUNT_SID";
const authToken = "YOUR_TWILIO_AUTH_TOKEN";
const client = twilio(accountSid, authToken);

// Admin WhatsApp number (recipient)
const ADMIN_WHATSAPP = "whatsapp:+92XXXXXXXXXX"; // <-- replace with Admin number
const TWILIO_WHATSAPP = "whatsapp:+14155238886"; // Twilio Sandbox number

// API endpoint
app.post("/send-whatsapp", async (req, res) => {
  try {
    const { name, location, riskLevel } = req.body;

    const messageBody = `🚨 Flood Alert Report 🚨
Name: ${name}
Location: ${location}
Flood Risk: ${riskLevel}`;

    await client.messages.create({
      from: TWILIO_WHATSAPP,
      to: ADMIN_WHATSAPP,
      body: messageBody,
    });

    res.json({ success: true, msg: "WhatsApp alert sent to Admin!" });
  } catch (err) {
    console.error("Error sending WhatsApp:", err);
    res.status(500).json({ success: false, msg: "Failed to send WhatsApp" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
