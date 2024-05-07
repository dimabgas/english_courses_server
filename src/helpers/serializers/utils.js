const EXCLUDED_FIELDS = ["password", "__v"];

const getFilteredNewObject = (object, propertiesToExclude = []) => {
  const excludedFields = new Set(EXCLUDED_FIELDS.concat(propertiesToExclude));
  const result = {};

  for (const property in object) {
    if (!excludedFields.has(property)) {
      const newPropertyName = property === "_id" ? "id" : property;
      result[newPropertyName] = object[property];
    }
  }
  return result;
};

module.exports = {
  getFilteredNewObject,
};
