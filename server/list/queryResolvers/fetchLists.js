module.exports = async (__, args, cxt) => {
  try {
    const lists = await cxt.list.getLists();

    return lists;
  } catch (e) {
    console.log("Error => ", e);

    return null;
  }
};