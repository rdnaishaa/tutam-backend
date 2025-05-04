require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
    max: 20,
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

const connect = async () => {
  try {
    await pool.connect();
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
};

connect();

const query = async (text, params) => {
  try {
    const res = await pool.query(text, params);
    return res;
  } catch (error) {
    console.error("Error executing query", error);
    throw error; // Re-throw to handle it in the repository
  }
};

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = {
  query,
  cloudinary,
  upload,
};