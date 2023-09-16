import { createSlice } from "@reduxjs/toolkit";

export const GameInitialState = {
  andarBahar: {
    blocked: false,
    removed: false,
    blockRemarks: "",
    mode: 'low'
  },
  dragonTiger: {
    blocked: false,
    removed: false,
    blockRemarks: "",
    mode: 'low'
  },
  luckySeven: {
    blocked: false,
    removed: false,
    blockRemarks: "",
    mode: 'low'
  },
};

const gameSlice = createSlice({
  name: "game",
  initialState: GameInitialState,
  reducers: {
    setAndarBahar: (state, action) => ({
      ...state,
      andarBahar: action.payload,
    }),
    setDragonTiger: (state, action) => ({
      ...state,
      dragonTiger: action.payload,
    }),
    setLuckySeven: (state, action) => ({
      ...state,
      luckySeven: action.payload,
    }),
    resetGame: () => ({
      ...GameInitialState
    })
  },
});

export const { setAndarBahar, setDragonTiger, setLuckySeven, resetGame } =
  gameSlice.actions;

export default gameSlice.reducer;
