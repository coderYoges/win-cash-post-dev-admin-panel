import React from "react";
import { ThemeProvider } from "styled-components";
import { withRouter, Redirect, Switch, Route } from "react-router-dom";
import { theme } from "./styles/theme";
import LoginPage from "./pages/login";
import DashboardPage from "./pages/dashboard";
import UsersListPage from "./pages/users";
import UserDetailsPage from "./pages/userDetails";
import MasterListPage from "./pages/masters";
import MasterDetails from "./pages/masterDetails";
import SuperMasterListPage from "./pages/superMasters";
import SuperMasterDetails from "./pages/superMasterDetails";
import AdminListPage from "./pages/admins";
import AdminDetails from "./pages/adminDetails";
import CommissionsPage from "./pages/commissions";
import SettingsPage from "./pages/settings";
import GameMgmtPage from "./pages/gameMgmt";
import GameDetailsPage from './pages/gameDetails';
import { NotFoundPage } from "./components/NotFound";

import store from "./redux/store";
import { RouteConfig } from "./config/routeConfig";

const App = () => {
  const isAuthenticated = store.getState().auth.isAuthenticated;

  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route exact path={RouteConfig.initial}>
          <Redirect
            to={isAuthenticated ? RouteConfig.dashboard : RouteConfig.login}
          />
        </Route>
        <Route exact path={RouteConfig.login}>
          <LoginPage />
        </Route>
        <Route exact path={RouteConfig.dashboard}>
          {isAuthenticated ? <DashboardPage /> : <LoginPage />}
        </Route>
        <Route exact path={RouteConfig.users}>
          {isAuthenticated ? <UsersListPage /> : <LoginPage />}
        </Route>
        <Route exact path={RouteConfig.masters}>
          {isAuthenticated ? <MasterListPage /> : <LoginPage />}
        </Route>
        <Route exact path={RouteConfig.masterDetails}>
          {isAuthenticated ? <MasterDetails /> : <LoginPage />}
        </Route>
        <Route exact path={RouteConfig.superMasters}>
          {isAuthenticated ? <SuperMasterListPage /> : <LoginPage />}
        </Route>
        <Route exact path={RouteConfig.superMasterDetails}>
          {isAuthenticated ? <SuperMasterDetails /> : <LoginPage />}
        </Route>
        <Route exact path={RouteConfig.userDetails}>
          {isAuthenticated ? <UserDetailsPage /> : <LoginPage />}
        </Route>
        <Route exact path={RouteConfig.admins}>
          {isAuthenticated ? <AdminListPage /> : <LoginPage />}
        </Route>
        <Route exact path={RouteConfig.adminDetails}>
          {isAuthenticated ? <AdminDetails /> : <LoginPage />}
        </Route>
        <Route exact path={RouteConfig.commissions}>
          {isAuthenticated ? <CommissionsPage /> : <LoginPage />}
        </Route>
        <Route exact path={RouteConfig.settings}>
          {isAuthenticated ? <SettingsPage /> : <LoginPage />}
        </Route>
        <Route exact path={RouteConfig.gameMgmt}>
          {isAuthenticated ? <GameMgmtPage /> : <LoginPage />}
        </Route>
        <Route exact path={RouteConfig.gameDetails}>
          {isAuthenticated ? <GameDetailsPage /> : <LoginPage />}
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </ThemeProvider>
  );
};

export default withRouter(App);
