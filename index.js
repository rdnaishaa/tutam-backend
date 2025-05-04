const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.use('/api', require('./src/routes/albumRoute'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}
);