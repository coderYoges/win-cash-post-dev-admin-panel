import { Formik, ErrorMessage } from "formik";
import React from "react";
import { DotLoader } from "react-spinner-overlay";
import StyledCmpt from "../styledCmpt";
import * as yup from "yup";
import { postRequest } from "../../api";
import { toast } from "react-toastify";
import { VALIDATIONS } from "../../config/validations";

const UpdateBank = ({
  setBank,
  updateUsersList,
  userId,
  item,
  bankChangeUrl,
}) => {
  return (
    <StyledCmpt.ModalContainer>
      <StyledCmpt.ModalHeader className="bg-blue">
        Update Bank Details
      </StyledCmpt.ModalHeader>
      <StyledCmpt.ModalCloseBox onClick={() => setBank(false)}>
        x
      </StyledCmpt.ModalCloseBox>
      <Formik
        initialValues={{
          upiId: item.upiId,
          bankName: item.bankName,
          ifscCode: item.ifscCode,
          accountHolderName: item.accountHolderName,
          accountNo: item.accountNo,
        }}
        validationSchema={yup.object().shape({
          upiId: yup.string().required("* UPI ID is required"),
          bankName: yup.string().required("* Bank Name is required"),
          ifscCode: yup
            .string()
            .min(11, "* IFSC Code should be 11 characters")
            .max(11)
            .required("* IFSC Code is required"),
          accountHolderName: yup
            .string()
            .required("* Account holder Name is required"),
          accountNo: yup.string().required("* Account Number is required"),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          if (
            values.upiId === item.upiId &&
            values.bankName === item.bankName &&
            values.ifscCode === item.ifscCode &&
            values.accountHolderName === item.accountHolderName &&
            values.accountNo === item.accountNo
          ) {
            toast.error("No records are altered", {
              autoClose: 2000,
            });
          } else {
            setSubmitting(true);
            try {
              const result = await postRequest(bankChangeUrl, {
                userName: userId,
                upiId: values.upiId,
                bankName: values.bankName,
                ifscCode: values.ifscCode,
                accountHolderName: values.accountHolderName,
                accountNo: values.accountNo,
              });
              await updateUsersList();
              if (result.isSuccessful) {
                toast.success("Bank Details updated successfully", {
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
              setBank(false);
            }
          }
        }}
      >
        {({
          values,
          handleSubmit,
          setFieldValue,
          isSubmitting,
          handleReset,
        }) => {
          const onChangeUpiId = (e) => {
            setFieldValue("upiId", e.target.value.replace(VALIDATIONS.UPI, ""));
          };
          const onChangeAccountHolderName = (e) => {
            setFieldValue(
              "accountHolderName",
              e.target.value.replace(VALIDATIONS.ALPHANUM, "")
            );
          };
          const onChangeAccountNo = (e) => {
            setFieldValue(
              "accountNo",
              e.target.value.replace(VALIDATIONS.ALPHANUM, "")
            );
          };
          const onChangeIfscCode = (e) => {
            setFieldValue(
              "ifscCode",
              e.target.value.replace(VALIDATIONS.ALPHANUM, "")
            );
          };
          const onChangeBankName = (e) => {
            setFieldValue(
              "bankName",
              e.target.value.replace(VALIDATIONS.ALPHANUM, "")
            );
          };

          return (
            <form onSubmit={handleSubmit}>
              <StyledCmpt.ModalItemsWrapper>
                <StyledCmpt.ModalItem>
                  <StyledCmpt.ModalLabel htmlFor="upiId">
                    Your UPI ID <span className="text-danger">*</span>
                  </StyledCmpt.ModalLabel>
                  <StyledCmpt.ModalInput
                    id="upiId"
                    placeholder="Your UPI ID ..."
                    name="upiId"
                    autoComplete="false"
                    value={values.upiId}
                    onChange={onChangeUpiId}
                  />
                </StyledCmpt.ModalItem>
                <StyledCmpt.ErrorContainer className="m-0">
                  <ErrorMessage name="upiId" />
                </StyledCmpt.ErrorContainer>
                <StyledCmpt.ModalItem>
                  <StyledCmpt.ModalLabel htmlFor="accountName">
                    Account Holder Name <span className="text-danger">*</span>
                  </StyledCmpt.ModalLabel>
                  <StyledCmpt.ModalInput
                    id="accountHolderName"
                    placeholder="Account Holder Name ..."
                    name="accountHolderName"
                    autoComplete="false"
                    value={values.accountHolderName}
                    onChange={onChangeAccountHolderName}
                  />
                </StyledCmpt.ModalItem>
                <StyledCmpt.ErrorContainer className="m-0">
                  <ErrorMessage name="accountHolderName" />
                </StyledCmpt.ErrorContainer>
                <StyledCmpt.ModalItem>
                  <StyledCmpt.ModalLabel htmlFor="accountNo">
                    Account Number <span className="text-danger">*</span>
                  </StyledCmpt.ModalLabel>
                  <StyledCmpt.ModalInput
                    id="accountNo"
                    placeholder="Account Number ..."
                    name="accountNo"
                    autoComplete="false"
                    value={values.accountNo}
                    onChange={onChangeAccountNo}
                  />
                </StyledCmpt.ModalItem>
                <StyledCmpt.ErrorContainer className="m-0">
                  <ErrorMessage name="accountNo" />
                </StyledCmpt.ErrorContainer>
                <StyledCmpt.ModalItem>
                  <StyledCmpt.ModalLabel htmlFor="ifscCode">
                    IFSC Code <span className="text-danger">*</span>
                  </StyledCmpt.ModalLabel>
                  <StyledCmpt.ModalInput
                    id="ifscCode"
                    placeholder="IFSC Code ..."
                    name="ifscCode"
                    autoComplete="false"
                    value={values.ifscCode}
                    onChange={onChangeIfscCode}
                  />
                </StyledCmpt.ModalItem>
                <StyledCmpt.ErrorContainer className="m-0">
                  <ErrorMessage name="ifscCode" />
                </StyledCmpt.ErrorContainer>
                <StyledCmpt.ModalItem>
                  <StyledCmpt.ModalLabel htmlFor="bankName">
                    Bank Name <span className="text-danger">*</span>
                  </StyledCmpt.ModalLabel>
                  <StyledCmpt.ModalInput
                    id="bankName"
                    placeholder="Bank Name ..."
                    name="bankName"
                    autoComplete="false"
                    value={values.bankName}
                    onChange={onChangeBankName}
                  />
                </StyledCmpt.ModalItem>
                <StyledCmpt.ErrorContainer className="m-0">
                  <ErrorMessage name="bankName" />
                </StyledCmpt.ErrorContainer>
              </StyledCmpt.ModalItemsWrapper>
              {isSubmitting ? (
                <StyledCmpt.ModalBtnGrp className="d-flex justify-content-center">
                  <DotLoader between={"8px"} color="#00008b" />
                </StyledCmpt.ModalBtnGrp>
              ) : (
                <StyledCmpt.ModalBtnGrp className="d-flex justify-content-end">
                  <StyledCmpt.ModalBtn
                    className="bg-blue"
                    onClick={() => handleReset()}
                    type="reset"
                  >
                    Reset
                  </StyledCmpt.ModalBtn>
                  <StyledCmpt.ModalBtn className="bg-blue" type="submit">
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

export default UpdateBank;
