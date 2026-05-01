import express from 'express';
import bodyParser from 'body-parser';
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));



const app = express();
const port = 3000;

function checkPassword(req, res, next) {
    const password = req.body['password'];
    if (password === 'ILoveProgramming') {
        next();
    } else {
        res.sendFile(__dirname + '/public/index.html');
    }
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(checkPassword);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/check', (req, res) => {
    res.sendFile(__dirname + '/public/secret.html');
});

