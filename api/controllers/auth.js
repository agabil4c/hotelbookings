import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    const user_aggre = await User.aggregate([
      {
        $match: {
          username :req.body.username
        }
      },
      {
        $lookup: {
          from: "roles",
          let: {
            "serchId": {$toObjectId: "$role_id"}
          },
          pipeline: [
            {"$match": {"$expr":[{"_id":"$serchId"}]}},
            {"$project": {"_id":1,"permission":1}}
          ],
          as: "role"
        }
      },
      {
        $unwind: "$role"
      }
    ]);
    if (!user_aggre) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user_aggre[0].password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user_aggre[0]._id, isAdmin: user_aggre[0].isAdmin, permissions: user_aggre[0].role.permission },
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
