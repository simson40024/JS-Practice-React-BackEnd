import CurrencyRatesModel from "../models/currencyRates.js";

export const getRate = async (req, res) => {
  try {
    const CurRate = await CurrencyRatesModel.findOne({
      currency: req.params.currency,
    });
    res.json(CurRate);
  } catch (err) {
    console.log(err);
    res.status(404).json({
      error: err,
      message: "objects not found",
    });
  }
};

export const addCurrencyRate = async (req, res) => {
  try {
    const doc = new CurrencyRatesModel({
      currency: req.body.currency,
      rate: req.body.rate,
    });
    const curRate = await doc.save();
    res.json(curRate);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "error of create",
    });
  }
};
