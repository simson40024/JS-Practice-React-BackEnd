import mongoose from "mongoose";

const CurrencyRatesSchema = new mongoose.Schema(
  {
    currency: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);
export default mongoose.model("CurrencyRates", CurrencyRatesSchema);
