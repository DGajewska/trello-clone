module.exports = async (__, args, cxt) => {
  try {
    const listId = args.request.listId;

    const items = await cxt.item.getItemByListId(listId);

    return items;
  } catch (e) {
    console.log("Error =>", e);
    return null;
  }
};