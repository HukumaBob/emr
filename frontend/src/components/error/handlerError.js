import { setError } from "../../slices/errorSlice";
import { toast } from "react-toastify";

// Функция обработки ошибок
export async function handleError(error, dispatch, rejectWithValue) {
  dispatch(setError(error.message));
  toast.error(`Ошибка: ${error.message}`);
  return rejectWithValue(error.message);
}
