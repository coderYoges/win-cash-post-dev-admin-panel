import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

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

const DetailsBar = ({ balance, plBalance = 0, userRole, usersList = [] }) => {
  const [usersExposure, setUsersExposure] = useState(0);
  const [usersBalance, setUsersBalance] = useState(0);

  useEffect(() => {
    setUsersBalance(0);
    setUsersExposure(0);

    let totalUsersExposure = 0;
    let totalUsersBalance = 0;

    usersList.length > 0 &&
      usersList.map(({ bets = 0, balance = 0 }) => {
        totalUsersExposure = totalUsersExposure + bets;
        totalUsersBalance = totalUsersBalance + balance;
        return true;
      });

    setUsersBalance(totalUsersBalance);
    setUsersExposure(totalUsersExposure);
  }, [usersList]);

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
        {userRole !== "superadmin" && (
          <React.Fragment>
            <div className="border" />
            <div className=" p-3">
              <DetailsLabel>Total P/L</DetailsLabel>
              <DetailsValue codeRed={plBalance < 0 ? true : false}>
                INR {Math.abs(plBalance)}
              </DetailsValue>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  balance: state.auth.balance,
  plBalance: state.auth.plBalance,
  usersList: state.auth.usersList,
  userRole: state.auth.userRole,
});

export default connect(mapStateToProps)(DetailsBar);
