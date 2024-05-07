const Course = require("../models/course");

class CourseRepository {
  create(courseData) {
    const course = new Course(courseData);

    return course.save();
  }
  async getAll(pagination, condition) {
    const { limit, offset } = pagination;

    const courses = await Course.find(condition)
      .skip(offset)
      .limit(limit)
      .populate({ path: "owner", select: "avatar email firstName secondName" })
      .populate({
        path: "students",
        select: "avatar email firstName secondName",
      });

    const coursesCount = await Course.countDocuments(condition);

    return {
      courses,
      coursesCount,
    };
  }

  getUsersCourses(condition) {
    return Course.find(condition)
      .populate({ path: "owner", select: "avatar email firstName secondName" })
      .populate({
        path: "students",
        select: "avatar email firstName secondName",
      });
  }

  findOne(condition) {
    return Course.findOne(condition);
  }
  findById(id) {
    return Course.findById(id)
      .populate({
        path: "owner",
        select: "avatar email firstName secondName",
      })
      .populate({
        path: "lessons",
        select: "title",
      });
  }
  edit(id, body) {
    const filter = { _id: id };
    const update = { ...body };

    return Course.updateOne(filter, update);
  }
  delete(condition) {
    return Course.findOneAndRemove(condition);
  }
}

module.exports = CourseRepository;
