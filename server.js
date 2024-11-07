const express = require('express');
const cors = require("cors");
const uploadRoutes = require('./routes/uploadRoute');
const corsOptions = {
  origin: 'https://task-dashboard-alpha.vercel.app/',  // Allow only this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

const app = express();
app.use(cors(corsOptions));
const PORT = 5252;

app.use(express.json());
app.use('/upload', uploadRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
