import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import NotesReducer from './features/notesSlice'

export default configureStore({
  reducer: {
    auth: AuthReducer,
    notes: NotesReducer,
  },
});