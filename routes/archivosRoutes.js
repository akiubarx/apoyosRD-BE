import express from "express";
import connection from '../models/db.js';
const router = express.Router();

router.get('/', (req, res) => {
  connection.query('SELECT * from archivos', (error,result) => {
    if (error) {
      res.send('Error Buscando Apoyos')
    } else {
      res.send(result)
    }
  })
})

export default router;