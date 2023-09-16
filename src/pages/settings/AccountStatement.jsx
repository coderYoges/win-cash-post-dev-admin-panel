import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { SettingsStyle } from "../../components/styledCmpt/SettingsStyle";
import StyledCmpt from "../../components/styledCmpt";
import { StatementList, Labels } from "../../config/constants";

const AccountStatement = ({ financialDetails }) => {
  const [filterType, setFilterType] = useState("all");
  const [filterMode, setFilterMode] = useState("all");
  const [startDateValue, setStartDateValue] = useState("");
  const [endDateValue, setEndDateValue] = useState("");

  const currentUTCTime = new Date();
  const diff = currentUTCTime.getTimezoneOffset() * 60 * 1000;

  const filteredList =
    filterMode === "all"
      ? financialDetails
      : financialDetails.filter(
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

  return (
    <SettingsStyle.Container>
      <SettingsStyle.Header className="m-0">
        Account Statement
      </SettingsStyle.Header>
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
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
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
            disabled={filterType === "all"}
            className="mt-4"
            onClick={generateData}
          >
            Generate Data
          </SettingsStyle.FilterButton>
        </div>
        <StyledCmpt.TableContainer>
          <ToastContainer />

          <StyledCmpt.TableStyled>
            <StyledCmpt.TableHead>
              <StyledCmpt.TableRow>
                {StatementList.length > 0 &&
                  StatementList.map((item, idx) => (
                    <StyledCmpt.TableStickyHead
                      key={item + idx}
                      colSpan={idx === StatementList.length - 1 ? "2" : "1"}
                    >
                      {item}
                    </StyledCmpt.TableStickyHead>
                  ))}
              </StyledCmpt.TableRow>
            </StyledCmpt.TableHead>
            <tbody>
              {filteredList.length > 0 ? (
                filteredList.map((item, idx) => (
                  <StyledCmpt.TableRow key={item + idx}>
                    <StyledCmpt.TableCell>{idx + 1}</StyledCmpt.TableCell>
                    <StyledCmpt.TableCell className="fs-md fw-400">
                      {new Date(item.dateAndTime).toUTCString().slice(5, 25)}
                    </StyledCmpt.TableCell>
                    <StyledCmpt.TableCell>
                      {item.isCredit ? item.amount : 0}
                    </StyledCmpt.TableCell>
                    <StyledCmpt.TableCell>
                      {item.isCredit ? 0 : item.amount}
                    </StyledCmpt.TableCell>
                    <StyledCmpt.TableCell className="fs-md fw-400">
                      {item.description}
                    </StyledCmpt.TableCell>
                  </StyledCmpt.TableRow>
                ))
              ) : (
                <StyledCmpt.TableRow>
                  <StyledCmpt.TableCell colSpan={StatementList.length}>
                    {Labels.NoData}
                  </StyledCmpt.TableCell>
                </StyledCmpt.TableRow>
              )}
            </tbody>
          </StyledCmpt.TableStyled>
        </StyledCmpt.TableContainer>
      </SettingsStyle.FilterContainer>
    </SettingsStyle.Container>
  );
};

const mapStateToProps = (state) => ({
  financialDetails: state.auth.financialDetails,
});

export default connect(mapStateToProps)(AccountStatement);
