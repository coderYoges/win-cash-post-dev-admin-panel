import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { ActivityList, Labels } from "../../config/constants";
import { SettingsStyle } from "../../components/styledCmpt/SettingsStyle";
import StyledCmpt from "../../components/styledCmpt";
import { UsersStyle } from "../../components/styledCmpt/UsersStyle";

const noOfItemsInOnePage = 50;

const ActivityLog = ({ lastLogins }) => {
  const [page, setPage] = useState(1);

  let totalRecords = lastLogins.length;
  let totalPages = Math.ceil(totalRecords / noOfItemsInOnePage);

  let pageStartingUser = (page - 1) * noOfItemsInOnePage + 1;
  let pageEndingUser =
    page * noOfItemsInOnePage < totalRecords
      ? page * noOfItemsInOnePage
      : totalRecords;

  const recordsToShow = Array.apply(null, {
    length: pageEndingUser + 1 - pageStartingUser,
  }).map((_, idx) => idx + pageStartingUser);

  return (
    <SettingsStyle.Container>
      <SettingsStyle.Header className="m-0">Activity Log</SettingsStyle.Header>
      <SettingsStyle.FilterContainer>
        <StyledCmpt.TableContainer>
          <StyledCmpt.TableStyled>
            <StyledCmpt.TableHead>
              <StyledCmpt.TableRow>
                {ActivityList.length > 0 &&
                  ActivityList.map((item, idx) => (
                    <StyledCmpt.TableStickyHead key={item + idx}>
                      {item}
                    </StyledCmpt.TableStickyHead>
                  ))}
              </StyledCmpt.TableRow>
            </StyledCmpt.TableHead>
            <tbody>
              {lastLogins.length > 0 ? (
                lastLogins.map((item, idx) =>
                  recordsToShow.includes(idx + 1) ? (
                    <StyledCmpt.TableRow key={item + idx}>
                      <StyledCmpt.TableCell>{idx + 1}</StyledCmpt.TableCell>
                      <StyledCmpt.TableCell>
                        {new Date(item.loginTime).toUTCString().slice(5, 25)}
                      </StyledCmpt.TableCell>
                      <StyledCmpt.TableCell>
                        {item.userBrowser}
                      </StyledCmpt.TableCell>
                      <StyledCmpt.TableCell>
                        {item.userPlatform}
                      </StyledCmpt.TableCell>
                    </StyledCmpt.TableRow>
                  ) : (
                    <Fragment key={item + idx} />
                  )
                )
              ) : (
                <StyledCmpt.TableRow>
                  <StyledCmpt.TableCell colSpan={ActivityList.length}>
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
  );
};

const mapStateToProps = (state) => ({
  lastLogins: state.auth.lastLogins,
});

export default connect(mapStateToProps)(ActivityLog);
