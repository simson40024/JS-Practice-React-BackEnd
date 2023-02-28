import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import userModel from "../models/user.js";

export const registration = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(password, salt);

    const doc = new userModel({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      passwordHash: passHash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secretKey",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;
    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      message: "Failed registration",
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        message: "email not found",
      });
    }
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );
    if (!isValidPassword) {
      return res.status(404).json({
        message: "error email or password",
      });
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secretKey",
      {
        expiresIn: "30d",
      }
    );
    const { passwordHash, ...userData } = user._doc;
    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      message: "Failed authorization",
    });
  }
};

export const checkUser = async (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  // console.log(req);

  if (token) {
    try {
      const decoded = jwt.verify(token, "secretKey");
      req.userId = decoded._id;
      next();
    } catch (e) {
      return res.status(403).json({
        message: "token not decoded",
      });
    }
  } else {
    return res.status(403).json({
      message: "error authtorizanion",
    });
  }
};
