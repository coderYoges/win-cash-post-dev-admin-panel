import { createSlice } from "@reduxjs/toolkit";
import { get } from "lodash";

export const RatesInitialState = {
  tier1Percentage: 0,
  tier2Percentage: 0,
  tier3Percentage: 0,
};

const ratesSlice = createSlice({
  name: "rates",
  initialState: RatesInitialState,
  reducers: {
    setRates: (state, action) => ({
      ...state,
      tier1Percentage: get(action, "payload.tier1Percentage", 0),
      tier2Percentage: get(action, "payload.tier2Percentage", 0),
      tier3Percentage: get(action, "payload.tier3Percentage", 0),
    }),
    resetRates: () => ({
      ...RatesInitialState,
    }),
  },
});

export const { setRates, resetRates } = ratesSlice.actions;

export default ratesSlice.reducer;
