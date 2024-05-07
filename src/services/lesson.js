const LessonRepository = require("../repositories/lesson");
const lessonRepository = new LessonRepository();

const CourseRepository = require("../repositories/course");
const courseRepository = new CourseRepository();

const Course = require("../models/course");
const BaseSerializer = require("../helpers/serializers/base.serializer");

class LessonService {
  async create(courseId, userId, lessonData) {
    const courseById = await courseRepository.findById(courseId);

    if (courseById.owner.id !== userId) {
      throw new Error("You are not an owner of this course");
    }

    const createdLesson = await lessonRepository.create(lessonData);

    return await Course.findByIdAndUpdate(
      { _id: courseId },
      { $push: { lessons: createdLesson } }
    );
  }

  async getLessonsList(courseId) {
    const courseById = await courseRepository.findById(courseId).populate({
      path: "lessons",
      select: "title",
    });

    return courseById.lessons;
  }

  async getLessonDetails(lessonId) {
    const lessonById = await lessonRepository.findById(lessonId);

    if (!lessonById) {
      throw new Error(
        "There is no any lesson details. Ask your teacher about it"
      );
    }

    const serializedLesson = new BaseSerializer(lessonById).serialize();

    return serializedLesson;
  }

  async delete(lessonId) {
    await lessonRepository.delete({ _id: lessonId });
  }

  async edit(lessonId, body) {
    return await lessonRepository.edit({ _id: lessonId }, body);
  }
}

module.exports = LessonService;
