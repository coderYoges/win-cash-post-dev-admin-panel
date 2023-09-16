import React, { Fragment } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { get } from "lodash";
import { useHistory } from "react-router";
import { RouteConfig } from "../../config/routeConfig";

const NavbarContainer = styled.div`
  background: ${(props) => props.theme.colors.navbarBg};
  min-height: 36px;
  width: 100vw;
  display: flex;
  overflow-x: auto;
`;

const NavbarItem = styled.div`
  background: ${(props) =>
    props.active ? "#000" : props.theme.colors.navbarBg};
  height: 36px;
  color: ${(props) => (props.active ? "#fff" : "#000")};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding-top: 8px;
  min-width: 14 0px;
  width: 140px;
  text-align: center;
`;

const NavbarGap = styled.div`
  border-left: 2px solid #fff;
`;

const NavbarCmpt = ({ userRole }) => {
  const history = useHistory();
  const currentTab = get(history, "location.pathname", "/dashboard");
  return (
    <NavbarContainer>
      <NavbarItem
        onClick={() => history.push(RouteConfig.dashboard)}
        active={currentTab === RouteConfig.dashboard}
      >
        Dashboard
      </NavbarItem>
      <NavbarGap />
      {userRole === "superadmin" && (
        <Fragment>
          <NavbarItem
            onClick={() => history.push(RouteConfig.gameMgmt)}
            active={currentTab === RouteConfig.gameMgmt}
          >
            Games
          </NavbarItem>
          <NavbarGap />
          <NavbarItem
            onClick={() => history.push(RouteConfig.admins)}
            active={currentTab === RouteConfig.admins}
          >
            Admins
          </NavbarItem>
          <NavbarGap />
        </Fragment>
      )}
      {userRole === "admin" && (
        <Fragment>
          <NavbarItem
            onClick={() => history.push(RouteConfig.superMasters)}
            active={currentTab === RouteConfig.superMasters}
          >
            SuperMasters
          </NavbarItem>
          <NavbarGap />
        </Fragment>
      )}
      {(userRole === "supermaster" || userRole === "admin") && (
        <Fragment>
          <NavbarItem
            onClick={() => history.push(RouteConfig.masters)}
            active={currentTab === RouteConfig.masters}
          >
            Masters
          </NavbarItem>
          <NavbarGap />
        </Fragment>
      )}

      <NavbarItem
        onClick={() => history.push(RouteConfig.users)}
        active={
          currentTab === RouteConfig.users ||
          currentTab === RouteConfig.gameDetails
        }
      >
        Users
      </NavbarItem>
      <NavbarGap />
      <NavbarItem
        onClick={() => history.push(RouteConfig.commissions)}
        active={currentTab === RouteConfig.commissions}
      >
        Commissions
      </NavbarItem>
      <NavbarGap />
      <NavbarItem
        onClick={() => history.push(RouteConfig.settings)}
        active={currentTab === RouteConfig.settings}
      >
        Settings
      </NavbarItem>
      <NavbarGap />
    </NavbarContainer>
  );
};

const mapStateToProps = (state) => ({
  userRole: state.auth.userRole,
});

export default connect(mapStateToProps)(NavbarCmpt);
