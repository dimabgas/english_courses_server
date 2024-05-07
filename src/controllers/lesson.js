const LessonService = require("../services/lesson");
const lessonService = new LessonService();

class LessonController {
  async create(request, response) {
    try {
      const { courseId } = request.params;

      await lessonService.create(courseId, request.user.id, request.body);

      response.status(200).send({ success: true });
    } catch (error) {
      response.status(400).send({ error: error.message });
    }
  }

  async getLessonsList(request, response) {
    try {
      const { courseId } = request.params;

      const lessonsList = await lessonService.getLessonsList(courseId);

      if (lessonsList < 0) {
        throw new Error("There aren't any lessons yet");
      }

      response.status(200).send(lessonsList);
    } catch (error) {
      response.status(400).send({ error: error.message });
    }
  }

  async getLessonDetails(request, response) {
    try {
      const { lessonId } = request.params;

      const lessonDetails = await lessonService.getLessonDetails(lessonId);

      response.status(200).send(lessonDetails);
    } catch (error) {
      response.status(400).send({ error: error.message });
    }
  }

  async delete(request, response) {
    try {
      const { lessonId } = request.params;

      await lessonService.delete(lessonId);

      response.status(200).send({ success: true });
    } catch (error) {
      response.status(400).send({ error: error.message });
    }
  }

  async edit(request, response) {
    try {
      const { lessonId } = request.params;

      await lessonService.edit(lessonId, request.body);

      response.status(200).send({ success: true });
    } catch (error) {
      response.status(400).send({ error: error.message });
    }
  }
}

module.exports = LessonController;
