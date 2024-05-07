module.exports = (query) => {
  let pageNum, responsePerPage;
  let { page, size } = query;

  page = parseInt(page);
  size = parseInt(size);

  page ? (pageNum = page) : (pageNum = 1);
  size ? (responsePerPage = size) : (responsePerPage = 10);

  const offset = responsePerPage * pageNum - responsePerPage;
  const limit = responsePerPage;

  return {
    offset,
    limit,
  };
};
