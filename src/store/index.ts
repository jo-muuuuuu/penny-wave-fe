import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";

import persistedUserInfoReducer from "./reducers/userInfoSlice";
import persistedAccountBookReducer from "./reducers/accountBookSlice";
import persistedTransactionReducer from "./reducers/transactionSlice";
import persistedSavingsPlanReducer from "./reducers/savingsPlanSlice";
import persistedDepositReducer from "./reducers/depositSlicer";
import persistedBillReducer from "./reducers/billSlice";
import persistedRecurringBillReducer from "./reducers/recurringBillSlice";

export const store = configureStore({
  reducer: {
    userInfo: persistedUserInfoReducer,
    accountBook: persistedAccountBookReducer,
    transaction: persistedTransactionReducer,
    savingsPlan: persistedSavingsPlanReducer,
    deposit: persistedDepositReducer,
    bill: persistedBillReducer,
    recurringBill: persistedRecurringBillReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE", "persist/REGISTER"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
