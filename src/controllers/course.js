const CourseService = require("../services/course");
const courseService = new CourseService();

class CourseController {
  async create(request, response) {
    try {
      await courseService.create(request.user, request.body);

      response.status(200).send({ success: true });
    } catch (error) {
      response.status(400).send({ error: error.message });
    }
  }
  async getAll(request, response) {
    try {
      const { query } = request;
      const courses = await courseService.getAll(query);

      response.status(200).send(courses);
    } catch (error) {
      response.status(400).send({ error: error.message });
    }
  }

  async getCourse(request, response) {
    try {
      const { courseId } = request.params;
      const course = await courseService.getCourse(request.user.id, courseId);

      response.status(200).send(course);
    } catch (error) {
      response.status(400).send({ error: error.message });
    }
  }

  async getUsersCourses(request, response) {
    try {
      const courses = await courseService.getUsersCourses(request.user);

      response.status(200).send(courses);
    } catch (error) {
      response.status(400).send({ error: error.message });
    }
  }

  async subscribe(request, response) {
    try {
      const { courseId } = request.params;

      await courseService.subscribe(request.user, courseId);
      response.status(200).send({ success: true });
    } catch (error) {
      response.status(400).send({ error: error.message });
    }
  }

  async unsubscribe(request, response) {
    try {
      const { courseId } = request.params;

      await courseService.unsubscribe(request.user, courseId);
      response.status(200).send({ success: true });
    } catch (error) {
      response.status(400).send({ error: error.message });
    }
  }

  async edit(request, response) {
    try {
      const { courseId } = request.params;

      await courseService.edit(courseId, request.body, request.user.id);
      response.status(200).send({ success: true });
    } catch (error) {
      response.status(400).send({ error: error.message });
    }
  }

  async delete(request, response) {
    try {
      // console.log(` ~ CourseController ~ delete ~ request`, request);
      // console.log(
      //   ` ~ CourseContorller ~ delete ~ request.params`,
      //   request.params
      // );

      const { courseId } = request.params;
      // console.log(` ~ CourseController ~ delete ~ courseId`, courseId);

      // потерялось ↓
      await courseService.delete(courseId, request.user.id);

      response.status(200).send({ success: true });
    } catch (error) {
      response.status(400).send({ error: error.message });
    }
  }
}

module.exports = CourseController;
