import axios from "axios";
import { setAlert } from "./alertActions";

import { GET_SHIFT_BY_ID, GET_SHIFTS, SHIFT_ERROR } from "./types";

// Get shift by ID
export const getShiftById = id => async dispatch => {
  try {
    const res = await axios.get(`/api/shifts/${id}`);

    dispatch({
      type: GET_SHIFT_BY_ID,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SHIFT_ERROR,
      payload: { message: err.response.statusText, status: err.response.status }
    });
  }
};

// Get all shifts
export const getShifts = () => async dispatch => {
  try {
    const res = await axios.get("/api/shifts/");

    dispatch({
      type: GET_SHIFTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SHIFT_ERROR,
      payload: { message: err.response.statusText, status: err.response.status }
    });
  }
};

// Get shift by date range
export const getShiftsByDateRange = (from, to) => async dispatch => {
  try {
    const res = await axios.get(`/api/shifts/${from}/${to}`);

    dispatch({
      type: GET_SHIFTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SHIFT_ERROR,
      payload: { message: err.response.statusText, status: err.response.status }
    });
  }
};

// Create or update shift
export const createShift = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post("/api/shifts", formData, config);

    dispatch({
      type: GET_SHIFTS,
      payload: res.data
    });

    dispatch(setAlert(edit ? "Shift Updated" : "Shift Created", "success"));

    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.message, "danger")));
    }

    dispatch({
      type: SHIFT_ERROR,
      payload: { message: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete shift
export const deleteShift = id => async dispatch => {
  try {
    await axios.delete(`/api/shifts/${id}`);

    dispatch(setAlert("Shift has been deleted.", "danger"));
  } catch (err) {
    dispatch({
      type: SHIFT_ERROR,
      payload: { message: err.response.statusText, status: err.response.status }
    });
  }
};
