import { createSlice } from "@reduxjs/toolkit";
import { get } from "lodash";

export const AuthInitialState = {
  isAuthenticated: false,
  balance: "",
  tier1Parent: "",
  tier2Parent: "",
  tier3Parent: "",
  userName: "",
  userRole: "",
  isUserDisabled: false,
  isUserDeleted: false,
  upiId: "",
  bankName: "",
  ifscCode: "",
  registeredName: "",
  usersList: [],
  totalCommissions: 0,
  totalUsers: 0,
  financialDetails: [],
  adminsList: [],
  commissionDetails: [],
  lastLogins: [],
  totalDeposits: 0,
  totalWithdrawals: 0,
  mobileNumber: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: AuthInitialState,
  reducers: {
    setAdminUser: (state, action) => ({
      ...state,
      isAuthenticated: true,
      balance: get(action, "payload.balance", 0),
      tier1Parent: get(action, "payload.tier1Parent", ""),
      tier2Parent: get(action, "payload.tier2Parent", ""),
      tier3Parent: get(state, "payload.tier3Parent", ""),
      userName: get(action, "payload.userName", ""),
      userRole: get(action, "payload.userRole", ""),
      isUserDisabled: get(action, "payload.isUserDisabled", false),
      isUserDeleted: get(action, "payload.isUserDeleted", false),
      upiId: get(action, "payload.upiId", ""),
      bankName: get(action, "payload.bankName", ""),
      ifscCode: get(action, "payload.ifscCode", ""),
      accountHolderName: get(action, "payload.accountHolderName", ""),
      accountNo: get(action, "payload.accountNo", ""),
      totalCommissions: get(action, "payload.totalCommissions", 0),
      totalUsers: get(action, "payload.totalUsers", 0),
      financialDetails: get(action, "payload.financialDetails", []),
      commissionDetails: get(action, "payload.commissionDetails", []),
      lastLogins: get(action, "payload.lastLogins", []),
      totalDeposits: get(action, "payload.totalDeposits", 0),
      totalWithdrawals: get(action, "payload.totalWithdrawals", 0),
    }),
    setUsersList: (state, action) => ({
      ...state,
      usersList: action.payload,
    }),
    setBalance: (state, action) => ({
      ...state,
      balance: action.payload,
    }),
    setAdminsList: (state, action) => ({
      ...state,
      adminsList: action.payload,
    }),
    resetAuth: () => ({
      ...AuthInitialState,
    }),
  },
});

export const {
  setAdminUser,
  setUsersList,
  setBalance,
  resetAuth,
  setAdminsList,
} = authSlice.actions;

export default authSlice.reducer;
