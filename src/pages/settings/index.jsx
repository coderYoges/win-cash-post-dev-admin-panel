import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import HeaderCmpt from "../../components/header";
import NavbarCmpt from "../../components/navbar";
import { SettingList } from "../../config/constants";
import MyProfileCmpt from "./MyProfile";
import UpdateBank from "../../components/accountDetails/UpdateBank";
import ChangePassword from "../../components/accountDetails/ChangePassword";
import AccountStatement from "./AccountStatement";
import ActivityLog from "./ActivityLog";
import { WIN_CASH_URL } from "../../config/routeConfig";
import { postRequest } from "../../api";
import { setAdminUser } from "../../redux/auth";
import { toast } from "react-toastify";
import { SettingsStyle } from "../../components/styledCmpt/SettingsStyle";

const CmptWrapper = styled.div`
  opacity: ${(props) => (props.dullOpacity ? "0.3" : "1")};
  pointer-events: ${(props) => (props.dullOpacity ? "none" : "auto")};
  user-select: ${(props) => (props.dullOpacity ? "none" : "auto")};
`;

const SettingsPage = ({
  upiId,
  bankName,
  ifscCode,
  accountHolderName,
  accountNo,
  userName,
}) => {
  const [selectedItem, setItem] = useState(0);
  const [isPasswordOpen, setPassword] = useState(false);
  const [isBankOpen, setBank] = useState(false);

  const fetchAdminDetails = async () => {
    try {
      const resp = await postRequest(WIN_CASH_URL.GET_ADMIN_DETAILS, {
        userName: userName,
      });
      setAdminUser(resp.data);
    } catch (e) {
      toast.error(e.errorMessage, { autoClose: 2000 });
    }
  };

  const item = {
    upiId,
    bankName,
    ifscCode,
    accountHolderName,
    accountNo,
    userName,
  };
  const SubItemsList = [
    <MyProfileCmpt setBank={setBank} setPassword={setPassword} />,
    <AccountStatement />,
    <ActivityLog />,
  ];
  return (
    <Fragment>
      {isBankOpen && (
        <UpdateBank
          setBank={setBank}
          userId={item.userName}
          updateUsersList={fetchAdminDetails}
          item={item}
          bankChangeUrl={WIN_CASH_URL.UPDATE_ADMIN_BANK_DETAILS}
        />
      )}
      {isPasswordOpen && (
        <ChangePassword
          setPassword={setPassword}
          userId={item.userName}
          updateUsersList={fetchAdminDetails}
          passwordChangeUrl={WIN_CASH_URL.UPDATE_ADMIN_PASSWORD}
        />
      )}

      <CmptWrapper dullOpacity={isPasswordOpen || isBankOpen}>
        <HeaderCmpt />
        <NavbarCmpt />

        <SettingsStyle.SettingsContainer className="row m-0">
          <div className="col-12 col-md-3 p-0">
            <SettingsStyle.SettingsHeader className="m-0">My Account</SettingsStyle.SettingsHeader>
            <SettingsStyle.SettingsLeftItems>
              {SettingList.length > 0 &&
                SettingList.map((item, idx) => (
                  <SettingsStyle.SettingsLeftItem
                    key={item + idx}
                    onClick={() => setItem(idx)}
                    active={selectedItem === idx}
                  >
                    {item}
                  </SettingsStyle.SettingsLeftItem>
                ))}
            </SettingsStyle.SettingsLeftItems>
          </div>
          <div className="col-12 col-md-1 mt-4 p-0" />
          <div className="col-12 col-md-8 p-0">
            {SubItemsList[selectedItem]}
          </div>
        </SettingsStyle.SettingsContainer>
      </CmptWrapper>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  upiId: state.auth.upiId,
  bankName: state.auth.bankName,
  ifscCode: state.auth.ifscCode,
  accountHolderName: state.auth.accountHolderName,
  accountNo: state.auth.accountNo,
  userName: state.auth.userName,
});

export default connect(mapStateToProps)(SettingsPage);
