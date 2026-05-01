import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    {
      message: "Enter URL to generate QR Code",
      name: "URL",}
  ])
  .then((answers) => {
    var url = answers.URL;
    var qr_png = qr.image(url);
    qr_png.pipe(fs.createWriteStream('i_love_qr.png'));
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });