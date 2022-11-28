const initialState = {
  overview: {},
  allCost: [],
  allIncome: [],
};

export function DataReducer(state = initialState, action) {
  switch (action.type) {
    case "OVERVIEW":
      return {
        ...state,
        overview: action.payload,
      };
    case "ALLCOST":
      return {
        ...state,
        allCost: action.payload,
      };
    case "ALLINCOME":
      return {
        ...state,
        allIncome: action.payload,
      };
    case "REMOVE":
      return null;

    default:
      return state;
  }
}
