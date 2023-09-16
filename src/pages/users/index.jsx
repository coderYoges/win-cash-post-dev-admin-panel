import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import HeaderCmpt from "../../components/header";
import Navbar from "../../components/navbar";
import AccountsPage from "../../components/accounts";
import AddUser from "../../components/accounts/AddUser";
import { UsersStyle } from "../../components/styledCmpt/UsersStyle";
import { RouteConfig, WIN_CASH_URL } from "../../config/routeConfig";
import { postRequest } from "../../api";
import { setUsersList } from "../../redux/auth";

const UserTableColHeadings = [
  "Serial",
  "Mobile Number",
  "Available Balance",
  "Total Deposit",
  "Total Withdrawal",
  "Amount Win",
  "Amount Loss",
  "Commissions",
];

const UsersListPage = ({ userName, usersList, setUsersList}) => {
  const [isAddUser, setAddUser] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const onClickRefresh = async () => {
    setLoading(true);
    try {
      const usersResult = await postRequest(WIN_CASH_URL.GET_USERS, {
        tier1Parent: userName,
      });
      setUsersList(usersResult.data);
      toast.success("Updated Users list !!!", {
        autoClose: 1000,
      });
    } catch (e) {
      toast.error(e.errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Fragment>
      {isAddUser && <AddUser setAddUser={setAddUser} />}
      <UsersStyle.Wrapper dullOpacity={isAddUser}>
        <HeaderCmpt />
        <Navbar />
        <AccountsPage
          setAddUser={setAddUser}
          noOfItemsInOnePage={50}
          onClickRefresh={onClickRefresh}
          isLoading={isLoading}
          usersList={usersList}
          addBtnTitle={'Add User'}
          tableColHeadings={UserTableColHeadings}
          navigateToDetails={RouteConfig.userDetails}
          type="users"
        />
      </UsersStyle.Wrapper>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  userName: state.auth.userName,
  usersList: state.auth.usersList,
});

const mapDispatchToProps = {
  setUsersList: setUsersList,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersListPage);
