const URL = require("../Models/URL");
const { validationResult } = require("express-validator");
const SHORTENED_URL = process.env.SHORTENED_URL;

exports.getRoute = async (req, res, next) => {
  try {
    const { val } = req.params;
    const resData = await URL.findOne({ hash: val });
    console.log(resData);
    if (resData) {
      res.redirect(resData.url);
    }
  } catch (err) {
    return res.status(500).send({ message: "Something Went Wrong" }).end();
  }
};

exports.createRoute = async (req, res, next) => {
  const { errors } = validationResult(req);
  if (errors.length) {
    console.log(errors);
    return res.status(422).send({ message: "Invalid URL" }).end();
  }
  try {
    const { val } = req.body;
    const hash = new Date().getTime();
    const url = new URL({
      url: val,
      hash: hash,
    });
    const resData = await url.save();
    if (resData) {
      res.status(201).json({ hashedUrl: SHORTENED_URL + resData.hash });
    }
  } catch (err) {
    return res.status(500).send({ message: "Something Went Wrong" }).end();
  }
};
