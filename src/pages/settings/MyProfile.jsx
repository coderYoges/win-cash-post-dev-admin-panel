import React from "react";
import { connect } from "react-redux";
import { SettingsStyle } from "../../components/styledCmpt/SettingsStyle";

const MyProfileCmpt = ({
  setBank,
  setPassword,
  userName,
  totalCommissions,
  currency,
  mobileNumber,
}) => {
  return (
    <SettingsStyle.Container>
      <SettingsStyle.Header>Account Details</SettingsStyle.Header>
      <SettingsStyle.ItemsWrapper>
        <SettingsStyle.Item>
          <SettingsStyle.Label>Name</SettingsStyle.Label>
          <SettingsStyle.Point>{userName || "UnKnown"}</SettingsStyle.Point>
        </SettingsStyle.Item>
        <SettingsStyle.Item>
          <SettingsStyle.Label>Commission</SettingsStyle.Label>
          <SettingsStyle.Point>{totalCommissions || 0}</SettingsStyle.Point>
        </SettingsStyle.Item>
        <SettingsStyle.Item>
          <SettingsStyle.Label>Currency</SettingsStyle.Label>
          <SettingsStyle.Point>{currency || "INR"}</SettingsStyle.Point>
        </SettingsStyle.Item>
        <SettingsStyle.Item>
          <SettingsStyle.Label>Mobile Number</SettingsStyle.Label>
          <SettingsStyle.Point>{mobileNumber || "-"}</SettingsStyle.Point>
        </SettingsStyle.Item>
        <div className="row m-0">
          <div className="col-6 p-0 mt-2 px-2" onClick={() => setBank(true)}>
            <SettingsStyle.Btn className="bg-blue">Update Bank Details</SettingsStyle.Btn>
          </div>
          <div
            className="col-6 p-0 mt-2 px-2"
            onClick={() => setPassword(true)}
          >
            <SettingsStyle.Btn className="bg-green">Change Password</SettingsStyle.Btn>
          </div>
        </div>
      </SettingsStyle.ItemsWrapper>
    </SettingsStyle.Container>
  );
};

const mapStateToProps = (state) => ({
  userName: state.auth.userName,
  totalCommissions: state.auth.totalCommissions,
  currency: "INR",
  mobileNumber: state.auth.mobileNumber,
});

export default connect(mapStateToProps)(MyProfileCmpt);
