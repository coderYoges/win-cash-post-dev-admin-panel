import { Formik, ErrorMessage } from "formik";
import React from "react";
import { DotLoader } from "react-spinner-overlay";
import StyledCmpt from "../styledCmpt";
import * as yup from "yup";
import { postRequest } from "../../api";
import { toast } from "react-toastify";
import { VALIDATIONS } from "../../config/validations";

const WithdrawMoney = ({
  setWithdrawMoney,
  item,
  userId,
  updateUsersList,
  debitMoneyUrl,
}) => {
  return (
    <StyledCmpt.ModalContainer>
      <StyledCmpt.ModalHeader className="bg-olive">
        Withdraw Money
      </StyledCmpt.ModalHeader>
      <StyledCmpt.ModalCloseBox onClick={() => setWithdrawMoney(false)}>
        x
      </StyledCmpt.ModalCloseBox>
      <Formik
        initialValues={{
          availableBalance: item.balance,
          withdrawAmount: 0,
        }}
        validationSchema={yup.object().shape({
          withdrawAmount: yup
            .number()
            .min(10, "* Withdraw amount is less than Rs.10")
            .max(item.balance, "* Withdraw amount exists available balance")
            .required("* Withdraw Amount is required"),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          try {
            const result = await postRequest(debitMoneyUrl, {
              userName: userId,
              transferAmount: Number(values.withdrawAmount),
            });
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
            setWithdrawMoney(false);
          }
        }}
      >
        {({ values, handleSubmit, setFieldValue, isSubmitting }) => {
          const onChangeWithdrawAmount = (e) => {
            setFieldValue(
              "withdrawAmount",
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
                    value={values.availableBalance}
                    disabled
                  />
                </StyledCmpt.ModalItem>
                <StyledCmpt.ModalItem>
                  <StyledCmpt.ModalLabel htmlFor="withdrawAmount">
                    Enter Transfer Amount <span className="text-danger">*</span>
                  </StyledCmpt.ModalLabel>
                  <StyledCmpt.ModalInput
                    id="withdrawAmount"
                    placeholder="Withdraw Amount ..."
                    name="withdrawAmount"
                    value={values.withdrawAmount}
                    onChange={onChangeWithdrawAmount}
                  />
                </StyledCmpt.ModalItem>
                <StyledCmpt.ErrorContainer className="m-0">
                  <ErrorMessage name="withdrawAmount" />
                </StyledCmpt.ErrorContainer>
              </StyledCmpt.ModalItemsWrapper>
              {isSubmitting ? (
                <StyledCmpt.ModalBtnGrp className="d-flex justify-content-center">
                  <DotLoader between={"8px"} color="#808000" />
                </StyledCmpt.ModalBtnGrp>
              ) : (
                <StyledCmpt.ModalBtnGrp className="d-flex justify-content-end">
                  <StyledCmpt.ModalBtn className="bg-olive" type="submit">
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

export default WithdrawMoney;
