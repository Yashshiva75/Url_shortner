const mongoose = require("mongoose");

// Define the URL schema
const urlSchema = mongoose.Schema({
    shortCode: String,
    longUrl: String
});

// Export the model using module.exports
const Url = mongoose.model("shortUrl", urlSchema);
module.exports = Url; 
