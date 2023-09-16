import React, { Fragment } from "react";
import styled from "styled-components";
import HeaderCmpt from "../../components/header";
import NavbarCmpt from "../../components/navbar";

const DashboardContainer = styled.div`
  min-height: calc(100vh - 116px);
  background-color: #b8beca;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DashboardItem = styled.div`
  width: 100%;
  height: 60vh;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DashboardCircle = styled.div`
  border: 3px solid #000;
  border-radius: 50%;
  width: 80%;
  height: 80%;
`;

const StyledHeader = styled.div`
  background-color: #2e4b5e;
  padding: 10px;
  color: white;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  font-size: 20px;
  font-weight: 600;
`;

const DashboardPage = () => {
  return (
    <Fragment>
      <HeaderCmpt />
      <NavbarCmpt />
      <DashboardContainer className="row m-0">
        <div className=" col-12 col-md-6 mt-3">
          <StyledHeader className="text-center">
            Live Sports Profit
          </StyledHeader>
          <DashboardItem>
            <DashboardCircle />
          </DashboardItem>
        </div>
        <div className="col-12 col-md-6 mt-3">
          <StyledHeader className="text-center">
            Backup Sports Profit
          </StyledHeader>
          <DashboardItem>
            <DashboardCircle />
          </DashboardItem>
        </div>
      </DashboardContainer>
    </Fragment>
  );
};

export default DashboardPage;
