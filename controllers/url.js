const shortid = require("shortid");
const Url = require("../models/url.js"); // Adjust the path if necessary

// URL shortening function
const urlShort = async function (req, res) {
    try {
        const longUrl = req.body.longUrl;
        const shortCode = shortid.generate(); // Generate a unique short code
        const shortUrl = `http://localhost:3000/${shortCode}`;

        // Save the shortened URL to the database
        const newUrl = new Url({ shortCode, longUrl, shortUrl });
        await newUrl.save();

        console.log("URL shortened successfully", newUrl);

        // Render the server.ejs template with the shortened URL
        res.render("server.ejs", { shortUrl });
    } catch (error) {
        console.error("Error shortening URL:", error);
        res.status(500).send("Server error");
    }
};

// Redirect to the original URL based on the short code
const getOriginalUrl = async (req, res) => {
    try {
        const shortCode = req.params.shortCode;
        const urlRecord = await Url.findOne({ shortCode }); // Search by shortCode

        if (urlRecord) {
            // Redirect to the original long URL
            res.redirect(urlRecord.longUrl);
        } else {
            // Handle case where the short code does not exist
            res.status(404).send("URL not found");
        }
    } catch (error) {
        console.error("Error retrieving URL:", error);
        res.status(500).send("Server error");
    }
};

// Export the functions
module.exports = { urlShort, getOriginalUrl };
