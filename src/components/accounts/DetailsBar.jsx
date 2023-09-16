import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { postRequest } from "../../api";
import { WIN_CASH_URL } from "../../config/routeConfig";

const DetailsLabel = styled.div`
  font-weight: 600;
  font-size: 16;
  color: #808080;
  padding-bottom: 4px;
`;

const DetailsValue = styled.div`
  font-weight: 700;
  font-size: 18;
  color: ${({ codeRed }) => (codeRed ? "red" : "#000")};
`;

const DetailsBar = ({
  balance,
  userRole,
  usersList = [],
  adminsList = [],
  totalDeposits = 0,
  totalWithdrawal = 0,
  totalCommissions = 0,
}) => {
  const [usersExposure, setUsersExposure] = useState(0);
  const [usersBalance, setUsersBalance] = useState(0);
  const [adminsDues, setAdminsDues] = useState(0);
  const [usersDues, setUsersDues] = useState(0);

  useEffect(() => {
    setUsersBalance(0);
    setUsersExposure(0);
    setAdminsDues(0);
    setUsersDues(0);

    let totalUsersExposure = 0;
    let totalUsersBalance = 0;

    const fetchAllDetails = () => {
      if (adminsList.length > 0) {
        adminsList?.map(async (admin) => {
          const childAdminsList = await postRequest(
            WIN_CASH_URL.GET_ADMINS_LIST,
            {
              parentName: admin.userName,
            }
          );
          if (childAdminsList.data.length > 0) {
            const adminBalsList = [...adminsList, ...childAdminsList.data].map(
              ({ balance = 0, totalWithdrawal = 0, totalCommissions = 0 }) => {
                return balance + totalWithdrawal - totalCommissions;
              }
            );

            const adminBals = adminBalsList.reduce(
              (accumulator, currentValue) => {
                return accumulator + currentValue;
              },
              0
            );

            setAdminsDues(adminBals);
          }
          const childUsersList = await postRequest(
            WIN_CASH_URL.GET_USERS_LIST,
            {
              parentName: admin.userName,
            }
          );
          if (childUsersList.data.length > 0) {
            const usersBalsList = [...usersList, ...childUsersList.data].map(
              ({ balance = 0, totalWithdrawal = 0 }) => {
                return balance + totalWithdrawal;
              }
            );

            const usersBals = usersBalsList.reduce(
              (accumulator, currentValue) => {
                return accumulator + currentValue;
              },
              0
            );
            setUsersDues(usersBals);
          }
        });
      } else {
        if (usersList.length > 0) {
          const usersBalsList = [...usersList].map(
            ({ balance = 0, totalWithdrawal = 0 }) => {
              return balance + totalWithdrawal;
            }
          );

          const usersBals = usersBalsList.reduce(
            (accumulator, currentValue) => {
              return accumulator + currentValue;
            },
            0
          );
          setUsersDues(usersBals);
        }
      }
    };

    fetchAllDetails();

    usersList.length > 0 &&
      usersList.map(({ bets = 0, balance = 0 }) => {
        totalUsersExposure = totalUsersExposure + bets;
        totalUsersBalance = totalUsersBalance + balance;
        return true;
      });

    setUsersBalance(totalUsersBalance);
    setUsersExposure(totalUsersExposure);
  }, [usersList, adminsList]);

  const totalDues =
    userRole === "superadmin"
      ? 0
      : totalDeposits -
        (balance + totalWithdrawal - totalCommissions) -
        (adminsDues + usersDues);

  return (
    <div className="row m-0 mb-3 ">
      <div className=" col-12 col-md-6 p-0 bg-dull-white border-rounded">
        <div className=" p-3">
          <DetailsLabel>Total Balance</DetailsLabel>
          <DetailsValue>INR {usersBalance}</DetailsValue>
        </div>
        <div className="border" />
        <div className=" p-3">
          <DetailsLabel>Total Exposure</DetailsLabel>
          <DetailsValue>INR {usersExposure}</DetailsValue>
        </div>
        <div className="border" />
        <div className=" p-3">
          <DetailsLabel>Available Balance</DetailsLabel>
          <DetailsValue>INR {usersBalance}</DetailsValue>
        </div>
        <div className="border" />
        <div className=" p-3">
          <DetailsLabel>Balance</DetailsLabel>
          <DetailsValue>
            INR {userRole === "superadmin" ? usersBalance : balance}
          </DetailsValue>
        </div>
        <div className="border" />
        <div className=" p-3">
          <DetailsLabel>Total Avail. bal.</DetailsLabel>
          <DetailsValue>
            INR{" "}
            {userRole === "superadmin" ? usersBalance : usersBalance + balance}
          </DetailsValue>
        </div>
        <div className="border" />
        <div className=" p-3">
          <DetailsLabel>Total P/L</DetailsLabel>
          <DetailsValue codeRed={totalDues > 0 ? true : false}>
            INR {Math.abs(totalDues)}
          </DetailsValue>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  balance: state.auth.balance,
  usersList: state.auth.usersList,
  adminsList: state.auth.adminsList,
  totalDeposits: state.auth.totalDeposits,
  totalWithdrawal: state.auth.totalWithdrawal,
  totalCommissions: state.auth.totalCommissions,
  userRole: state.auth.userRole,
});

export default connect(mapStateToProps)(DetailsBar);
