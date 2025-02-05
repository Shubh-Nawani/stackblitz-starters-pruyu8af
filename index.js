const express = require('express');
const { resolve } = require('path');
const connectDB = require('./config/db')
const router = require('./routes/menuRoute')
const Menu = require('./models/menuModel')
require("dotenv").config()


const app = express();
const port = 3010;
app.use(express.json())

app.get("/", (req, res) => {
  try {
    return res.status(200).send("Backend is running...")
  } catch (err) {
    return res.status(500).send(err.message)
  }
})

app.use("/", router)

app.get("/menu", async (req, res) => {
  try {
    const menuItem = await Menu.findOne()
    return res.status(200).send(menuItem)


  } catch (err) {
    return res.status(500).send("Internal Server Error")
  } 
})

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, () => {
  try {
  connectDB()
  console.log(`Example app listening at http://localhost:${port}`);
  } catch (err) {
    console.error(err.message)
  }
});
