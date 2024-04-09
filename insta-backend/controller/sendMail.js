// server.js

const nodemailer = require("nodemailer");

exports.sendMail = (req, res) => {
  const { to, subject, text, from } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "vikashmishra8371@gmail.com",
        pass: "udrz ltyp zhou xymx",
      },
    });

    const mailOptions = {
      from: from,
      to,
      subject,
      text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
       return res.status(500).send("Error sending email");
      } else {
        console.log("Email sent: " + info.response);
       return res.json({success:true,message:"Email sent successfully"});
      }
    });
  } catch (error) {
    return res.json({sucess:false,error:error.message})
  }
};
