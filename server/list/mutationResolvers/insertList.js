module.exports = async (__, args, cxt) => {
  try {
    const listInfo = {
      title: args.request.title,
      label: args.request.label,
      pos: args.request.pos,
    };
    const list = await cxt.list.insertList(listInfo);
    cxt.publisher.publish(cxt.SUBSCRIPTION_CONSTANTS.LIST_ADDED, {
      listAdded: list,
    });
    return list;
  } catch (e) {
    console.log(e);
    return null;
  }
};