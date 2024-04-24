import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../middleware/emailSend.js";
import { generate } from "generate-password";
import { createTransport } from 'nodemailer';


export const register = async (req, res, next) => {
  try {
    const password = generate({
      length:12,
      numbers: true,
      symbols:true,
      uppercase:true,
      strict:true
    });
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save(function(error,result){
      if (error) {
        console.log("The error "+ error);
        next(createError(400,"Failed to create user"))
      }
      else {
        var confirmationLink = process.env.BASE_URL+"/api/auth/activate?signature="+Buffer.from(result._id).toString('base64');
        // console.log("The id "+ result._id);
        // sendEmail({
        //   email: req.body.email,
        //   password: password,
        //   confirmationLink:confirmationLink
        // })
        const transporter = createTransport({
            service: "Gmail",
            host: process.env.MAIL_SERVER,
            port: process.env.MAIL_PORT,
            secure: true,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            },
        });
        var emailBody = {
          email: req.body.email,
          password: password,
          confirmationLink:confirmationLink
        };
        const mailOptions = {
            from: process.env.MAIL_DEFAULT_SENDER,
            to: req.body.email,
            subject: 'Welcome to Our Platform',
            html: `<!DOCTYPE html>
            <html>
            <head>
              <title>Welcome to Our Platform</title>
            </head>
            <body>
              <h1>Hello ${req.body.firstname}</h1>
              <p class="text-justify">An account with this email has been registered but you need to confirm this address.</p>
              <a href="${confirmationLink}" target="_blank" style="box-sizing:border-box;display:inline-block;font-family:'Cabin',sans-serif;text-decoration:none;-webkit-text-size-adjust:none;text-align:center;color:#e3e0f0;background-color:#34495e;border-radius:4px;-webkit-border-radius:4px;-moz-border-radius:4px;width:auto;max-width:100%;overflow-wrap:break-word;word-break:break-word;word-wrap:break-word;mso-border-alt:none">
                <span style="display:block;line-height:120%;padding:13px 55px"><span style="font-family:Cabin,sans-serif;font-size:16px;line-height:19.2px"><span style="line-height:19.2px;font-size:16px">Click to Confirm Request.</span></span></span>
            </a>
              <blockquote>
                Use <i>${password}</i> as your password on login.
                Endevour to change your password as soon as you login.
            </blockquote>
            </body>
            </html>`
        };

        transporter.sendMail(mailOptions, (error,info) => {
            if (error) {
                console.error('Error sending email:', error);
                // res.status(500).send("There was an error send verification email");
            }
            else {
                console.log('Email sent:', info.response);
                // res.status(201).send("Email sent");
            }
        })
        res.status(200).send("User has been created.");
      }
    });
    
  } catch (err) {
    next(err);
  }
};

//Activate user
export const activateAccount = async (req,res,next) => {
  try {
    var userId = Buffer.from(req.query.signature,"base64").toString("ascii");
    const user = await User.findById(userId);
    if (user.status === "active") {
      res.redirect(process.env.CLIENT_URL);
    } else {
      const updateStatus = await User.findByIdAndUpdate(userId,{status:"active"});
      res.redirect(process.env.CLIENT_URL);
    }
    // res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.username });
    const user_aggre = await User.aggregate([
      {
        $match: {
          email: req.body.username,
        },
      },
      {
        $lookup: {
          from: "roles",
          let: {
            serchId: { $toObjectId: "$role_id" },
          },
          pipeline: [
            { $match: { $expr: [{ _id: "$serchId" }] } },
            { $project: { _id: 1, permission: 1 } },
          ],
          as: "role",
        },
      },
      {
        $unwind: "$role",
      },
    ]);
    if (!user_aggre) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user_aggre[0].password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      {
        id: user_aggre[0]._id,
        isAdmin: user_aggre[0].isAdmin,
        permissions: user_aggre[0].role.permission,
      },
      process.env.JWT
    );
    const { password, isAdmin, role_id, ...otherDetails } = user_aggre[0];
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.cookie("access_token", "").json(true);
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (req, res, next) => {
  var userEmail = req.body.email;
  const user = await User.findOne({email:userEmail});
  if (user) {
    var resetPasswordLink = process.env.CLIENT_URL+"/reset-password?token="+Buffer.from(user._id).toString('base64');
    const transporter = createTransport({
        service: "Gmail",
        host: process.env.MAIL_SERVER,
        port: process.env.MAIL_PORT,
        secure: true,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        },
    });
    
    const mailOptions = {
        from: process.env.MAIL_DEFAULT_SENDER,
        to: req.body.email,
        subject: 'Reset Password Request',
        html: `<!DOCTYPE html>
        <html>
        <head>
          <title>Reset Password Request</title>
        </head>
        <body>
          <h1>Hello ${user.firstname}</h1>
          <p class="text-justify">An account with this email has requested a password reset.</p>
          <a href="${resetPasswordLink}" target="_blank" style="box-sizing:border-box;display:inline-block;font-family:'Cabin',sans-serif;text-decoration:none;-webkit-text-size-adjust:none;text-align:center;color:#e3e0f0;background-color:#34495e;border-radius:4px;-webkit-border-radius:4px;-moz-border-radius:4px;width:auto;max-width:100%;overflow-wrap:break-word;word-break:break-word;word-wrap:break-word;mso-border-alt:none">
            <span style="display:block;line-height:120%;padding:13px 55px"><span style="font-family:Cabin,sans-serif;font-size:16px;line-height:19.2px"><span style="line-height:19.2px;font-size:16px">Click to Confirm Request.</span></span></span>
        </a>
        </body>
        </html>`
    };

    transporter.sendMail(mailOptions, (error,info) => {
        if (error) {
            res.status(500).send("Email not sent please try again");
            // res.status(500).send("There was an error send verification email");
        }
        else {
            // res.status(201).send("Email sent");
            res.status(200).send("Email successfully sent");
        }
    })
    
  } else {
    res.status(500).send("Email not found");
  }
}

export const profile = async (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
};

export const resetPassword = async (req,res,next) => {
  try {
    var userId = Buffer.from(req.body.token,"base64").toString("ascii");
    const password = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const updatePassword = await User.findByIdAndUpdate(userId,{password: hash});
    res.status(200).json(updatePassword);
  } catch (error) {
    next(error);
  }
  
};

export const changePassword = async (req,res,next) => {
  try {
    var userId = req.params.id;
    const password = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const updatePassword = await User.findByIdAndUpdate(userId,{password: hash});
    res.status(200).json(updatePassword);
  } catch (error) {
    next(error);
  }
};
