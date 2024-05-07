const Lesson = require("../models/lesson");

class LessonRepository {
  create(lessonData) {
    const lesson = new Lesson(lessonData);

    return lesson.save();
  }

  findById(id) {
    return Lesson.findById(id);
  }

  delete(condition) {
    return Lesson.findOneAndRemove(condition);
  }

  edit(condition, body) {
    return Lesson.updateOne(condition, { ...body });
  }
}

module.exports = LessonRepository;
