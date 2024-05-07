const { getFilteredNewObject } = require("./utils");

class BaseSerializer {
  constructor(model) {
    if (typeof model.toObject !== "function") {
      throw Error("Given object is not a mongo object");
    }
    this.model = model.toObject();
  }

  serialize(exclude = []) {
    return getFilteredNewObject(this.model, exclude);
  }
}

module.exports = BaseSerializer;
