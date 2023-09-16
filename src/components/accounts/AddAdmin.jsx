import React from "react";
import { ErrorMessage, Formik } from "formik";
import { connect } from "react-redux";
import { VALIDATIONS } from "../../config/validations";
import * as yup from "yup";
import { toast } from "react-toastify";
import StyledCmpt from "../styledCmpt";
import { postRequest } from "../../api";
import { WIN_CASH_URL } from "../../config/routeConfig";
import { DotLoader } from "react-spinner-overlay";
import { setAdminsList, setBalance } from "../../redux/auth";

const AddAdmin = ({
  setAddUser,
  level1Parent,
  level2Parent,
  level3Parent,
  setAdminsList,
  setBalance,
  balance,
  title,
  url,
  newRole,
  successMsg,
  parentRole,
}) => {
  return (
    <StyledCmpt.ModalContainer>
      <StyledCmpt.ModalHeader className="bg-black">
        {title}
      </StyledCmpt.ModalHeader>
      <StyledCmpt.ModalCloseBox onClick={() => setAddUser(false)}>
        x
      </StyledCmpt.ModalCloseBox>
      <Formik
        initialValues={{
          username: "",
          openingbalance: "",
          enterPassword: "",
          confirmPassword: "",
        }}
        validationSchema={
          parentRole === "superadmin"
            ? yup.object().shape({
                username: yup
                  .string()
                  .min(6, "* Username must be atleast 6 characters")
                  .required("* User name is required"),
                openingbalance: yup.number(),
                enterPassword: yup
                  .string()
                  .min(6, "* Password must be atleast 6 characters")
                  .max(14)
                  .required("* Password is required"),
                confirmPassword: yup
                  .string()
                  .required("* Confirm password is required")
                  .oneOf(
                    [yup.ref("enterPassword"), null],
                    "* Passwords must match"
                  ),
              })
            : yup.object().shape({
                username: yup
                  .string()
                  .min(6, "* Username must be atleast 6 characters")
                  .required("* User name is required"),
                openingbalance: yup
                  .number()
                  .max(
                    balance,
                    "* Entered Amount is more than available balance"
                  ),
                enterPassword: yup
                  .string()
                  .min(6, "* Password must be atleast 6 characters")
                  .max(14)
                  .required("* Password is required"),
                confirmPassword: yup
                  .string()
                  .required("* Confirm password is required")
                  .oneOf(
                    [yup.ref("enterPassword"), null],
                    "* Passwords must match"
                  ),
              })
        }
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          try {
            const result = await postRequest(url, {
              balance: Number(values.openingbalance),
              tier1Parent: level1Parent,
              tier2Parent: level2Parent,
              tier3Parent: level3Parent,
              userName: values.username,
              password: values.enterPassword,
              totalDeposits: Number(values.openingbalance),
              userRole: newRole,
              parentRole: parentRole,
            });
            if (result.isSuccessful && result.successCode === "0000") {
              const adminsResult = await postRequest(
                WIN_CASH_URL.GET_ADMINS_BY_PARENT_ID,
                {
                  tier1Parent: level1Parent,
                }
              );
              setBalance(balance - Number(values.openingbalance));
              setAdminsList(adminsResult.data);
              toast.success(successMsg, { autoClose: 2000 });
            } else {
              toast.error(result.errorMessage, { autoClose: 2000 });
            }
          } catch (e) {
            toast.error(e, { autoClose: 2000 });
          } finally {
            setSubmitting(false);
            resetForm();
            setAddUser(false);
          }
        }}
      >
        {({
          values,
          handleSubmit,
          setFieldValue,
          handleReset,
          isSubmitting,
        }) => {
          const onNameChange = (e) => {
            setFieldValue(
              "username",
              e.target.value.replace(VALIDATIONS.ALPHANUM, "")
            );
          };
          const onBalanceChange = (e) => {
            setFieldValue(
              "openingbalance",
              e.target.value.replace(VALIDATIONS.DIGIT, "")
            );
          };
          const onPasswordChange = (e) => {
            setFieldValue(
              "enterPassword",
              e.target.value.replace(VALIDATIONS.ALPHANUM, "")
            );
          };
          const onConfirmPasswordChange = (e) => {
            setFieldValue(
              "confirmPassword",
              e.target.value.replace(VALIDATIONS.ALPHANUM, "")
            );
          };
          return (
            <form onSubmit={handleSubmit}>
              <StyledCmpt.ModalItemsWrapper>
                <StyledCmpt.ModalItem>
                  <StyledCmpt.ModalLabel htmlFor="username">
                    Username <span className="text-danger">*</span>
                  </StyledCmpt.ModalLabel>
                  <StyledCmpt.ModalInput
                    id="username"
                    name="username"
                    placeholder="Enter User name ..."
                    onChange={onNameChange}
                    autoComplete="false"
                    type="text"
                    value={values.username}
                    minLength={6}
                  />
                </StyledCmpt.ModalItem>

                <StyledCmpt.ErrorContainer className="m-0">
                  <ErrorMessage name="username" />
                </StyledCmpt.ErrorContainer>

                <StyledCmpt.ModalItem>
                  <StyledCmpt.ModalLabel htmlFor="openingbalance">
                    Opening Balance <span className="text-danger">*</span>
                  </StyledCmpt.ModalLabel>
                  <StyledCmpt.ModalInput
                    id="openingbalance"
                    name="openingbalance"
                    placeholder="Opening Balance ..."
                    onChange={onBalanceChange}
                    autoComplete="false"
                    type="number"
                    value={values.openingbalance}
                  />
                </StyledCmpt.ModalItem>

                <StyledCmpt.ErrorContainer className="m-0">
                  <ErrorMessage name="openingbalance" />
                </StyledCmpt.ErrorContainer>

                <StyledCmpt.ModalItem>
                  <StyledCmpt.ModalLabel htmlFor="enterPassword">
                    Enter Password <span className="text-danger">*</span>
                  </StyledCmpt.ModalLabel>
                  <StyledCmpt.ModalInput
                    type="password"
                    id="enterPassword"
                    name="enterPassword"
                    placeholder="Enter Password ..."
                    autoComplete="false"
                    value={values.enterPassword}
                    onChange={onPasswordChange}
                    maxLength={14}
                  />
                </StyledCmpt.ModalItem>

                <StyledCmpt.ErrorContainer className="m-0">
                  <ErrorMessage name="enterPassword" />
                </StyledCmpt.ErrorContainer>
                <StyledCmpt.ModalItem>
                  <StyledCmpt.ModalLabel htmlFor="confirmPassword">
                    Confirm Password <span className="text-danger">*</span>
                  </StyledCmpt.ModalLabel>
                  <StyledCmpt.ModalInput
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password ..."
                    autoComplete="false"
                    value={values.confirmPassword}
                    onChange={onConfirmPasswordChange}
                    maxLength={14}
                  />
                </StyledCmpt.ModalItem>
                <StyledCmpt.ErrorContainer className="m-0">
                  <ErrorMessage name="confirmPassword" />
                </StyledCmpt.ErrorContainer>
              </StyledCmpt.ModalItemsWrapper>

              {!isSubmitting ? (
                <StyledCmpt.ModalBtnGrp className="d-flex justify-content-end">
                  <StyledCmpt.ModalBtn
                    className="bg-black"
                    onClick={handleReset}
                  >
                    Reset
                  </StyledCmpt.ModalBtn>
                  <StyledCmpt.ModalBtn className="bg-black" type="submit">
                    Confirm
                  </StyledCmpt.ModalBtn>
                </StyledCmpt.ModalBtnGrp>
              ) : (
                <StyledCmpt.ModalBtnGrp className="d-flex justify-content-center">
                  <DotLoader between={"8px"} color="#000" />
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
  level1Parent: state.auth.userName,
  level2Parent: state.auth.tier1Parent,
  level3Parent: state.auth.tier2Parent,
  balance: state.auth.balance,
  parentRole: state.auth.userRole,
});

const mapDispatchToProps = {
  setAdminsList: setAdminsList,
  setBalance: setBalance,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAdmin);
