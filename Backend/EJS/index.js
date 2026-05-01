import express from 'express';
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

let type = "a weekday";
let advice = "Stay productive!";


function checkDay(req, res, next) {
    var dayIndex = new Date().getDay();
    if (dayIndex === 0 || dayIndex === 6) {
        type = "the weekend";
        advice = "Enjoy your time off!";
    }
    next();
}

app.use(express.urlencoded({ extended: true }));
app.use(checkDay);


app.get('/', (req, res) => {
    res.render('index.ejs', {
        dayType: type, 
        advice: advice,
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
