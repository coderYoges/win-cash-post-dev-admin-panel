import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Labels } from "../../config/constants";
import { MdRefresh } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { postRequest } from "../../api";
import { WIN_CASH_URL } from "../../config/routeConfig";
import { setAdminUser, resetAuth } from "../../redux/auth";
import { useHistory } from "react-router";
import { RouteConfig } from "../../config/routeConfig";
import { resetGame } from "../../redux/game";

const HeaderContainer = styled.div`
  background: ${(props) => props.theme.colors.headerBg};
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 76px;
  @media (max-width: 576px) {
    justify-content: flex-end;
  }
`;

const HeaderTitle = styled.span`
  color: white;
  font-weight: bolder;
  font-size: 24px;
  @media (max-width: 576px) {
    display: none;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;

const UserRole = styled.span`
  background-color: #000;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
`;

const ButtonStyled = styled.button`
  background-color: #09437f;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  cursor: pointer;
  color: white;
`;

const HeaderCmpt = ({
  userRole,
  userName,
  balance,
  setAdminUser,
  resetAuth,
  resetGame
}) => {
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();
  const fetchAdminDetails = async () => {
    setLoading(true);
    try {
      const resp = await postRequest(WIN_CASH_URL.GET_ADMIN_DETAILS, {
        userName: userName,
      });
      toast.success("Admin Details fetched successfully", { autoClose: 2000 });
      setAdminUser(resp.data);
    } catch (e) {
      toast.error(e.errorMessage, { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  const onReset = async () => {
    await resetAuth();
    await resetGame();
    history.push(RouteConfig.login);
  };

  return (
    <Fragment>
      <HeaderContainer>
        <HeaderTitle>{Labels.AuraAdmin}</HeaderTitle>
        <HeaderRight>
          <UserRole className="fs-def fw-600">{userRole}</UserRole>
          <span className="fs-md fw-600 ft-white">{userName}</span>
          <span className="fs-md fw-600 ft-white mx-2">
            INR {userRole === "superadmin" ? "0" : balance}
          </span>
          <ButtonStyled disabled={isLoading}>
            <MdRefresh onClick={fetchAdminDetails} />
          </ButtonStyled>
          <ButtonStyled>
            <FaSignOutAlt onClick={onReset} />
          </ButtonStyled>
        </HeaderRight>
      </HeaderContainer>
      <ToastContainer limit={1} />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  userRole: state.auth.userRole,
  userName: state.auth.userName,
  balance: state.auth.balance,
});

const mapDispatchToProps = {
  setAdminUser: setAdminUser,
  resetAuth: resetAuth,
  resetGame: resetGame
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderCmpt);
