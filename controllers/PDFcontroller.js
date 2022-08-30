const puppeteer = require("puppeteer");
const hbs = require("handlebars");
const fs = require("fs-extra");
const path = require("path");
const data = require("./data.json");

const address = data.address
const splitAddress = (address)=>{
var address1 = address.split(" ").splice(0,6).join(" ");
var address2 = address.split(" ").splice(6).join(" ");
return {address1,address2}
}

const compile = async (templateName, data) => {
  const filePath = path.join(process.cwd(), "template", `${templateName}.hbs`);
  const background  = fs.readFileSync(`${process.cwd()}\\public\\background-image.jpg`).toString('base64')
  const signature1  = fs.readFileSync(`${process.cwd()}\\public\\signature1.png`).toString('base64')
  const signature2  = fs.readFileSync(`${process.cwd()}\\public\\signature2.png`).toString('base64')
 
  const addresses = splitAddress(address)
  data.background = background;
  data.signature1 = signature1;
  data.signature2 = signature2;
  data.address1 = addresses.address1;
  data.address2 = addresses.address2; 
  //get html

  const html = await fs.readFile(filePath, "utf8");
  return hbs.compile(html)(data);
};

const createPDF = async (req, res) => {
  try {
    const browser = await puppeteer.launch({ args: ['--allow-file-access-from-files', '--enable-local-file-accesses'] });
    const page = await browser.newPage();
    const content = await compile("index", data);
    await page.setContent(content);
    await page.pdf({
      path: `./PDFfiles/output.pdf`,
      format: "A4",
      printBackground: true,
    });

    await browser.close();
 var pdfFile = fs.readFileSync(`./PDFfiles/output.pdf`);
 res.contentType('application/pdf')
    return res.status(200).send(pdfFile);
  } catch (err) {
    console.log(err);

    return res.status(500).send(err);
  }
};

module.exports = {
  createPDF,
};
