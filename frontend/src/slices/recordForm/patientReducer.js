export const initialRecordState = {
  record_type: { name: { short_name: "jjj" } },
  findings: "",
  diagnosis: "",
  recommendations: "",
};

export function patientReducer(state, action) {
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
