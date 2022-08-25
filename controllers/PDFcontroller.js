const puppeteer = require("puppeteer");
const hbs = require("handlebars");
const fs = require("fs-extra");
const path = require("path");
const data = require("./data.json");

//compile the hbs file to pdf

const compile = async (templateName, data) => {
  const filePath = path.join(process.cwd(), "template", `${templateName}.hbs`);
  const background  = fs.readFileSync(`${process.cwd()}\\public\\background-image.jpg`).toString('base64')
 data.background = background;

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
      path: `./PDFfiles/output${Date.now()}.pdf`,
      format: "A4",
      printBackground: true,
    });

    await browser.close();
    console.log("created");
    return res.status(200).send("<p></p>");
  } catch (err) {
    console.log(err);

    return res.status(500).send(err);
  }
};

module.exports = {
  createPDF,
};
