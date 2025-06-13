require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

app.use(cors({
  origin: '*', // o pon el dominio frontend específico
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/usuarios', require('./routes/usuario.routes'));

app.listen(process.env.PORT, () => {
  console.log(`SYRDIA API escuchando en puerto ${process.env.PORT}`);
});
