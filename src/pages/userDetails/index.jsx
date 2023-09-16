import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import HeaderCmpt from "../../components/header";
import AccountDetails from "../../components/accountDetails";
import { postRequest } from "../../api";
import { WIN_CASH_URL } from "../../config/routeConfig";
import { setUsersList } from "../../redux/auth";

const UserDetailsPage = ({ creatorName, setUsersList, usersList }) => {
  const [loading, setLoading] = useState(false);
  const updateList = async () => {
    setLoading(true);
    try {
      const usersResult = await postRequest(WIN_CASH_URL.GET_USERS, {
        tier1Parent: creatorName,
      });
      setUsersList(usersResult.data);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <Fragment>
      <HeaderCmpt />
      <AccountDetails
        updateList={updateList}
        loading={loading}
        usersList={usersList}
        pageTitle="User Details"
        type="users"
        passwordChangeUrl={WIN_CASH_URL.UPDATE_USER_PASSWORD}
        bankChangeUrl={WIN_CASH_URL.UPDATE_USER_BANK_DETAILS}
        blockUrl={WIN_CASH_URL.UPDATE_USER_STATUS}
        addMoneyUrl={WIN_CASH_URL.ADD_USER_BALANCE}
        debitMoneyUrl={WIN_CASH_URL.DEBIT_USER_BALANCE}
      />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  creatorName: state.auth.userName,
  usersList: state.auth.usersList,
});

const mapDispatchToProps = {
  setUsersList: setUsersList,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsPage);
