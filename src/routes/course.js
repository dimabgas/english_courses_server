const router = require("express").Router();
const isAuthenticated = require("../middlewares/is-authenticated");
const isTeacher = require("../middlewares/is-teacher");
const isStudent = require("../middlewares/is-student");

const CourseController = require("../controllers/course");
const courseController = new CourseController();

router.use(isAuthenticated);

router.post("/api/course", isTeacher, courseController.create);
router.get("/api/courses", courseController.getAll);

router.get("/api/users/courses", courseController.getUsersCourses);
router.get("/api/course/:courseId", courseController.getCourse);

router.put(
  "/api/course/subscribe/:courseId",
  isStudent,
  courseController.subscribe
);

router.delete(
  "/api/course/unsubscribe/:courseId",
  isStudent,
  courseController.unsubscribe
);

router.put("/api/course/edit/:courseId", isTeacher, courseController.edit);
router.delete(
  "/api/course/delete/:courseId",
  isTeacher,
  courseController.delete
);

module.exports = router;
