import React, { Fragment, useState } from "react";
import { useParams } from "react-router";
import ChangePassword from "./ChangePassword";
import UpdateBank from "./UpdateBank";
import AddMoney from "./AddMoney";
import WithdrawMoney from "./WithdrawMoney";
import BlockUser from "./BlockUser";
import StyledCmpt from "../styledCmpt";
import { ToastContainer } from "react-toastify";
import { DotLoader } from "react-spinner-overlay";
import { useHistory, generatePath } from "react-router";
import { RouteConfig } from "../../config/routeConfig";

const RenderUserDetails = ({ item }) => {
  return (
    <Fragment>
      <StyledCmpt.DetailsItem className="row m-0">
        <StyledCmpt.DetailsLeftItem className="col-6">
          User Name
        </StyledCmpt.DetailsLeftItem>
        <StyledCmpt.DetailsRightItem className="col-6 text-center">
          {item.userName}
        </StyledCmpt.DetailsRightItem>
      </StyledCmpt.DetailsItem>
      <StyledCmpt.DetailsItem className="row m-0">
        <StyledCmpt.DetailsLeftItem className="col-6">
          Available Balance
        </StyledCmpt.DetailsLeftItem>
        <StyledCmpt.DetailsRightItem className="col-6 text-center">
          {item.balance}
        </StyledCmpt.DetailsRightItem>
      </StyledCmpt.DetailsItem>
      <StyledCmpt.DetailsItem className="row m-0">
        <StyledCmpt.DetailsLeftItem className="col-6 ">
          Total Deposit
        </StyledCmpt.DetailsLeftItem>
        <StyledCmpt.DetailsRightItem className="col-6 text-center">
          {item.totalDeposits}
        </StyledCmpt.DetailsRightItem>
      </StyledCmpt.DetailsItem>
      <StyledCmpt.DetailsItem className="row m-0">
        <StyledCmpt.DetailsLeftItem className="col-6">
          Total Withdrawal
        </StyledCmpt.DetailsLeftItem>
        <StyledCmpt.DetailsRightItem className="col-6 text-center">
          {item.totalWithdrawal || 0}
        </StyledCmpt.DetailsRightItem>
      </StyledCmpt.DetailsItem>
      <StyledCmpt.DetailsItem className="row m-0">
        <StyledCmpt.DetailsLeftItem className="col-6">
          Amount Win
        </StyledCmpt.DetailsLeftItem>
        <StyledCmpt.DetailsRightItem className="col-6 text-center">
          {item.winnings || 0}
        </StyledCmpt.DetailsRightItem>
      </StyledCmpt.DetailsItem>
      <StyledCmpt.DetailsItem className="row m-0">
        <StyledCmpt.DetailsLeftItem className="col-6">
          Amount Loss
        </StyledCmpt.DetailsLeftItem>
        <StyledCmpt.DetailsRightItem className="col-6 text-center">
          {item.losses || 0}
        </StyledCmpt.DetailsRightItem>
      </StyledCmpt.DetailsItem>
      <StyledCmpt.DetailsItem className="row m-0">
        <StyledCmpt.DetailsLeftItem className="col-6">
          Commissions
        </StyledCmpt.DetailsLeftItem>
        <StyledCmpt.DetailsRightItem className="col-6 text-center">
          {item.mainParentCommission || 0}
        </StyledCmpt.DetailsRightItem>
      </StyledCmpt.DetailsItem>
    </Fragment>
  );
};

const RenderAdminDetails = ({ item }) => {
  return (
    <Fragment>
      <StyledCmpt.DetailsItem className="row m-0">
        <StyledCmpt.DetailsLeftItem className="col-6">
          User Name
        </StyledCmpt.DetailsLeftItem>
        <StyledCmpt.DetailsRightItem className="col-6 text-center">
          {item.userName}
        </StyledCmpt.DetailsRightItem>
      </StyledCmpt.DetailsItem>
      <StyledCmpt.DetailsItem className="row m-0">
        <StyledCmpt.DetailsLeftItem className="col-6">
          Available Balance
        </StyledCmpt.DetailsLeftItem>
        <StyledCmpt.DetailsRightItem className="col-6 text-center">
          {item.balance}
        </StyledCmpt.DetailsRightItem>
      </StyledCmpt.DetailsItem>
      <StyledCmpt.DetailsItem className="row m-0">
        <StyledCmpt.DetailsLeftItem className="col-6 ">
          Total Withdrawal
        </StyledCmpt.DetailsLeftItem>
        <StyledCmpt.DetailsRightItem className="col-6 text-center">
          {item.totalWithdrawal || 0}
        </StyledCmpt.DetailsRightItem>
      </StyledCmpt.DetailsItem>
      <StyledCmpt.DetailsItem className="row m-0">
        <StyledCmpt.DetailsLeftItem className="col-6">
          Total Users
        </StyledCmpt.DetailsLeftItem>
        <StyledCmpt.DetailsRightItem className="col-6 text-center">
          {item.totalUsers ? item.totalUsers.length : 0}
        </StyledCmpt.DetailsRightItem>
      </StyledCmpt.DetailsItem>
      <StyledCmpt.DetailsItem className="row m-0">
        <StyledCmpt.DetailsLeftItem className="col-6">
          Commissions
        </StyledCmpt.DetailsLeftItem>
        <StyledCmpt.DetailsRightItem className="col-6 text-center">
          {item.commissions || 0}
        </StyledCmpt.DetailsRightItem>
      </StyledCmpt.DetailsItem>
    </Fragment>
  );
};

