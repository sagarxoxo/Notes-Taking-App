import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createNotes = createAsyncThunk("note/createnotes", async ({ variables, navigate, toast }, { rejectWithValue }) =>{
   try {
       const response = await api.createNotes(variables);
       toast.success('Notes Added Sucessfull!');
       navigate("/notes");
       return response.data;
   } catch (error) {
        return rejectWithValue(error.response.data);
   }
})

export const getNotes = createAsyncThunk("note/getNotes", async (_, { rejectWithValue }) =>{
    try {
        const response = await api.getNotes();
        return response.data;
    } catch (error) {
         return rejectWithValue(error.response.data);
    }
 })

 export const getNote = createAsyncThunk("note/getNote", async (id, { rejectWithValue }) =>{
    try {
        const response = await api.getNote(id);
        
        return response.data;
    } catch (error) {
         return rejectWithValue(error.response.data);
    }
 })
//variable name should be same as dispatch name in createNotes.js
 export const updateNote = createAsyncThunk("note/updateNote", async ({ id, variables, navigate, toast}, { rejectWithValue }) =>{
    try {
        
        const response = await api.updateNoteDa(id, variables); 
        
        toast.success(response.message, { position: toast.POSITION.TOP_CENTER });
        navigate("/notes");
        return response.data;
    } catch (error) {
         return rejectWithValue(error.response.data);
    }
 })

  export const deleteNote = createAsyncThunk("note/deleteNote", async (id, { rejectWithValue }) =>{
    try {
        const response = await api.deleteNote(id);
        return response.data;
    } catch (error) {
         return rejectWithValue(error.response.data);
    }
 })

const notesSlice = createSlice({
    name: "notes",
    initialState: {
      note: {},
      notes: [],
      user: [],
      error: "",
      loading: false,
    },
    
    extraReducers: {
        [createNotes.pending]: (state, action) => {
            state.loading = true;
          },
        [createNotes.fulfilled]: (state, action) => {
            state.loading = false;
            state.notes = [action.payload];
        },
        [createNotes.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getNotes.pending]: (state, action) => {
            state.loading = true;
          },
        [getNotes.fulfilled]: (state, action) => {
            state.loading = false;
            state.notes = action.payload;
        },
        [getNotes.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getNote.pending]: (state, action) => {
            state.loading = true;
          },
        [getNote.fulfilled]: (state, action) => {
            state.loading = false;
            state.note = action.payload;
        },
        [getNote.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [deleteNote.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteNote.fulfilled]: (state, action) => {
            state.loading = false;
            state.notes = state.notes.filter((item) => item._id !== action.payload._id);
        },
        [deleteNote.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },

        [updateNote.pending]: (state, action) => {
            state.loading = true;
        },
        [updateNote.fulfilled]: (state, action) => {
            state.loading = false;
            state.notes = state.notes.map((post) => post._id === action.payload._id ? post : [action.payload]);
        },
        [updateNote.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
    }
});

export default notesSlice.reducer;