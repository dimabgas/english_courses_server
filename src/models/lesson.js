const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Course = require("./course");

const LessonSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  video: {
    type: String,
  },
  material: {
    type: String,
  },
});

LessonSchema.pre("findOneAndRemove", async function (next) {
  const lessonId = this._conditions._id;

  await Course.updateOne({ $pull: { lessons: lessonId } });
  return next();
});

module.exports = mongoose.model("Lesson", LessonSchema);
