const db = require("../models");
const nodemailer = require("nodemailer");
const fs = require("fs-extra");
var path = require("path");


const sendEmail =async (req, res)=>{
    try {
        //mail Client
        const id = req.params.id;
        let { title, message, email, investor, account } = req.body;
        const procedureQuery = `exec proc_update_investment_certificates_log_status_to_sent @account_no=${account}`;
        
        
         await db.sequelize.query(procedureQuery)
        var filepath = path.join(__dirname, `../PDFfiles/output${id}.pdf`);
        const transporter = nodemailer.createTransport({
          name: "mail.norrenberger.com",
          host: "outlook.office365.com",
          port: 587,
          secureConnection:false,
          secure: false,
          auth: {
            user: "noreply@norrenberger.com",
            pass: "Kuh76219",
          },
          tls: {
            rejectUnauthorized: false,
          },
        });
    
        const msg = {
          from: "Transkredit<noreply@norrenberger.com>", // sender address
          attachments: [{
            filename: `investmentCertificate${id}.pdf`,
            path: filepath,
            contentType: 'application/pdf'
          }],
          to: email,
          subject: title, // Subject line
          html: `
          <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
  
          <!-- START HEADER/BANNER -->
          
              <tbody><tr>
                <td align="center">
                  <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0">
                    <tbody>
          
          
          
                      <tr><img width="233" height="50" alt="Transkredit"  src="https://transkreditfinance.com/wp-content/uploads/2020/07/Transkredit-Concept-2-Adjustment-to-colors-16.png"></tr>
              <tr>
                <td align="center">
                  <table align="center" class="col-600" width="600" border="0" cellspacing="0" cellpadding="0">
                    <tbody><tr>
                      <td align="center" bgcolor="#f15a29">
                        <table class="col-600" width="600" align="center" border="0" cellspacing="0" cellpadding="0">
                          <tbody><tr>
                        
                          </tr>
                          <tr>
                            <td>
          
          
                              <table class="col1" width="183" border="0" align="left" cellpadding="0" cellspacing="0">
          
                                <tbody><tr>
                                <td height="18"></td>
                                </tr>
          
                                      </tbody></table>
          
          
          
                              
                                  </td>
                                </tr>
          
                              </tbody></table>
                            </td>
                          </tr>
                          <tr>
                            <td height="33"></td>
                          </tr>
                        </tbody></table>
                      </td>
                    </tr>
                  </tbody></table>
                </td>
              </tr>
          
          
          
          
              <tr>
                <td align="center">
                  <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0" style="margin-left:20px; margin-right:20px;">
          
          
          
              <tbody><tr>
                <td align="center">
                  <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0" style=" border-left: 1px solid #f15a29; border-right: 1px solid #f15a29">
                    <tbody><tr>
                      <td height="50"></td>
                    </tr>
                    <tr>
                      <td align="right">
          
          
                        <table class="col2" width="287" border="0" align="right" cellpadding="0" cellspacing="0">
                          <tbody><tr>
                            <td align="center" style="line-height:0px;">
                              <img style="display:block; line-height:0px; font-size:0px; border:0px;" class="images_style" src="https://images2.imgbox.com/d1/d8/n5h2v7Ej_o.jpg" width="169" height="138">
                            </td>
                          </tr>
                        </tbody></table>
          
          
          
          
          
          
                        <table width="287" border="0" align="left" cellpadding="0" cellspacing="0" class="col2" style="">
                          <tbody><tr>
                            <td align="center">
                              <table class="insider" width="237" border="0" align="center" cellpadding="0" cellspacing="0">
          
          
          
                                <tbody><tr align="left">
                                  <td style="font-family: 'Raleway', sans-serif; font-size:23px; color:#f15a29; line-height:30px; font-weight: bold;">${title}</td>
                                </tr>
          
                                <tr>
                                  <td height="5"></td>
                                </tr>
          
          
                                <tr>
                                  <td style="font-family: 'Lato', sans-serif; font-size:14px; color:#7f8c8d; line-height:24px; font-weight: 300;">
                                 Dear ${investor},</br>  ${message}</br>Kind regards  </td>
                                </tr>
          
          
                              </tbody></table>
                            </td>
                          </tr>
                        </tbody></table>
                      </td>
                    </tr>
                  </tbody></table>
                </td>
              </tr>
          
          
          <!-- END WHAT WE DO -->
          
          
          
          
          
              <tr>
                <td align="center">
                  <table align="center" width="100%" border="0" cellspacing="0" cellpadding="0" style=" border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
                    <tbody><tr>
                      <td height="50"></td>
                    </tr>
                    <tr>
                      <td align="center" bgcolor="#34495e" background="https://images2.imgbox.com/45/41/PKfHzfBI_o.jpg" height="185">
                        <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0">
                          <tbody><tr>
                            <td height="25"></td>
                          </tr>
          
                            <tr>
                          
                            </tr>
          
          
                          <tr>
                            <td height="25"></td>
                          </tr>
          
          
          
                          </tbody></table><table align="center" width="35%" border="0" cellspacing="0" cellpadding="0">
                          <tbody><tr>
                          
          
                          
                          </tr>
                          </tbody></table>
          
          
          
                        </td></tr></tbody></table>
                      </td>
                    </tr>
                  </tbody></table>
                </td>
              </tr>
          
        
          
                      
                    
                  </tbody></table>
        `, // plain text body
        };
        // send mail with defined transport object
        const info = await transporter.sendMail(msg);
    
        res.send("Message Sent");
      } catch (err) {
        console.error(err);
        console.log(err);
        res.status(500).send();
      }

}
;
module.exports={sendEmail}