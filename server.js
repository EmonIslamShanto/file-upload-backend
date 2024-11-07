const express = require('express');
const cors = require("cors");
const uploadRoutes = require('./routes/uploadRoute');
const app = express();
const allowedOrigins = ['https://task-dashboard-alpha.vercel.app'];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);  // Allow the request
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));
const PORT = 5252;

app.use(express.json());
app.use('/upload', uploadRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
