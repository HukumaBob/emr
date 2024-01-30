export const initialPatientState = {
  first_name: "",
  middle_name: "",
  last_name: "",
  date_of_birth: "",
  sex: "",
  address: "",
  phone_number: "",
  email: "",
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
      return initialPatientState;
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
