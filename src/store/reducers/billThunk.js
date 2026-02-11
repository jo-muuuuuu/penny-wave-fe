import axiosInstance from "../../api/index";
import { antdSuccess, antdError } from "../../utils/antdMessage";
import { setBillList } from "./billSlice";

export const fetchBills = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get(`/bills`);

    if (response.status === 200) {
      // console.log("Success!", response.data.billList);
      dispatch(setBillList(response.data.billList));
      // antdSuccess("Success!");
    }
  } catch (error) {
    antdError("Failed to fetch bills!");
    console.error("Error fetching bills", error);
  }
};

export const newBill = (values) => async () => {
  try {
    const response = await axiosInstance.post(`/bills`, values);

    if (response.status === 200) {
      // console.log("Success!", response.data);
      antdSuccess("Success!");
    }
  } catch (error) {
    antdError("Failed to add new bill!");
    console.error("Error adding bills", error);
  }
};
