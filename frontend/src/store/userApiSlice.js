import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AUTH_URL = "http://localhost:5000/api/users";

// Action Types
export const SIGN_IN = "/login";
export const SIGN_UP = "/register";
export const LOGOUT = "/logout";
export const UPDATE_PROFILE = "/updateProfile";
export const GET_ALL_USERS = "/getAllUsers";
export const DELETE_USER = "/deleteUser";
// Async Thunks
export const signInAsync = createAsyncThunk(SIGN_IN, async (userData) => {
  try {
    const response = await axios.post(`${AUTH_URL}/login`, userData, {
      withCredentials: true, // Include credentials in the request
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
});

export const signUpAsync = createAsyncThunk(SIGN_UP, async (userData) => {
  try {
    const response = await axios.post(`${AUTH_URL}/register`, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
});

export const logoutAsync = createAsyncThunk(LOGOUT, async () => {
  await axios.post(`${AUTH_URL}/logout`, null, { withCredentials: true });
});

export const updateProfileAsync = createAsyncThunk(
  UPDATE_PROFILE,
  async (formData) => {
    try {
      const response = await axios.put(
        "http://localhost:8080/api/update",
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw error.response.data.error;
    }
  }
);

export const getAllUsersAsync = createAsyncThunk(GET_ALL_USERS, async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/getallusers", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
});

export const deleteUserAsync = createAsyncThunk(DELETE_USER, async (userId) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/deleteuser/${userId}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
});

const userApiSlice = createSlice({
  name: "userApi",
  initialState: {
    loading: false,
    error: null,
    user: null,
    users: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // SignIn, SignUp, and Logout cases
      .addCase(signInAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        toast.success("Connexion réussie");
      })
      .addCase(signInAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Échec de la connexion";
        if (action.error.message === "Invalid email or password") {
          toast.error("Adresse e-mail ou mot de passe incorrect");
        } else if (action.error.message === "User not found") {
          toast.error("Utilisateur non trouvé");
        } else if (action.error.message === "User already exists") {
          toast.error("L'utilisateur existe déjà");
        } else {
          toast.error("Adresse e-mail ou mot de passe incorrect");
        }
      })
      // Add other SignIn, SignUp, and Logout cases similarly

      // UpdateProfile case
      .addCase(updateProfileAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        toast.success("Profil mis à jour avec succès");
      })
      // GetAllUsers case
      .addCase(getAllUsersAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      // DeleteUser case
      .addCase(deleteUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserAsync.fulfilled, (state) => {
        state.loading = false;
        // You may want to handle the removal of the deleted user from state here
        toast.success("Utilisateur supprimé avec succès");
      })
      .addCase(deleteUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Échec de la suppression de l'utilisateur";
        if (action.error.message === "Unauthorized") {
          toast.error("Non autorisé");
        } else {
          toast.error("Quelque chose s'est mal passé");
        }
      });
    // General error handling for all async thunks
  },
});

export default userApiSlice.reducer;
