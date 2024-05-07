const CourseRepository = require("../repositories/course");
const courseRepository = new CourseRepository();

const UserRepository = require("../repositories/user");
const userRepository = new UserRepository();

const paginationHelper = require("../helpers/pagination");
const checkCourseHelper = require("../helpers/checkCourse");

const User = require("../models/user");
const Course = require("../models/course");

const config = require("../config/constants");

class CourseService {
  async create(user, course) {
    const courseData = {
      ...course,
      owner: user.id,
    };

    const createdCourse = await courseRepository.create(courseData);
    const userById = await userRepository.findById(user.id);

    userById.courses.push(createdCourse);
    return await userById.save();
  }

  async subscribe(user, courseId) {
    const courseById = await courseRepository.findById(courseId);
    const userById = await userRepository.findById(user.id);

    if (!courseById) {
      throw new Error("There is no such course");
    }
    if (courseById.students.includes(userById.id)) {
      throw new Error("You are already in this course");
    }

    courseById.students.push(userById);
    userById.courses.push(courseById);

    await userById.save();
    await courseById.save();

    return;
  }

  async unsubscribe(user, courseId) {
    const courseById = await courseRepository.findById(courseId);

    if (!courseById) {
      throw new Error("There is no such course");
    }
    if (!courseById.students.includes(user.id)) {
      throw new Error("You haven't this course");
    }

    await User.updateOne(
      { _id: user.id },
      { $pull: { courses: { $in: [courseId] } } }
    );

    await Course.updateOne(
      { _id: courseId },
      { $pull: { students: { $in: [user.id] } } }
    );
  }

  async getAll(query) {
    const pagination = paginationHelper(query);

    return await courseRepository.getAll(pagination, null);
  }

  async getCourse(userId, courseId) {
    const courseById = await courseRepository.findById(courseId);

    let isStudent = false;
    let isTeacher = false;

    if (!courseById) {
      throw new Error("There is no such course");
    }

    courseById.students.includes(userId) && (isStudent = true);
    courseById.owner.id === userId && (isTeacher = true);

    return {
      ...courseById.toObject(),
      isStudent,
      isTeacher,
    };
  }

  async getUsersCourses(user) {
    const userById = await userRepository.findById(user.id);

    const courses = userById.courses.map((course) => {
      return courseRepository.findById({ _id: course._id });
    });

    return await Promise.all(courses);
  }

  async edit(courseId, body, userId) {
    const course = await courseRepository.findById(courseId);

    checkCourseHelper(course, userId, "edit");
    return await courseRepository.edit(courseId, body);
  }

  async delete(courseId, userId) {
    const course = await courseRepository.findById(courseId);

    checkCourseHelper(course, userId, "delete");
    return await courseRepository.delete({ _id: courseId });
  }
}

module.exports = CourseService;
