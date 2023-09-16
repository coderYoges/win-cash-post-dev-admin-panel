import { Formik, ErrorMessage } from "formik";
import React from "react";
import { connect } from "react-redux";
import { DotLoader } from "react-spinner-overlay";
import StyledCmpt from "../styledCmpt";
import * as yup from "yup";
import { postRequest } from "../../api";
import { toast } from "react-toastify";
import { VALIDATIONS } from "../../config/validations";
import { setBalance } from "../../redux/auth";

const AddMoney = ({
  setAddMoney,
  balance,
  userId,
  updateUsersList,
  setBalance,
  addMoneyUrl,
  level1Parent,
  level2Parent,
  level3Parent,
  parentRole,
}) => {
  return (
    <StyledCmpt.ModalContainer>
      <StyledCmpt.ModalHeader className="bg-purple">
        Add Money
      </StyledCmpt.ModalHeader>
      <StyledCmpt.ModalCloseBox onClick={() => setAddMoney(false)}>
        x
      </StyledCmpt.ModalCloseBox>
      <Formik
        initialValues={{
          availableBalance: balance,
          transferAmount: 0,
        }}
        validationSchema={
          parentRole === "superadmin"
            ? yup.object().shape({
                transferAmount: yup
                  .number()
                  .min(10, "* Transfer amount is less than Rs.10")

                  .required("* Transfer Amount is required"),
              })
            : yup.object().shape({
                transferAmount: yup
                  .number()
                  .min(10, "* Transfer amount is less than Rs.10")
                  .max(balance, "* Transfer amount exists available balance")
                  .required("* Transfer Amount is required"),
              })
        }
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          try {
            const result = await postRequest(addMoneyUrl, {
              userName: userId,
              transferAmount: Number(values.transferAmount),
              tier1Parent: level1Parent,
              tier2Parent: level2Parent,
              tier3Parent: level3Parent,
              parentRole: parentRole,
            });
            setBalance(balance - values.transferAmount);
            await updateUsersList();
            if (result.isSuccessful) {
              toast.success("Balance updated successfully", {
                autoClose: 2000,
              });
            } else {
              toast.error(result.errorMessage, { autoClose: 2000 });
            }
          } catch (e) {
            toast.error(e, { autoClose: 2000 });
          } finally {
            setSubmitting(false);
            resetForm();
            setAddMoney(false);
          }
        }}
      >
        {({ values, handleSubmit, setFieldValue, isSubmitting }) => {
          const onChangeTransferAmount = (e) => {
            setFieldValue(
              "transferAmount",
              e.target.value.replace(VALIDATIONS.DIGIT, "")
            );
          };
          return (
            <form onSubmit={handleSubmit}>
              <StyledCmpt.ModalItemsWrapper>
                <StyledCmpt.ModalItem>
                  <StyledCmpt.ModalLabel htmlFor="availableBalance">
                    Available Balance
                  </StyledCmpt.ModalLabel>
                  <StyledCmpt.ModalInput
                    id="availableBalance"
                    name="availableBalance"
                    placeholder="Available Balance ..."
                    value={
                      parentRole === "superadmin" ? "ထ" : values.availableBalance
                    }
                    disabled
                  />
                </StyledCmpt.ModalItem>
                <StyledCmpt.ModalItem>
                  <StyledCmpt.ModalLabel htmlFor="transferAmount">
                    Enter Transfer Amount <span className="text-danger">*</span>
                  </StyledCmpt.ModalLabel>
                  <StyledCmpt.ModalInput
                    id="transferAmount"
                    placeholder="Transfer Amount ..."
                    name="transferAmount"
                    value={values.transferAmount}
                    onChange={onChangeTransferAmount}
                  />
                </StyledCmpt.ModalItem>
                <StyledCmpt.ErrorContainer className="m-0">
                  <ErrorMessage name="transferAmount" />
                </StyledCmpt.ErrorContainer>
              </StyledCmpt.ModalItemsWrapper>
              {isSubmitting ? (
                <StyledCmpt.ModalBtnGrp className="d-flex justify-content-center">
                  <DotLoader between={"8px"} color="#800080" />
                </StyledCmpt.ModalBtnGrp>
              ) : (
                <StyledCmpt.ModalBtnGrp className="d-flex justify-content-end">
                  <StyledCmpt.ModalBtn className="bg-purple" type="submit">
                    Confirm
                  </StyledCmpt.ModalBtn>
                </StyledCmpt.ModalBtnGrp>
              )}
            </form>
          );
        }}
      </Formik>
    </StyledCmpt.ModalContainer>
  );
};

const mapStateToProps = (state) => ({
  balance: state.auth.balance,
  level1Parent: state.auth.userName,
  level2Parent: state.auth.tier1Parent,
  level3Parent: state.auth.tier2Parent,
  parentRole: state.auth.userRole,
});

const mapDispatchToProps = {
  setBalance: setBalance,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMoney);
