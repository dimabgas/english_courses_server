module.exports = (course, userId, text) => {
  if (!course) {
    throw new Error(`There is no such course.`);
  }
  if (userId !== course.owner.id.toString()) {
    throw new Error(
      `You can't ${text} this course because you are not an author.`
    );
  }
};
