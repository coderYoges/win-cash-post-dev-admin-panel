import React from "react";
import StyledCmpt from "../styledCmpt";
import styled from "styled-components";
import { AiFillCloseCircle } from "react-icons/ai";

const BodyWrapper = styled.div`
  min-height: 25px;
  font-weight: 600;
  font-size: 18px;
  text-align: center;
  width: 100%;
`;

const InfoIcon = styled(AiFillCloseCircle)`
  width: 50px;
  height: 50px;
  margin-left: auto;
  margin-right: auto;
  color: red;
`;

export const DuesConsent = ({ setConsent }) => {
  return (
    <StyledCmpt.ModalContainer>
      <StyledCmpt.ModalHeader className="bg-disabled">
        Confirmation
      </StyledCmpt.ModalHeader>

      <StyledCmpt.ModalItemsWrapper>
        <InfoIcon />
        <BodyWrapper>Are you sure to clear dues ?</BodyWrapper>
      </StyledCmpt.ModalItemsWrapper>
      <StyledCmpt.ModalBtnGrp className="d-flex justify-content-around mb-3">
        <StyledCmpt.ModalBtn
          className="bg-disabled"
          onClick={() => setConsent(false)}
        >
          No
        </StyledCmpt.ModalBtn>
        <StyledCmpt.ModalBtn className="bg-green">Yes</StyledCmpt.ModalBtn>
      </StyledCmpt.ModalBtnGrp>
    </StyledCmpt.ModalContainer>
  );
};
