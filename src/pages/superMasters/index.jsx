import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { isEmpty } from "lodash";
import HeaderCmpt from "../../components/header";
import Navbar from "../../components/navbar";
import AccountsPage from "../../components/accounts";
import AddAdmin from "../../components/accounts/AddAdmin";
import { DuesConsent } from "../../components/accounts/DuesConsent";
import { UsersStyle } from "../../components/styledCmpt/UsersStyle";
import { RouteConfig, WIN_CASH_URL } from "../../config/routeConfig";
import { postRequest } from "../../api";
import { setAdminsList } from "../../redux/auth";

const MasterTableColHeadings = [
  "Serial",
  "Super Master Name",
  "Available Balance",
  "Total Withdrawal",
  "Total Users",
  "Commissions",
  "Total P/L",
];

const SuperMasterListPage = ({ userName, adminsList = [], setAdminsList }) => {
  const [isAddUser, setAddUser] = useState(false);
  const [isConsent, setConsent] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const getChildDetails = async (child) => {
    const childAdmins = await postRequest(
      WIN_CASH_URL.GET_ADMINS_BY_PARENT_ID,
      {
        tier1Parent: child.userName,
      }
    );
    const childUsers = await postRequest(WIN_CASH_URL.GET_USERS, {
      tier1Parent: child.userName,
    });
    return Promise.allSettled([childAdmins, childUsers]).then((result) => ({
      ...child,
      childAdmins: result[0] ? result[0]?.value?.data : [],
      childUsers: result[1] ? result[1]?.value?.data : [],
    }));
  };

  const onClickRefresh = async () => {
    setLoading(true);
    try {
      const adminsResult = await postRequest(
        WIN_CASH_URL.GET_ADMINS_BY_PARENT_ID,
        {
          tier1Parent: userName,
        }
      );
      const adminsList =
        adminsResult?.data?.length > 0 ? adminsResult.data : [];

      if (adminsList) {
        try {
          Promise.allSettled(
            adminsList.map(async (child) => {
              return await getChildDetails(child);
            })
          ).then((resp) => {
            const resultList = resp.map((item) => item?.value);
            setAdminsList(resultList);
          });
        } catch (e) {}
        setAdminsList([]);
      }
      toast.success("Updated Super Masters list !!!", {
        autoClose: 1000,
      });
    } catch (e) {
      toast.error(e.errorMessage);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    !isEmpty(adminsList) && onClickRefresh();
    // eslint-disable-next-line
  }, []);
  const usersList =
    !isEmpty(adminsList) && adminsList[0]
      ? adminsList.filter((item) => item.userRole === "supermaster")
      : [];
  return (
    <Fragment>
      {isAddUser && (
        <AddAdmin
          setAddUser={setAddUser}
          title="Add New Super Master"
          url={WIN_CASH_URL.CREATE_ADMIN}
          newRole="supermaster"
          successMsg="Super Master Created Successful"
        />
      )}
      {isConsent && <DuesConsent setConsent={setConsent} />}
      <UsersStyle.Wrapper dullOpacity={isAddUser || isConsent}>
        <HeaderCmpt />
        <Navbar />
        <AccountsPage
          setAddUser={setAddUser}
          setConsent={setConsent}
          noOfItemsInOnePage={50}
          onClickRefresh={onClickRefresh}
          isLoading={isLoading}
          usersList={usersList}
          addBtnTitle={"Add Super Master"}
          tableColHeadings={MasterTableColHeadings}
          navigateToDetails={RouteConfig.superMasterDetails}
          type="supermasters"
        />
      </UsersStyle.Wrapper>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  userName: state.auth.userName,
  adminsList: state.auth.adminsList,
});

const mapDispatchToProps = {
  setAdminsList: setAdminsList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuperMasterListPage);
