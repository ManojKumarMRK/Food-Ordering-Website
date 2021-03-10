const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//adding user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email address!");
      }
    },
  },
  mobile: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("password should not contain password!");
      }
    },
  },
  orders: [],
});

//creating the function to generate token
userSchema.methods.createAuthTokens = async function (user) {
  const token = jwt.sign({ _id: user._id.toString() }, "thisisdiabolical", {
    expiresIn: "1h",
  });
  return token;
};

//creating findByCredentaials function
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login!");
  }
  const isMatch = await bcrypt.compare(password, user.password).then().catch();
  if (!isMatch) {
    throw new Error("Unable to login!");
  }
  return user;
};

//hashing the password before saving to database
userSchema.pre("save", async function (next) {
  const user = this;

  //hashing the password
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

//new data model User
const User = mongoose.model("User", userSchema);

//exporting user module
module.exports = User;
