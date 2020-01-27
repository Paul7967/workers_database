const express = require('express');
const config = require('config');
const app = express();
const workersRoutes = require('./routes/workers.routes.js');
const addWorkerRoutes = require('./routes/add-worker.routes.js');
const cors = require("cors");

const PORT = config.get('port') || 5000;

app.listen(PORT, () => console.log(`Server has been started on port ${PORT}...`));

app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({extended: true}));

app.use('/workers', workersRoutes);
app.use('/addworker', addWorkerRoutes);

