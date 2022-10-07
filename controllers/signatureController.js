const fs = require("fs-extra");
const getSignature = async (req, res) => {
  try {
    var signature = fs.readFileSync(`./public/signature1.png`);
    res.contentType("application/content-stream");

    return res.status(200).send(signature);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const getSignature2 = async (req, res) => {
  try {
    var signature = fs.readFileSync(`./public/signature2.png`);
    res.contentType("application/content-stream");

    return res.status(200).send(signature);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateSignature = async (req, res) => {
   
    var base64Data = req.body.photo.split('base64,')[1];

    require("fs").writeFile(`${process.cwd()}\\public\\signature1.png`, base64Data, 'base64', function(err) {
      console.log(err);
    });

};
const updateSignature2 = async (req, res) => {

    console.log(req)
  var imageBuffer = req.file.buffer;
  var imageName = "public/images/map.png";
  fs.createWriteStream(`${process.cwd()}\\public\\signature1.png`).write(imageBuffer);
 // fs.createWriteStream(imageName).write(imageBuffer);
};

module.exports = { getSignature, getSignature2, updateSignature, updateSignature2};
