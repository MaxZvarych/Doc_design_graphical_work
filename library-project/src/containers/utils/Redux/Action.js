export const updateReserved = "UPDATE_RESERVED_ITEM";
export const createReserved = "CREATE_RESERVED_ITEM";
export const deleteReserved = "DELETE_RESERVED_ITEM";
export const resetReserved = "RESET_RESERVED_ITEMS";

export const startAction = { type: "start", payload: "Empty payload" };

export const updateItem = (item) => {
  return { type: updateReserved, payload: item };
};

export const createItem = (item) => {
  return { type: createReserved, payload: item };
};

export const deleteItem = (item) => {
  return { type: deleteReserved, payload: item };
};

export const resetItems = { type: resetReserved };
