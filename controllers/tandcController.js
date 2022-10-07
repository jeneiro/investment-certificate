const {TandC} = require("../models");

const getTandC = async (req, res) => {
  try {
    const allRec = await TandC.findAll();
    return res.status(200).json({ data: allRec });
  } catch (error) {
    return res.status(500).json({error});
  }
};

const updateTandC = async (req, res) => {
    try {
        const id =req.params.id;
        const item = req.body.tandc
        const update = TandC.update({item:item}, {where:{id:id}})
        return res.status(200).json({data:update, message:"Terms and condition record has been updated"});

        
    } catch (error) {
        return res.status(500).json({error});
    }
}
;
const createTandC = async (req, res) => {
    try {
       const item = req.body.tandc
        const create = TandC.create();
        return res.status(200).json({data:create, message:"Terms and condition record has been created"});

        
    } catch (error) {
        return res.status(500).json({error});
    }
}
;

module.exports ={getTandC, updateTandC, createTandC}
