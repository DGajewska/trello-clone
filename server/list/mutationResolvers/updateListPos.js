module.exports = async (__, args, cxt) => {
  try {
    const listId = args.request.listId;
    const pos = args.request.pos;

    const list = await cxt.list.updatePos(listId, pos);
    console.log("list", list);
    cxt.publisher.publish(cxt.SUBSCRIPTION_CONSTANTS.ON_LIST_POS_CHANGE, {
      onListPosChange: list,
    });
  
    return list;
  } catch (e) {
    console.log("Error =>", e);
    return null;
  }
};