const AccountDetails = ({
  updateList,
  usersList,
  loading,
  pageTitle,
  type = "users",
  passwordChangeUrl,
  bankChangeUrl,
  blockUrl,
  addMoneyUrl,
  debitMoneyUrl,
}) => {
  const [isPasswordOpen, setPassword] = useState(false);
  const [isBankOpen, setBank] = useState(false);
  const [isAddMoney, setAddMoney] = useState(false);
  const [isWithdrawMoney, setWithdrawMoney] = useState(false);
  const [isBlockOpen, setBlockOpen] = useState(false);
  const history = useHistory();
  const { id } = useParams();
  const item = usersList[id - 1];
  return (
    <StyledCmpt.DetailsWrapper>
      <ToastContainer limit={1} />
      {isPasswordOpen && (
        <ChangePassword
          setPassword={setPassword}
          userId={item.userName}
          updateUsersList={updateList}
          passwordChangeUrl={passwordChangeUrl}
        />
      )}
      {isBankOpen && (
        <UpdateBank
          setBank={setBank}
          userId={item.userName}
          updateUsersList={updateList}
          item={item}
          bankChangeUrl={bankChangeUrl}
        />
      )}
      {isAddMoney && (
        <AddMoney
          setAddMoney={setAddMoney}
          userId={item.userName}
          updateUsersList={updateList}
          addMoneyUrl={addMoneyUrl}
        />
      )}
      {isWithdrawMoney && (
        <WithdrawMoney
          setWithdrawMoney={setWithdrawMoney}
          userId={item.userName}
          updateUsersList={updateList}
          item={item}
          debitMoneyUrl={debitMoneyUrl}
        />
      )}
      {isBlockOpen && (
        <BlockUser
          setBlockOpen={setBlockOpen}
          item={item}
          updateUsersList={updateList}
          blockUrl={blockUrl}
          type={type}
        />
      )}

      <StyledCmpt.DetailsContainer
        dullOpacity={
          isPasswordOpen ||
          isBankOpen ||
          isAddMoney ||
          isBlockOpen ||
          isWithdrawMoney
        }
      >
        <StyledCmpt.HeaderStyled className="row m-0">
          {pageTitle}
        </StyledCmpt.HeaderStyled>
        <div>
          {type === "users" ? (
            <RenderUserDetails item={item} />
          ) : (
            <RenderAdminDetails item={item} />
          )}
          {loading ? (
            <StyledCmpt.ModalBtnGrp className="d-flex justify-content-center mt-4">
              <DotLoader between={"8px"} color="#2e4b5e" />
            </StyledCmpt.ModalBtnGrp>
          ) : (
            <StyledCmpt.DetailsItem className="row m-0">
              <div
                className="col-6 p-0 px-2"
                onClick={() => setBlockOpen(true)}
              >
                <StyledCmpt.DetailsBtn className="bg-red">
                  Block / Delete
                </StyledCmpt.DetailsBtn>
              </div>
              <div className="col-6 p-0 px-2" onClick={() => setPassword(true)}>
                <StyledCmpt.DetailsBtn className="bg-green">
                  Change Password
                </StyledCmpt.DetailsBtn>
              </div>
              <div
                className="col-6 p-0 mt-2 px-2"
                onClick={() => setBank(true)}
              >
                <StyledCmpt.DetailsBtn className="bg-blue">
                  Update Bank Details
                </StyledCmpt.DetailsBtn>
              </div>
              <div
                className="col-6 p-0 mt-2 px-2"
                onClick={() => setAddMoney(true)}
              >
                <StyledCmpt.DetailsBtn className="bg-purple">
                  Add Money
                </StyledCmpt.DetailsBtn>
              </div>

              <div
                className="col-6 p-0 mt-2 px-2"
                onClick={() => setWithdrawMoney(true)}
              >
                <StyledCmpt.DetailsBtn className="bg-olive">
                  Withdraw Money
                </StyledCmpt.DetailsBtn>
              </div>
              <div
                className="col-6 p-0 mt-2 px-2"
                onClick={() => {
                  history.push(
                    generatePath(RouteConfig.gameDetails, {
                      id: id,
                    })
                  );
                }}
              >
                <StyledCmpt.DetailsBtn
                  className={`${
                    type === "users" ? "bg-salmon" : "bg-disabled"
                  }`}
                  disabled={type !== "users"}
                >
                  Bet History
                </StyledCmpt.DetailsBtn>
              </div>
            </StyledCmpt.DetailsItem>
          )}
        </div>
      </StyledCmpt.DetailsContainer>
    </StyledCmpt.DetailsWrapper>
  );
};

export default AccountDetails;
