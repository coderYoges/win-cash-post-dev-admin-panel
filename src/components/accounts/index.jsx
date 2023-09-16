import React, { Fragment, useState } from "react";
import { ImUsers } from "react-icons/im";
import { MdRefresh } from "react-icons/md";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import { useHistory, generatePath } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { DotLoader } from "react-spinner-overlay";
import { Labels } from "../../config/constants";
import { UsersStyle } from "../styledCmpt/UsersStyle";
import StyledCmpt from "../styledCmpt";
import DetailsBar from "./DetailsBar";
import { postRequest } from "../../api";
import { WIN_CASH_URL } from "../../config/routeConfig";

const RenderUsersListCells = ({ onClickRow, item, idx }) => {
  const [showMobile, setShowMobile] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const {
    userName = "",
    balance = 0,
    totalDeposits = 0,
    totalWithdrawal = 0,
    amountWin = 0,
    winnings = 0,
    amountLoss = 0,
    losses = 0,
    mainParentCommission = 0,
  } = item;
  return (
    <UsersStyle.TableRow onClick={onClickRow}>
      <UsersStyle.TableCell>{idx + 1}</UsersStyle.TableCell>
      <UsersStyle.TableCell
        onClick={(e) => {
          setSelectedUser(userName);
          setShowMobile(!showMobile);
          e.stopPropagation();
        }}
      >
        {showMobile && selectedUser === userName
          ? userName
          : userName.replace(/.(?=.{4})/g, "x")}
        {"    "}
        {showMobile && selectedUser === item.userName ? (
          <BiSolidHide size={20} />
        ) : (
          <BiSolidShow size={20} />
        )}
      </UsersStyle.TableCell>
      <UsersStyle.TableCell>{balance}</UsersStyle.TableCell>
      <UsersStyle.TableCell>{totalDeposits}</UsersStyle.TableCell>
      <UsersStyle.TableCell>{totalWithdrawal}</UsersStyle.TableCell>
      <UsersStyle.TableCell>{amountWin || winnings}</UsersStyle.TableCell>
      <UsersStyle.TableCell>{amountLoss || losses}</UsersStyle.TableCell>
      <UsersStyle.TableCell>{mainParentCommission}</UsersStyle.TableCell>
    </UsersStyle.TableRow>
  );
};

const RenderAdminsListCells = ({ onClickRow, item, idx }) => {
  const [hideClear, setHideClear] = useState(false);
  const {
    userName = "",
    balance = 0,
    totalWithdrawal = 0,
    totalUsers = [],
    totalCommissions = 0,
    clearedDues = false,
    totalDeposits = 0,
  } = item;

  const childAdminsBalList = item.childAdmins
    ? item?.childAdmins?.map(
        ({ balance = 0, totalWithdrawal = 0, totalCommissions = 0 }) => {
          return balance + totalWithdrawal - totalCommissions;
        }
      )
    : [];
  const childAdminsBal = childAdminsBalList.reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue;
    },
    0
  );
  const childUsersBalList = item.childUsers
    ? item?.childUsers?.map(({ balance = 0, totalWithdrawal = 0 }) => {
        return balance + totalWithdrawal;
      })
    : [];
  const childUsersBal = childUsersBalList.reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue;
    },
    0
  );

  const totalDues =
    totalDeposits -
    (balance + totalWithdrawal - totalCommissions) -
    (childAdminsBal + childUsersBal);

  const onClickConsent = async () => {
    setHideClear(true);
    if (!clearedDues) {
      try {
        if (totalDues > 0 && totalDues < -1) {
          await postRequest(WIN_CASH_URL.UPDATE_DUES, { userName: userName });
        } else {
          toast.error("You are unable to clear dues", { autoClose: 2000 });
        }
      } catch {
      } finally {
        setHideClear(false);
      }
    }
  };

  return (
    <UsersStyle.TableRow>
      <UsersStyle.TableCell onClick={onClickRow}>
        {idx + 1}
      </UsersStyle.TableCell>
      <UsersStyle.TableCell onClick={onClickRow}>
        {userName}
      </UsersStyle.TableCell>
      <UsersStyle.TableCell onClick={onClickRow}>
        {balance}
      </UsersStyle.TableCell>
      <UsersStyle.TableCell onClick={onClickRow}>
        {totalWithdrawal}
      </UsersStyle.TableCell>
      <UsersStyle.TableCell onClick={onClickRow}>
        {Array.from(new Set(totalUsers)).length}
      </UsersStyle.TableCell>
      <UsersStyle.TableCell onClick={onClickRow}>
        {totalCommissions}
      </UsersStyle.TableCell>
      <UsersStyle.TableCell
        onClick={onClickConsent}
        className={totalDues ? "text-danger" : ""}
      >
        {clearedDues ? 0 : totalDues}
        {!hideClear && <StyledCmpt.ClearDuesBtn />}
      </UsersStyle.TableCell>
    </UsersStyle.TableRow>
  );
};

