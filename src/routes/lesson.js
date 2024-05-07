const router = require("express").Router();
const isAuthenticated = require("../middlewares/is-authenticated");
const isTeacher = require("../middlewares/is-teacher");

const LessonController = require("../controllers/lesson");
const lessonController = new LessonController();

router.use(isAuthenticated);

router.post("/api/course/:courseId/lesson", isTeacher, lessonController.create);
router.get("/api/course/:courseId/lessons", lessonController.getLessonsList);
router.get("/api/lesson/:lessonId", lessonController.getLessonDetails);
router.delete("/api/lesson/:lessonId", lessonController.delete);
router.put("/api/lesson/:lessonId", lessonController.edit);

module.exports = router;
