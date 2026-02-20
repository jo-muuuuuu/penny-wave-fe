import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { RecurringBill } from "../../types/bill";
import {
  changeRecurringBillStatus,
  deleteRecurringBill,
  fetchRecurringBills,
} from "./recurringBillThunk";

interface RecurringBillState {
  recurringBillList: RecurringBill[];
  recurringBillSelected: RecurringBill | null;
}

const initialState: RecurringBillState = {
  recurringBillList: [],
  recurringBillSelected: null,
};

const recurringBillSlice = createSlice({
  name: "recurringBill",
  initialState,
  reducers: {
    setRecurringBillList: (state, action: PayloadAction<RecurringBill[]>) => {
      state.recurringBillList = action.payload;
    },

    setRecurringBillSelected: (state, action: PayloadAction<RecurringBill | null>) => {
      state.recurringBillSelected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecurringBills.fulfilled, (state, action) => {
        state.recurringBillList = action.payload;
      })
      .addCase(fetchRecurringBills.rejected, () => initialState)
      .addCase(changeRecurringBillStatus.fulfilled, (state, action) => {
        state.recurringBillSelected = action.payload;
      })
      .addCase(deleteRecurringBill.fulfilled, (state, action) => {
        state.recurringBillList = state.recurringBillList.filter(
          (bill) => bill.id !== action.payload,
        );

        if (state.recurringBillSelected?.id === action.payload) {
          state.recurringBillSelected = null;
        }
      })
      .addCase("LOGOUT", () => initialState);
  },
});

const persistConfig = {
  key: "recurringBill",
  storage,
};

const persistedRecurringBillReducer = persistReducer(
  persistConfig,
  recurringBillSlice.reducer,
);

export const { setRecurringBillList, setRecurringBillSelected } =
  recurringBillSlice.actions;
export default persistedRecurringBillReducer;
