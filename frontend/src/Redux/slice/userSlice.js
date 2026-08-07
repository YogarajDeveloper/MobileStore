import { createSlice } from "@reduxjs/toolkit";

const session = JSON.parse(sessionStorage.getItem("auth"));

const initialState = {
  user:session?.user ? session?.user : "",
  token: session?.token ? session?.token :"",
  isLoggedIn: session?.isLoggedIn ?? false};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

    setUser: (state, action) => {
      const changes = action.payload;

      const newState = {
        ...state,
        ...changes,
      };

      sessionStorage.setItem( "auth", JSON.stringify(newState));

      return newState;
    }
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;