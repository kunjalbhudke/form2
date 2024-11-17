import mysql from 'mysql2';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, phone, date, time, guests } = req.body;

    // Create MySQL connection (replace with your own connection details)
    const db = mysql.createConnection({
      host: 'localhost', // If using Vercel, use a remote DB like PlanetScale
      user: 'root',
      password: 'Ksbn046497',
      database: 'restaurant',
    });

    const query = `INSERT INTO reservations (name, email, phone, date, time, guests)
                   VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(query, [name, email, phone, date, time, guests], (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        res.status(500).json({ message: 'Error saving reservation.' });
      } else {
        res.status(200).json({ message: 'Reservation saved successfully!' });
      }
    });

    db.end();
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
