import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    phoneNumber: String, // якщо необов'язкове, то об'єкт не потрібен
    cart: [
      {
        id: String,
        name: String,
        quantity: Number,
        price: Number,
        imgUrl: String,
      },
    ],
  },
  {
    timestamp: true,
  }
);
export default mongoose.model("User", UserSchema);
