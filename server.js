const express = require('express');
const cors = require("cors");
const uploadRoutes = require('./routes/uploadRoute');

const app = express();
app.use(cors());
const PORT = 5252;

app.use(express.json());
app.use('/upload', uploadRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
