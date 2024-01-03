import { createSlice } from "@reduxjs/toolkit";

export const helloSlice = createSlice({
  name: "hello",
  initialState: {
    value: "HELLO WORLD",
  },
  reducers: {
    shout: (_) => {
      console.log("HELLO UDIN");
    },
  },
});

export const { shout } = helloSlice.actions;
export default helloSlice.reducer;
