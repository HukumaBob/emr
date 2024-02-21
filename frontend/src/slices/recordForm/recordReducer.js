export const initialRecordState = {
  record_type_name: "",
  findings: [],
};

export function recordReducer(state, action) {
  switch (action.type) {
    case "field": {
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
    }
    case "reset":
      return initialRecordState;
    case "load": {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
}
