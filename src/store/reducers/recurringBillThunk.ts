import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/index";
import { antdSuccess, antdError } from "../../utils/antdMessage";
import { RecurringBill, BillFormValues } from "../../types/bill";

export const fetchRecurringBills = createAsyncThunk<RecurringBill[]>(
  "recurringBill/fetchRecurringBills",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/recurring-bills`);
      // console.log("Success!", response.data.recurringBillList);
      return response.data.recurringBillList as RecurringBill[];
    } catch (error) {
      antdError("Failed to fetch recurring bills!");
      console.error("Error fetching recurring bills", error);
      return rejectWithValue(error);
    }
  },
);

export const newRecurringBill = createAsyncThunk<void, BillFormValues>(
  "recurringBill/newRecurringBill",
  async (values, { rejectWithValue }) => {
    try {
      await axiosInstance.post(`/recurring-bills`, values);
      antdSuccess("Success!");
    } catch (error) {
      antdError("Failed to add new recurring bill!");
      console.error("Error adding recurring bill", error);
      return rejectWithValue(error);
    }
  },
);

export const editRecurringBill = createAsyncThunk<void, BillFormValues>(
  "recurringBill/editRecurringBill",
  async (values, { rejectWithValue }) => {
    try {
      await axiosInstance.put(`/recurring-bills/${values.id}`, values);
      antdSuccess("Recurring bill updated!");
    } catch (error) {
      antdError("Failed to update recurring bill!");
      console.error("Error updating recurring bill", error);
      return rejectWithValue(error);
    }
  },
);

export const changeRecurringBillStatus = createAsyncThunk<
  RecurringBill,
  { id: number; action: string }
>(
  "recurringBill/changeRecurringBillStatus",
  async ({ id, action }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/recurring-bills/${id}`, { action });
      antdSuccess("Recurring bill updated!");

      return response.data.recurringBill as RecurringBill;
    } catch (error) {
      antdError("Failed to update recurring bill!");
      console.error("Error updating recurring bill", error);
      return rejectWithValue(error);
    }
  },
);

export const deleteRecurringBill = createAsyncThunk<number, number>(
  "recurringBill/deleteRecurringBill",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/recurring-bills/${id}`);
      antdSuccess("Recurring bill deleted!");

      return id;
    } catch (error) {
      antdError("Failed to delete recurring bill!");
      console.error("Error deleting recurring bill", error);
      return rejectWithValue(error);
    }
  },
);
