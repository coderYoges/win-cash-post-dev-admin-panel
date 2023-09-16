import React, { useState } from "react";
import styled from "styled-components";
import StyledCmpt from "../styledCmpt";
import { DotLoader } from "react-spinner-overlay";
import { RouteConfig } from "../../config/routeConfig";
import { postRequest } from "../../api";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

const ToogleStyled = styled.input`
  &&& {
    width: 48px;
    height: 24px;
    margin: auto;
  }
`;

const BlockUser = ({ setBlockOpen, item, updateUsersList, blockUrl, type }) => {
  const [isBlocked, setBlocked] = useState(item.isUserDisabled);
  const [isDeleted, setDeleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onConfirm = async () => {
    setLoading(true);
    try {
      let result;
      if (isDeleted) {
        result = await postRequest(blockUrl, {
          userName: item.userName,
          isUserDeleted: true,
          isUserDisabled: false,
        });
        updateUsersList();
        result.isSuccessful &&
          toast.success("User deleted successfully !!!", { autoClose: 2000 });
        history.push(RouteConfig.dashboard);
      }
      if (!isDeleted) {
        result = await postRequest(blockUrl, {
          userName: item.userName,
          isUserDeleted: false,
          isUserDisabled: isBlocked,
        });
        updateUsersList();
        result.isSuccessful &&
          toast.success("User status updated successfully", {
            autoClose: 2000,
          });
      }
      if (!result.isSuccessful)
        toast.error(result.errorMessage, { autoClose: 2000 });
    } catch (e) {
      toast.error(e.errorMessage, { autoClose: 2000 });
    } finally {
      setLoading(false);
      setBlockOpen(false);
    }
  };

  return (
    <StyledCmpt.ModalContainer>
      <StyledCmpt.ModalHeader className="bg-red">
        Block / Delete
      </StyledCmpt.ModalHeader>
      <StyledCmpt.ModalCloseBox onClick={() => setBlockOpen(false)}>
        x
      </StyledCmpt.ModalCloseBox>
      <StyledCmpt.ModalItemsWrapper>
        <StyledCmpt.ModalLabel>Block / Unblock</StyledCmpt.ModalLabel>
        <div className="form-check form-switch">
          <ToogleStyled
            className="form-check-input"
            type="checkbox"
            role="switch"
            checked={isBlocked}
            onChange={() => setBlocked(!isBlocked)}
          />
          <StyledCmpt.ModalLabel className="form-check-label mx-5 px-3">
            <span>Selected Status : </span>
            <span className="fs-lg fw-600">
              {isBlocked ? "Block" : "Active"}
            </span>
          </StyledCmpt.ModalLabel>
        </div>
        <StyledCmpt.ModalLabel>Delete Record</StyledCmpt.ModalLabel>
        <div className="form-check form-switch">
          <ToogleStyled
            className="form-check-input"
            type="checkbox"
            role="switch"
            checked={isDeleted}
            onChange={() => setDeleted(!isDeleted)}
          />
          <StyledCmpt.ModalLabel className="form-check-label mx-5 px-3">
            <span>Selected Status : </span>
            <span className="fs-lg fw-600">
              {isDeleted ? "Delete" : "Active"}
            </span>
          </StyledCmpt.ModalLabel>
        </div>
      </StyledCmpt.ModalItemsWrapper>

      {loading ? (
        <StyledCmpt.ModalBtnGrp className="d-flex justify-content-center">
          <DotLoader between={"8px"} color="red" />
        </StyledCmpt.ModalBtnGrp>
      ) : (
        <StyledCmpt.ModalBtnGrp className="d-flex justify-content-end">
          <StyledCmpt.ModalBtn className="bg-red" onClick={onConfirm}>
            Confirm
          </StyledCmpt.ModalBtn>
        </StyledCmpt.ModalBtnGrp>
      )}
    </StyledCmpt.ModalContainer>
  );
};

export default BlockUser;
