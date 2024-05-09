const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
const personasRoutes = require('./src/routes/personasRoutes');


app.use(express.json());
app.use(cors());

app.use('/personas', personasRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});