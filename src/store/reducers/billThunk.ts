import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/index";
import { antdSuccess, antdError } from "../../utils/antdMessage";
import { OnceOffBill, BillFormValues } from "../../types/bill";

export const fetchBills = createAsyncThunk<OnceOffBill[]>(
  "bill/fetchBills",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/bills`);
      // console.log("Success!", response.data.billList);

      return response.data.billList as OnceOffBill[];
    } catch (error) {
      antdError("Failed to fetch bills!");
      console.error("Error fetching bills", error);
      return rejectWithValue(error);
    }
  },
);

export const newBill = createAsyncThunk<void, BillFormValues>(
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

export const editBill = createAsyncThunk<void, BillFormValues>(
  "bill/editBill",
  async (values, { rejectWithValue }) => {
    try {
      await axiosInstance.put(`/bills/${values.id}`, values);
      antdSuccess("Bill updated!");
    } catch (error) {
      antdError("Failed to update bill!");
      console.error("Error updating bill", error);
      return rejectWithValue(error);
    }
  },
);

export const markBill = createAsyncThunk<OnceOffBill, { id: number; action: string }>(
  "bill/markBill",
  async ({ id, action }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.patch(`bills/${id}`, { action });
      antdSuccess("Bill updated!");

      return response.data.bill as OnceOffBill;
    } catch (error) {
      antdError("Failed to update bill!");
      console.error("Error updating bill", error);
      return rejectWithValue(error);
    }
  },
);

export const deleteBill = createAsyncThunk<number, number>(
  "bill/deleteBill",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`bills/${id}`);
      antdSuccess("Bill deleted!");

      return id;
    } catch (error) {
      antdError("Failed to delete bill!");
      console.error("Error deleting bill", error);
      return rejectWithValue(error);
    }
  },
);
