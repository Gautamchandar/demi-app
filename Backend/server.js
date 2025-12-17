const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query(
    'SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'DB Error' });

      if (result.length > 0) {
        res.json({ token: 'login-success-token' });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    }
  );
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