const AccountsPage = ({
  setAddUser,
  setConsent,
  usersList,
  noOfItemsInOnePage,
  onClickRefresh,
  isLoading,
  addBtnTitle,
  tableColHeadings,
  navigateToDetails,
  type = "users",
}) => {
  const [page, setPage] = useState(1);

  let totalUsers = usersList.length;
  let totalPages = Math.ceil(totalUsers / noOfItemsInOnePage);

  let pageStartingUser = (page - 1) * noOfItemsInOnePage + 1;
  let pageEndingUser =
    page * noOfItemsInOnePage < totalUsers
      ? page * noOfItemsInOnePage
      : totalUsers;

  const usersToStow = Array.apply(null, {
    length: pageEndingUser + 1 - pageStartingUser,
  }).map((_, idx) => idx + pageStartingUser);

  const onClickConsent = () => setConsent(true);

  const history = useHistory();
  return (
    <div>
      <UsersStyle.Container>
        <ToastContainer limit={1} />

        <UsersStyle.TopRight>
          <UsersStyle.AddUserBtn
            onClick={() => setAddUser(true)}
            disabled={isLoading}
          >
            <ImUsers />
            <span>{addBtnTitle}</span>
          </UsersStyle.AddUserBtn>
          <UsersStyle.RefreshBtn onClick={onClickRefresh} disabled={isLoading}>
            <MdRefresh />
          </UsersStyle.RefreshBtn>
        </UsersStyle.TopRight>

        {type === "users" && <DetailsBar />}

        {isLoading ? (
          <StyledCmpt.ModalBtnGrp className="d-flex justify-content-center">
            <DotLoader between={"8px"} color="#000" />
          </StyledCmpt.ModalBtnGrp>
        ) : (
          <Fragment>
            <UsersStyle.TableContainer>
              <UsersStyle.StyledTable>
                <UsersStyle.TableHead>
                  <UsersStyle.TableRow>
                    {tableColHeadings.length > 0 &&
                      tableColHeadings.map((item, idx) => (
                        <UsersStyle.TableStickyHead key={item + type + idx}>
                          {item}
                        </UsersStyle.TableStickyHead>
                      ))}
                  </UsersStyle.TableRow>
                </UsersStyle.TableHead>
                <tbody>
                  {usersList.length > 0 ? (
                    usersList.map((item, idx) => {
                      return usersToStow.includes(idx + 1) ? (
                        type === "users" ? (
                          <RenderUsersListCells
                            key={item + type + idx}
                            item={item}
                            idx={idx}
                            onClickRow={() =>
                              history.push(
                                generatePath(navigateToDetails, {
                                  id: idx + 1,
                                })
                              )
                            }
                          />
                        ) : (
                          <RenderAdminsListCells
                            key={item + type + idx}
                            item={item}
                            idx={idx}
                            onClickConsent={onClickConsent}
                            onClickRow={() =>
                              history.push(
                                generatePath(navigateToDetails, {
                                  id: idx + 1,
                                })
                              )
                            }
                          />
                        )
                      ) : (
                        <Fragment key={item + idx} />
                      );
                    })
                  ) : (
                    <UsersStyle.TableRow>
                      <UsersStyle.TableCell colSpan={tableColHeadings.length}>
                        {Labels.NoData}
                      </UsersStyle.TableCell>
                    </UsersStyle.TableRow>
                  )}
                </tbody>
              </UsersStyle.StyledTable>
            </UsersStyle.TableContainer>

            <UsersStyle.TablePagination>
              <span>
                {`Showing ${pageStartingUser} to ${pageEndingUser} of ${totalUsers} entries`}
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
                  onClick={() =>
                    page >= 2 ? setPage(page - 1) : setPage(page)
                  }
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
          </Fragment>
        )}
      </UsersStyle.Container>
    </div>
  );
};

export default AccountsPage;
