module.exports = async (__, args, cxt) => {
  try {
    const itemId = args.request.itemId;
    const pos = args.request.pos;
    const listId = args.request.listId;
    const item = await cxt.item.updatePos(itemId, pos, listId);

    return item;
  } catch (e) {
    console.log("Error => ", e);

    return null;
  }
};