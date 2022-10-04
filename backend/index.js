const express = require("express");
const port = 3001;
const app = express();
const cors = require("cors");

var fs = require("fs");
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    const allowedOrigins = ['http://127.0.0.1:3000', 'http://localhost:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
});

app.get('/read', function (req, res) {
    fs.readFile(__dirname + "/data/" + "number.json", 'utf8', function (err, data) {
        res.end(data);
    });
})

app.post('/write', function (req, res) {
    if (!req.body.number) {
    } else {
        const number = {
            number: req.body.number
        };
        let data = JSON.stringify(number);
        fs.writeFile(__dirname + "/data/" + "number.json", data, function (err) {
            if (err) {
                return console.log(err);
            }
        });
        res.end(data);
    }
});

app.listen(port, () => {
    console.log("Backend server running on port: " + port);
})