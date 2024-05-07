const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Hash = require("../helpers/hash");
const hash = new Hash();

const UserSchema = new Schema({
  avatar: {
    type: String,
    default:
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/d1c64938267389.575aefd5063e6.png",
  },
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  secondName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    default: ["Student"],
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

UserSchema.methods.validPassword = async function (password) {
  return await hash.compare(password, this.password);
};

UserSchema.pre("save", async function (next) {
  if (!this.isNew) return next();

  this.password = await hash.generate(this.password);

  return next();
});

module.exports = mongoose.model("User", UserSchema);
