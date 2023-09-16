import React, { useState, Fragment } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router";
import { connect } from "react-redux";
import HeaderCmpt from "../../components/header";
import NavbarCmpt from "../../components/navbar";
import StyledCmpt from "../../components/styledCmpt";
import { CurrentGames } from "../gameMgmt";
import { SettingsStyle } from "../../components/styledCmpt/SettingsStyle";
import { GamesList, GamesTitleList, Labels } from "../../config/constants";

const GameDetailsPage = ({ usersList = [] }) => {
  const [selectedItem, setItem] = useState(0);
  const [filterType, setFilterType] = useState("all");
  const [filterMode, setFilterMode] = useState("all");
  const [startDateValue, setStartDateValue] = useState("");
  const [endDateValue, setEndDateValue] = useState("");
  const currentUTCTime = new Date();
  const diff = currentUTCTime.getTimezoneOffset() * 60 * 1000;
  const { id } = useParams();
  const selectedUser = usersList[id - 1];

  const selectedGame =
    selectedUser.gamesList && selectedUser.gamesList.length > 0
      ? selectedUser.gamesList.filter(
          (game) => game.game === CurrentGames[selectedItem].name.toLowerCase()
        )
      : [];

  const filteredList =
    filterMode === "all"
      ? selectedGame
      : selectedGame.filter(
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
    <Fragment>
      <HeaderCmpt />
      <NavbarCmpt />
      <SettingsStyle.SettingsContainer className="row m-0">
        <div className="col-12 col-md-3 p-0">
          <SettingsStyle.SettingsHeader className="m-0">
            Games List
          </SettingsStyle.SettingsHeader>
          <SettingsStyle.SettingsLeftItems>
            {GamesList.length > 0 &&
              GamesList.map((item, idx) => (
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
          <SettingsStyle.Container>
            <SettingsStyle.Header className="m-0">
              Games History
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
                      {GamesTitleList.length > 0 &&
                        GamesTitleList.map((item, idx) => (
                          <StyledCmpt.TableStickyHead key={item + idx}>
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
                          <StyledCmpt.TableCell>
                            {item.sequenceNumber}
                          </StyledCmpt.TableCell>
                          <StyledCmpt.TableCell>
                            {item.betOption}
                          </StyledCmpt.TableCell>
                          <StyledCmpt.TableCell className="fs-md fw-400">
                            {new Date(item.dateAndTime)
                              .toUTCString()
                              .slice(5, 25)}
                          </StyledCmpt.TableCell>
                          <StyledCmpt.TableCell>
                            {item.isWon ? "WIN" : "LOSS"}
                          </StyledCmpt.TableCell>
                          <StyledCmpt.TableCell>
                            {item.betAmount}
                          </StyledCmpt.TableCell>
                        </StyledCmpt.TableRow>
                      ))
                    ) : (
                      <StyledCmpt.TableRow>
                        <StyledCmpt.TableCell colSpan={GamesTitleList.length}>
                          {Labels.NoData}
                        </StyledCmpt.TableCell>
                      </StyledCmpt.TableRow>
                    )}
                  </tbody>
                </StyledCmpt.TableStyled>
              </StyledCmpt.TableContainer>
            </SettingsStyle.FilterContainer>
          </SettingsStyle.Container>
        </div>
      </SettingsStyle.SettingsContainer>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  usersList: state.auth.usersList,
});

export default connect(mapStateToProps)(GameDetailsPage);
