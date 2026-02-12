import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/index";
import { antdSuccess, antdError } from "../../utils/antdMessage";
import { Bill, NewBillPayload } from "../../types/bill";

export const fetchBills = createAsyncThunk<Bill[]>(
  "bill/fetchBills",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/bills`);
      // console.log("Success!", response.data.billList);

      return response.data.billList as Bill[];
    } catch (error) {
      antdError("Failed to fetch bills!");
      console.error("Error fetching bills", error);
      return rejectWithValue(error);
    }
  },
);

export const newBill = createAsyncThunk<void, NewBillPayload>(
  "bill/newBill",
  async (values, { rejectWithValue }) => {
    try {
      await axiosInstance.post(`/bills`, values);
      antdSuccess("Success!");
    } catch (error) {
      antdError("Failed to add new bill!");
      console.error("Error adding bills", error);
      return rejectWithValue(error);
    }
  },
);
