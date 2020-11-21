module.exports = async (__, args, cxt) => {
  try {
    const itemInfo = {
      title: args.request.title,
      label: args.request.label,
      pos: args.request.pos,
      listId: args.request.listId,
    };

    const item = await cxt.item.insertItem(itemInfo);

    cxt.publisher.publish(cxt.SUBSCRIPTION_CONSTANTS.ITEM_ADDED, {
      itemAdded: item,
    });

    return item;
  } catch (e) {
    console.log("Error =>", e);

    return null;
  }
};