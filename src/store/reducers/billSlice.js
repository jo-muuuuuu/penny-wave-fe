import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  billList: [],
  billSelected: null,
};

const billSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {
    setBillList: (state, action) => {
      // console.log("action.payload", action.payload);
      state.billList = action.payload;
    },

    setBillSelected: (state, action) => {
      // console.log("action.payload", action.payload);
      state.billSelected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase("LOGOUT", () => initialState);
  },
});

const persistConfig = {
  key: "bill",
  storage,
};

const persistedBillReducer = persistReducer(persistConfig, billSlice.reducer);

export const { setBillList, setBillSelected } = billSlice.actions;
export default persistedBillReducer;
