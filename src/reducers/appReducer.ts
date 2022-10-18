import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

const slice = createSlice({
  name: "app",
  initialState: { status: "idle" as RequestStatusType },
  reducers: {
    setAppStatusAC(
      state,
      action: PayloadAction<{ status: RequestStatusType }>
    ) {
      state.status = action.payload.status;
    },
  },
  extraReducers: {},
});
export const appReducer = slice.reducer;
export const { setAppStatusAC } = slice.actions;
