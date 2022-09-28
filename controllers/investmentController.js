const db = require("../models");
const investment = async (req, res) => {

    const procedureQuery = "proc_investment_certificates_log";
    try {
      await db.sequelize.query(procedureQuery).then((data) => {
      
        return res.status(200).json(data[0]);
      });
    } catch (err) {
      return res.status(500).send();
    }
  };

  module.exports = {investment};