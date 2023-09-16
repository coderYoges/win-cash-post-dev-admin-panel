import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import HeaderCmpt from "../../components/header";
import Navbar from "../../components/navbar";
import { ToastContainer, toast } from "react-toastify";
import {
  CommissionList,
  Labels,
  COMMISSIONS_LABEL,
} from "../../config/constants";
import { UsersStyle } from "../../components/styledCmpt/UsersStyle";
import { SettingsStyle } from "../../components/styledCmpt/SettingsStyle";
import UpdateCommissions from "./UpdateCommissions";
import { WIN_CASH_URL } from "../../config/routeConfig";
import { getRequest } from "../../api";
import { setRates } from "../../redux/rates";

const CommissionsContainer = styled.div`
  background-color: #b8beca;
  padding: 20px;
  min-height: calc(100vh - 112px);
  width: 100%;
  overflow-x: hidden;
  opacity: ${(props) => (props.dullOpacity ? "0.3" : "1")};
`;

const CommissionsTableContainer = styled.div`
  padding: 0 10px;
  border-radius: 5px;
`;

const CommissionsPage = ({
  totalCommissions = 0,
  totalUsers = 0,
  commissionDetails = [],
  setRates,
}) => {
  const [filterType, setFilterType] = useState("all");
  const [filterMode, setFilterMode] = useState("all");
  const [startDateValue, setStartDateValue] = useState("");
  const [endDateValue, setEndDateValue] = useState("");
  const [commissionModal, setCommissionModal] = useState(false);
  const [ratesBtnDisabled, setRatesBtnDisabled] = useState(false);

  const currentUTCTime = new Date();
  const diff = currentUTCTime.getTimezoneOffset() * 60 * 1000;

  const filteredList =
    filterMode === "all"
      ? commissionDetails
      : commissionDetails.filter(
          (item) =>
            new Date(item.dateAndTime).valueOf() + diff >=
              new Date(startDateValue).valueOf() &&
            new Date(item.dateAndTime).valueOf() + diff <=
              new Date(endDateValue).valueOf()
        );

  const onChangeStartDate = (e) => {
    setStartDateValue(e.target.value);
  };
  const onChangeEndDate = (e) => {
    if (!startDateValue) {
      return toast.error("Select From date", { autoClose: 2000 });
    } else if (
      new Date(e.target.value).valueOf() - new Date(startDateValue).valueOf() <
      0
    ) {
      return toast.error("To Date should be less than From Date", {
        autoClose: 2000,
      });
    } else {
      setEndDateValue(e.target.value);
    }
  };

  const onClickAll = () => {
    setStartDateValue("");
    setEndDateValue("");
    setFilterType("all");
    setFilterMode("all");
  };

  const generateData = () => {
    if (!startDateValue || !endDateValue) {
      return toast.error("Both From & To date required", {
        autoClose: 2000,
      });
    } else {
      setFilterMode("customDate");
    }
  };

  const fetchCommissionRates = async () => {
    const response = await getRequest(WIN_CASH_URL.GET_COMMISSION_RATES);
    setRates(response.data);
  };

  const onClickCommissionModal = () => {
    setRatesBtnDisabled(true);
    fetchCommissionRates()
      .then(() => setCommissionModal(true))
      .catch(() => {})
      .finally(() => setRatesBtnDisabled(false));
  };

  return (
    <Fragment>
      <ToastContainer limit={1} />
      {commissionModal && (
        <UpdateCommissions
          setCommissionModal={setCommissionModal}
          fetchCommissionRates={fetchCommissionRates}
        />
      )}

      <HeaderCmpt />
      <Navbar />
      <CommissionsContainer dullOpacity={commissionModal}>
        <CommissionsTableContainer className="row m-0 my-2">
          <div className="col-12 p-0 col-sm-6 my-3">
            <div className="fs-xl fw-600 p-0 text-secondary">
              {COMMISSIONS_LABEL.TOTAL_COMMISSION}
            </div>
            <div className="text-danger fs-lg fw-500 mt-1 mx-1">
              {totalCommissions}
            </div>
          </div>
          <div className="col-12 p-0 col-sm-6 my-3 ">
            <div className="fs-xl fw-600 p-0 text-secondary text-right">
              {COMMISSIONS_LABEL.TOTAL_USERS}
            </div>
            <div className="text-danger fs-lg fw-500 mt-1 mx-1 text-right">
              {Array.from(new Set(totalUsers)).length}
            </div>
          </div>
        </CommissionsTableContainer>

        <SettingsStyle.FilterContainer>
          <SettingsStyle.FilterItem>
            <label htmlFor="viewBy" className="ft-black">
              View By:
            </label>

            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {filterType === "all" ? "All" : "Custom Date"}
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <div className="dropdown-item" onClick={onClickAll}>
                  All
                </div>
                <div
                  className="dropdown-item"
                  onClick={() => setFilterType("customDate")}
                >
                  Custom Date
                </div>
              </div>
            </div>
          </SettingsStyle.FilterItem>
          {filterType === "customDate" && (
            <Fragment>
              <SettingsStyle.FilterItem>
                <label htmlFor="startDate" className="ft-black">
                  From
                </label>
                <SettingsStyle.FilterSubItem>
                  <SettingsStyle.FilterInput
                    type="date"
                    id="startDate"
                    value={startDateValue}
                    onChange={onChangeStartDate}
                  />
                </SettingsStyle.FilterSubItem>
              </SettingsStyle.FilterItem>
              <SettingsStyle.FilterItem>
                <label htmlFor="endDate" className="ft-black">
                  To
                </label>
                <SettingsStyle.FilterSubItem>
                  <SettingsStyle.FilterInput
                    type="date"
                    id="endDate"
                    value={endDateValue}
                    onChange={onChangeEndDate}
                  />
                </SettingsStyle.FilterSubItem>
              </SettingsStyle.FilterItem>
            </Fragment>
          )}

          <div className="d-flex ml-auto flex-column">
            <SettingsStyle.FilterButton
              className="mt-1"
              onClick={onClickCommissionModal}
              disabled={ratesBtnDisabled}
            >
              Set Commissions
            </SettingsStyle.FilterButton>
            <SettingsStyle.FilterButton
              disabled={filterType === "all"}
              className="mt-4"
              onClick={generateData}
            >
              Generate Data
            </SettingsStyle.FilterButton>
          </div>
        </SettingsStyle.FilterContainer>
        <UsersStyle.TableContainer>
          <UsersStyle.StyledTable>
            <UsersStyle.TableHead>
              <UsersStyle.TableRow>
                {CommissionList.length > 0 &&
                  CommissionList.map((item, idx) => (
                    <UsersStyle.TableStickyHead key={item + idx}>
                      {item}
                    </UsersStyle.TableStickyHead>
                  ))}
              </UsersStyle.TableRow>
            </UsersStyle.TableHead>
            <tbody>
              {filteredList.length > 0 ? (
                filteredList.map((item, idx) => (
                  <UsersStyle.TableRow key={item + idx}>
                    <UsersStyle.TableCell>{idx + 1}</UsersStyle.TableCell>
                    <UsersStyle.TableCell>
                      {new Date(item.dateAndTime).toUTCString().slice(0, 16)}
                    </UsersStyle.TableCell>
                    <UsersStyle.TableCell>
                      {item.userName.replace(/.(?=.{4})/g, "x")}
                    </UsersStyle.TableCell>
                    <UsersStyle.TableCell>
                      {Number(item.amount)}
                    </UsersStyle.TableCell>
                  </UsersStyle.TableRow>
                ))
              ) : (
                <UsersStyle.TableRow>
                  <UsersStyle.TableCell colSpan={4}>
                    {Labels.NoData}
                  </UsersStyle.TableCell>
                </UsersStyle.TableRow>
              )}
            </tbody>
          </UsersStyle.StyledTable>
        </UsersStyle.TableContainer>
      </CommissionsContainer>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  totalCommissions: state.auth.totalCommissions,
  totalUsers: state.auth.totalUsers,
  commissionDetails: state.auth.commissionDetails,
});

const mapDispatchToProps = {
  setRates: setRates,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommissionsPage);
