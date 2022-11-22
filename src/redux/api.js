import axios from 'axios';

const { REACT_APP_PROD_API} = process.env

const API = axios.create({
    baseURL: REACT_APP_PROD_API
});

export const signIn = (formData) => API.post("/users/signin",formData);
export const signUp = (formData) => API.post("/users/signup", formData);
export const googleSignIn = (result) => API.post("/users/googleSignIn", result);

export const createNotes = (result) => API.post("/createnotes", result);

export const getNotes = () => API.get("/notes");
export const getNote = (id) => API.get(`/notes/${id}`);

export const updateNoteDa = (id, updatedNoteData) => API.patch(`/notes/${id}`, updatedNoteData);

export const deleteNote = (id) => API.delete(`/notes/${id}`);

