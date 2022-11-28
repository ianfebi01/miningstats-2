const initialState = {
  register: "",
};

export function MessageReducer(state = initialState, action) {
  switch (action.type) {
    case "REGISTERSUCCESS":
      return {
        ...state,
        register: action.payload,
      };

    default:
      return state;
  }
}
