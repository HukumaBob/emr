import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import createBookWithId from "../../utils/createBookWithId";
import { setError } from "./errorSlice";
const initialState = {

const initialState = {
    isAuthenticated: localStorage.getItem("token") ? true : false,
    token: localStorage.getItem("token") || null,
  };
export const fetchBook = createAsyncThunk(
  "books/fetchBook",
  async (url, thunkAPI) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      thunkAPI.dispatch(setError(error.message));
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const booksSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.token.push(action.payload);
    },
    deleteBook: (state, action) => {
      // const index = state.findIndex((book) => book.id === action.payload);
      // if (index !== -1) {
      //   state.splice(index, 1);
      // }
      // Или такой вариант
      return {
        ...state,
        books: state.books.filter((book) => action.payload !== book.id),
      };
    },
    toggleFavorite: (state, action) => {
      state.token.forEach((token) => {
        if (book.id === action.payload) {
          book.isFavorite = !book.isFavorite;
        }
      });
      // Или такой вариант
      // return state.map((book) =>
      //   book.id === action.payload
      //     ? {
      //         ...book,
      //         isFavorite: !book.isFavorite,
      //       }
      //     : book
      // );
    },
  },
  // Это не работает!
  // extraReducers: {
  //   [fetchBook.fulfilled]: (state, action) => {
  //     if (action.payload.author && action.payload.title) {
  //       state.push(createBookWithId(action.payload, "API"));
  //     }
  //   },
  // },
  extraReducers: (builder) => {
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      state.isAuthenticated = false;
      if (action.payload.author && action.payload.title) {
        state.token.push(createBookWithId(action.payload, "API"));
      }
    });
    builder.addCase(fetchBook.pending, (state) => {
      state.isAuthenticated = true;
    });
    builder.addCase(fetchBook.rejected, (state) => {
      state.isAuthenticated = true;
    });
  },
});
export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions;
// export const thunkFunction = async (dispatch, getState) => {
//   try {
//     const res = await axios.get("http://localhost:4000/random-book ");
//     if (res.data && res.data.author && res.data.title) {
//       dispatch(addBook(createBookWithId(res.data, "API")));
//     }
//   } catch (error) {
//     console.log("Error fetching random book ", error);
//   }
// };
export const selectBooks = (state) => state.books.books;
export const selectIsAuthenticated = (state) => state.books.isAuthenticated;
export default booksSlice.reducer;
