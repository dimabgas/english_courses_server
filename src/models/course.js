const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = require("./user");

const CourseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default:
      "https://novi-vorota.com.ua/catalog/view/theme/novivorota/images/notfound.png",
  },
  description: {
    type: String,
  },
  hoursPerWeek: {
    type: String,
  },
  week: {
    type: String,
  },
  level: {
    type: String,
    required: true,
  },
  lessons: [
    {
      type: Schema.Types.ObjectId,
      ref: "Lesson",
    },
  ],
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

CourseSchema.pre("findOneAndRemove", async function (next) {
  const courseId = this._conditions._id;

  await User.updateMany({ $pull: { courses: { $in: [courseId] } } });
  return next();
});

module.exports = mongoose.model("Course", CourseSchema);
