import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { Bill } from "../../types/bill";
import { deleteBill, fetchBills, markBill } from "./billThunk";

interface BillState {
  billList: Bill[];
  billSelected: Bill | null;
}

const initialState: BillState = {
  billList: [],
  billSelected: null,
};

const billSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {
    setBillList: (state, action: PayloadAction<Bill[]>) => {
      // console.log("action.payload", action.payload);
      state.billList = action.payload;
    },

    setBillSelected: (state, action: PayloadAction<Bill | null>) => {
      // console.log("action.payload", action.payload);
      state.billSelected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBills.fulfilled, (state, action) => {
        state.billList = action.payload;
      })
      .addCase(fetchBills.rejected, () => initialState)
      .addCase(markBill.fulfilled, (state, action) => {
        state.billSelected = action.payload;
      })
      .addCase(deleteBill.fulfilled, (state, action) => {
        state.billList = state.billList.filter((bill) => bill.id !== action.payload);

        if (state.billSelected?.id === action.payload) {
          state.billSelected = null;
        }
      })
      .addCase("LOGOUT", () => initialState);
  },
});

const persistConfig = {
  key: "bill",
  storage,
};

const persistedBillReducer = persistReducer(persistConfig, billSlice.reducer);

export const { setBillList, setBillSelected } = billSlice.actions;
export default persistedBillReducer;
