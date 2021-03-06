const Mongoose = require("mongoose");
const listSchema = new Mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  description: String,
  pos: {
    type: Number,
    required: true,
  },
});


class List {
  static getLists() {
    return this.find().sort("pos").exec();
  }
  static getListById(listId) {
    return this.findOne({
      _id: Mongoose.mongo.ObjectID(listId),
    }).exec();
  }
  static insertList(listInfo) {
    const list = this(listInfo);
    return list.save();
  }
  static updatePos(listId, pos) {
    return this.findOneAndUpdate(
      {
        _id: Mongoose.mongo.ObjectID(listId),
      },
      {
        $set: {
          pos,
        },
      },
      {
        new: true,
      }
    ).exec();
  }
}
listSchema.loadClass(List);
module.exports = Mongoose.model("List", listSchema);