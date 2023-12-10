require("dotenv").config({});
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const app = express();

app.use(cors());
app.use(morgan("tiny"));
const os = require('os');



const getPrivateIpAddress = () => {
  const interfaces = os.networkInterfaces();

  for (const interfaceName of Object.keys(interfaces)) {
    const iface = interfaces[interfaceName];

    for (const alias of iface) {
      if (alias.family === 'IPv4' && !alias.internal) {
        return alias.address;
      }
    }
  }

  return null;
};
app.get("/getPrivateIpAddress", (req, res) => {
  const privateIpAddress = getPrivateIpAddress();
  res.json({ privateIpAddress });
});

app.get("/getUserPrivateIpAddress", (req, res) => {
  const userPrivateIpAddress = req.connection.remoteAddress;
  res.json({ userPrivateIpAddress });
});


app.get("/", (req, res) => {
  res.status(200).send(`<h1>Hello World!</h1>`);
});

const port = 8000;

app.listen(port, () => {
  console.log(`Server started ⚡`);
});
