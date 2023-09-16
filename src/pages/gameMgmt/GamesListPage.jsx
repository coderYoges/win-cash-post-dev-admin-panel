import React, { Fragment, useState } from "react";
import { get } from "lodash";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { AiFillSetting } from "react-icons/ai";
import StyledCmpt from "../../components/styledCmpt";
import { SettingsStyle } from "../../components/styledCmpt/SettingsStyle";
import { Labels } from "../../config/constants";
import { GAME_MGMT_TABLE_TITLES } from "../../config/constants";
import { UsersStyle } from "../../components/styledCmpt/UsersStyle";

const noOfItemsInOnePage = 50;

export const GamesListPage = ({
  item,
  setGameModal,
  setSelectedGame,
  gameControls,
  gameRecords,
  setDetailsModal,
  onClickSettings,
}) => {
  const [page, setPage] = useState(1);

  let totalRecords = gameRecords.length;
  let totalPages = Math.ceil(totalRecords / noOfItemsInOnePage);

  let pageStartingUser = (page - 1) * noOfItemsInOnePage + 1;
  let pageEndingUser =
    page * noOfItemsInOnePage < totalRecords
      ? page * noOfItemsInOnePage
      : totalRecords;

  const recordsToShow = Array.apply(null, {
    length: pageEndingUser + 1 - pageStartingUser,
  }).map((_, idx) => idx + pageStartingUser);

  const onClickRow = (item) => {
    setSelectedGame(item);
    setGameModal(true);
  };

  const onClickIcon = (item) => {
    setSelectedGame(item);
    setDetailsModal(true);
  };

  return (
    <Fragment>
      <SettingsStyle.Container>
        <SettingsStyle.Header className="d-flex justify-content-between align-items-center">
          <span>{item.title}</span>
          <AiFillSetting
            className="cursor-pointer mx-3"
            onClick={onClickSettings}
          />
        </SettingsStyle.Header>
        <SettingsStyle.FilterContainer>
          <StyledCmpt.TableContainer>
            <StyledCmpt.TableStyled>
              <StyledCmpt.TableHead>
                <StyledCmpt.TableRow>
                  {GAME_MGMT_TABLE_TITLES.map((item, idx) => (
                    <StyledCmpt.TableStickyHead key={item + idx}>
                      {item}
                    </StyledCmpt.TableStickyHead>
                  ))}
                </StyledCmpt.TableRow>
              </StyledCmpt.TableHead>
              <tbody>
                {gameRecords.length > 0 ? (
                  gameRecords.map((item, idx) => {
                    if (recordsToShow.includes(idx + 1)) {
                      const totalAmount =
                        get(item, gameControls.totalRed, 0) +
                        get(item, gameControls.totalBlue, 0) +
                        get(item, gameControls.totalTie, 0);
                      const priceGiven =
                        item.winnerOption === gameControls.red
                          ? get(item, gameControls.totalRed, 0) * 2
                          : item.winnerOption === gameControls.blue
                          ? get(item, gameControls.totalBlue, 0) * 2
                          : item.winnerOption === gameControls.tie
                          ? get(item, gameControls.totalTie, 0) * 9
                          : 0;
                      return (
                        <StyledCmpt.TableRow key={item + idx}>
                          <StyledCmpt.TableCell
                            onClick={() => onClickIcon(item)}
                          >
                            {item.sequenceNumber}
                            <BsFillInfoCircleFill className="mx-2" />
                          </StyledCmpt.TableCell>
                          <StyledCmpt.TableCell
                            onClick={() => onClickRow(item)}
                          >
                            {totalAmount}
                          </StyledCmpt.TableCell>
                          <StyledCmpt.TableCell
                            onClick={() => onClickRow(item)}
                          >
                            {item.winnerOption ? priceGiven : "Pending..."}
                          </StyledCmpt.TableCell>
                          <StyledCmpt.TableCell
                            onClick={() => onClickRow(item)}
                          >
                            {item.players ? item.players.length : 0}
                          </StyledCmpt.TableCell>
                          <StyledCmpt.TableCell
                            onClick={() => onClickRow(item)}
                          >
                            {item.winnerOption}
                          </StyledCmpt.TableCell>
                        </StyledCmpt.TableRow>
                      );
                    } else {
                      return <Fragment key={item + idx} />;
                    }
                  })
                ) : (
                  <StyledCmpt.TableRow>
                    <StyledCmpt.TableCell
                      colSpan={GAME_MGMT_TABLE_TITLES.length}
                    >
                      {Labels.NoData}
                    </StyledCmpt.TableCell>
                  </StyledCmpt.TableRow>
                )}
              </tbody>
            </StyledCmpt.TableStyled>
          </StyledCmpt.TableContainer>
          <UsersStyle.TablePagination className="w-100 mt-0">
            <span>
              {`Showing ${pageStartingUser} to ${pageEndingUser} of ${totalRecords} entries`}
            </span>

            <UsersStyle.TablePaginationRight>
              <UsersStyle.TablePaginationLabels
                active={page === 1}
                onClick={() => setPage(1)}
              >
                {Labels.First}
              </UsersStyle.TablePaginationLabels>
              <UsersStyle.TablePaginationLabels
                active={page === 1}
                onClick={() => (page >= 2 ? setPage(page - 1) : setPage(page))}
              >
                {Labels.Previous}
              </UsersStyle.TablePaginationLabels>
              <UsersStyle.TablePaginationLabels
                active={page === totalPages}
                onClick={() =>
                  page < totalPages ? setPage(page + 1) : setPage(page)
                }
              >
                {Labels.Next}
              </UsersStyle.TablePaginationLabels>
              <UsersStyle.TablePaginationLabels
                active={page === totalPages}
                onClick={() => setPage(totalPages)}
              >
                {Labels.Last}
              </UsersStyle.TablePaginationLabels>
            </UsersStyle.TablePaginationRight>
          </UsersStyle.TablePagination>
        </SettingsStyle.FilterContainer>
      </SettingsStyle.Container>
    </Fragment>
  );
};
