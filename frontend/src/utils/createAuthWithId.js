import { v4 as uuidv4 } from "uuid";
const createAuthWithId = (token, source) => {
  return {
    ...token,
    source,
    id: uuidv4(),
    isAuthenticated: false,
  };
};
export default createAuthWithId;
