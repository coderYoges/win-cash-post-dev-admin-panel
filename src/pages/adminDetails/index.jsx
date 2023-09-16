import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { isEmpty } from "lodash";
import HeaderCmpt from "../../components/header";
import AccountDetails from "../../components/accountDetails";
import { postRequest } from "../../api";
import { WIN_CASH_URL } from "../../config/routeConfig";
import { setAdminsList } from "../../redux/auth";

const AdminDetailsPage = ({ creatorName, setAdminsList, adminsList = [] }) => {
  const [loading, setLoading] = useState(false);
  const updateList = async () => {
    setLoading(true);
    try {
      const adminsResult = await postRequest(
        WIN_CASH_URL.GET_ADMINS_BY_PARENT_ID,
        {
          tier1Parent: creatorName,
        }
      );
      setAdminsList(adminsResult.data);
    } catch (e) {
      toast.error(e.errorMessage);
    } finally {
      setLoading(false);
    }
  };
  const usersList =
    !isEmpty(adminsList) &&
    adminsList.filter((item) => item.userRole === "admin");
  return (
    <Fragment>
      <HeaderCmpt />
      <AccountDetails
        updateList={updateList}
        loading={loading}
        usersList={usersList}
        pageTitle="Admin Details"
        type="admin"
        passwordChangeUrl={WIN_CASH_URL.UPDATE_ADMIN_PASSWORD}
        bankChangeUrl={WIN_CASH_URL.UPDATE_ADMIN_BANK_DETAILS}
        blockUrl={WIN_CASH_URL.UPDATE_ADMIN_STATUS}
        deleteUrl={WIN_CASH_URL.DELETE_ADMIN}
        addMoneyUrl={WIN_CASH_URL.ADD_ADMIN_BALANCE}
        debitMoneyUrl={WIN_CASH_URL.DEBIT_ADMIN_BALANCE}
      />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  creatorName: state.auth.userName,
  adminsList: state.auth.adminsList,
});

const mapDispatchToProps = {
  setAdminsList: setAdminsList,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminDetailsPage);
