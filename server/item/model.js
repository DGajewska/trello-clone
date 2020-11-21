const Mongoose = require("mongoose");
const itemSchema = new Mongoose.Schema(
  {
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
    listId: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "List",
    },
  },
  { timestamps: true }
);

class Item {
  static insertItem(itemInfo) {
    const item = this(itemInfo);
    return item.save();
  }
  static getItemByListId(listId) {
    return this.find({ listId }).sort("pos").exec();
  }
  static updatePos(itemId, pos, listId) {
    return this.findOneAndUpdate(
      {
        _id: Mongoose.mongo.ObjectID(itemId),
      },
      {
        $set: {
          pos,
          listId,
        },
      }
    ).exec();
  }
}
itemSchema.loadClass(Item);
module.exports = Mongoose.model("Item", itemSchema);