const express = require('express');
const connectDB = require('./config/database/mongoDB');
const users = require('./routes/api/user');
const auth = require('./routes/api/auth');
const artist = require('./routes/api/artist');

const PORT = process.env.PORT;

const app = express();

connectDB();

app.use(express.json());

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/artists', artist);

app.listen(PORT, () => console.log(`\n- Server started on port ${PORT} -\n`));