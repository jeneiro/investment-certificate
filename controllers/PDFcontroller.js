const puppeteer = require("puppeteer");
const hbs = require("handlebars");
const fs = require("fs-extra");
const path = require("path");
const { ToWords } = require("to-words");
const {TandC} =require("../models")
//const data = require("./data.json");

//currency Formatter in words
const toWords = new ToWords({
  localeCode: "en-IN",
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
    currencyOptions: {
      // can be used to override defaults for the selected locale
      name: "Naira",
      plural: "Naira",
      symbol: "₦",
      fractionalUnit: {
        name: "Kobo",
        plural: "Kobo",
        symbol: "k",
      },
    },
  },
});

// const address = data.address;
const splitAddress = (address) => {
  var address1 = address.split(" ").splice(0, 6).join(" ");
  var address2 = address.split(" ").splice(6).join(" ");
  return { address1, address2 };
};
const splitTandC = (address) => {
  var one = address.split(" ").splice(0, 13).join(" ");
  var two = address.split(" ").splice(13).join(" ");
  return { one, two };
};
const splitCurrencyWords = (currencyWords) => {
  var currency1 = currencyWords.split(" ").splice(0, 6).join(" ");
  var currency2 = currencyWords.split(" ").splice(6).join(" ");
  if (currency2 == ""){
    currency1 = currency1+" "+")";
    return { currency1, currency2 };
  }
  else{
    currency2 = currency2+" "+")";
    return { currency1, currency2 };
  }
  
};


const compile = async (templateName, data) => {
  const filePath = path.join(process.cwd(), "template", `${templateName}.hbs`);
  const background = fs
    .readFileSync(`${process.cwd()}\\public\\background-image.jpg`)
    .toString("base64");
  const signature1 = fs
    .readFileSync(`${process.cwd()}\\public\\signature1.png`)
    .toString("base64");
  const signature2 = fs
    .readFileSync(`${process.cwd()}\\public\\signature2.png`)
    .toString("base64");

  const addresses = splitAddress(data.address);
  const tandc1 = splitTandC(data.tandc1);
  const tandc2 = splitTandC(data.tandc2);
  const tandc3 = splitTandC(data.tandc3);
  let amountWords = splitCurrencyWords(toWords.convert(data.amountNum, { currency: true }));
  let netMaturityWords = splitCurrencyWords(toWords.convert(data.netMaturityValueNum, {
    currency: true,
  }));
  
  data.amountWords1 = amountWords.currency1;
  data.amountWords2 = amountWords.currency2;
  data.netMaturityWords1 = netMaturityWords.currency1;
  data.netMaturityWords2 = netMaturityWords.currency2;
  data.background = background;
  data.signature1 = signature1;
  data.signature2 = signature2;
  data.address1 = addresses.address1;
  data.address2 = addresses.address2;
  data.tandc1One = tandc1.one;
  data.tandc1two = tandc1.two;
  data.tandc2One = tandc2.one;
  data.tandc2two = tandc2.two;
  data.tandc3One = tandc3.one;
  data.tandc3two = tandc3.two;
  //get html

  const html = await fs.readFile(filePath, "utf8");
  return hbs.compile(html)(data);
};

const createPDF = async (req, res) => {
  try {
    const data = req.body;
    const tandc = await TandC.findAll();
    data.tandc1 = tandc[0].dataValues.item
    data.tandc2 = tandc[1].dataValues.item
    data.tandc3 = tandc[2].dataValues.item
    
    
    const browser = await puppeteer.launch({
      args: ["--allow-file-access-from-files", "--enable-local-file-accesses"],
    });
    const page = await browser.newPage();
    const content = await compile("index", data);
    await page.setContent(content);
    await page.pdf({
      path: `./PDFfiles/output${data.reference}.pdf`,
      format: "A4",
      printBackground: true,
    });

    await browser.close();
    var pdfFile = fs.readFileSync(`./PDFfiles/output${data.reference}.pdf`);
    res.contentType("application/pdf");
    return res.status(200).send(pdfFile);

    return res.status(200).send("Hi");
  } catch (err) {
    console.log(err);

    return res.status(500).send(err);
  }
};

const viewPDF = async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      args: ["--allow-file-access-from-files", "--enable-local-file-accesses"],
    });
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
    res.contentType("application/pdf");
    return res.status(200).send(pdfFile);
  } catch (err) {
    console.log(err);

    return res.status(500).send(err);
  }
};
const downloadPDF = async (req, res) => {
  try {
   const id  =  req.params.id;
    var pdfFile = fs.readFileSync(`./PDFfiles/output${id}.pdf`);
    res.contentType("application/pdf");
    return res.status(200).send(pdfFile);
  } catch (err) {
    console.log(err);

    return res.status(500).send(err);
  }
};

module.exports = {
  createPDF,
  viewPDF,
  downloadPDF
};
