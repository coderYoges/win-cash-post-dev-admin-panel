import React from "react";
import StyledCmpt from "../styledCmpt";
import { DotLoader } from "react-spinner-overlay";
import { ErrorMessage, Formik } from "formik";
import { VALIDATIONS } from "../../config/validations";
import * as yup from "yup";
import { postRequest } from "../../api";
import { toast } from "react-toastify";

const ChangePassword = ({
  setPassword,
  updateUsersList,
  userId,
  passwordChangeUrl,
}) => {
  return (
    <StyledCmpt.ModalContainer>
      <StyledCmpt.ModalHeader className="bg-green">
        Change Password
      </StyledCmpt.ModalHeader>
      <StyledCmpt.ModalCloseBox onClick={() => setPassword(false)}>
        x
      </StyledCmpt.ModalCloseBox>
      <Formik
        initialValues={{
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={yup.object().shape({
          oldPassword: yup
            .string()
            .min(6, "* Old Password must be atleast 6 characters")
            .max(14)
            .required("* Old Password is required"),
          newPassword: yup
            .string()
            .min(6, "* New Password must be atleast 6 characters")
            .max(14)
            .required("* New Password is required"),

          confirmPassword: yup
            .string()
            .required("* Confirm password is required")
            .oneOf(
              [yup.ref("newPassword"), null],
              "* New Passwords must match"
            ),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          if (values.oldPassword === values.newPassword) {
            toast.error("Old Password and New Password must be different", {
              autoClose: 2000,
            });
            resetForm();
          } else {
            setSubmitting(true);
            try {
              const result = await postRequest(
                passwordChangeUrl,
                {
                  userName: userId,
                  oldPassword: values.oldPassword,
                  newPassword: values.newPassword,
                }
              );
              updateUsersList();
              if (result.isSuccessful) {
                toast.success("Password updated successfully", {
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
              setPassword(false);
            }
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
          const onOldPasswordChange = (e) => {
            setFieldValue(
              "oldPassword",
              e.target.value.replace(VALIDATIONS.ALPHANUM, "")
            );
          };
          const onNewPasswordChange = (e) => {
            setFieldValue(
              "newPassword",
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
                  <StyledCmpt.ModalLabel htmlFor="oldPassword">
                    Your Password <span className="text-danger">*</span>
                  </StyledCmpt.ModalLabel>
                  <StyledCmpt.ModalInput
                    type="password"
                    id="oldPassword"
                    name="oldPassword"
                    placeholder="Your Password ..."
                    autoComplete="false"
                    value={values.oldPassword}
                    onChange={onOldPasswordChange}
                    maxLength={14}
                  />
                </StyledCmpt.ModalItem>
                <StyledCmpt.ErrorContainer className="m-0">
                  <ErrorMessage name="oldPassword" />
                </StyledCmpt.ErrorContainer>
                <StyledCmpt.ModalItem>
                  <StyledCmpt.ModalLabel htmlFor="newPassword">
                    New Password <span className="text-danger">*</span>
                  </StyledCmpt.ModalLabel>
                  <StyledCmpt.ModalInput
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    placeholder="New Password ..."
                    autoComplete="false"
                    value={values.newPassword}
                    onChange={onNewPasswordChange}
                    maxLength={14}
                  />
                </StyledCmpt.ModalItem>
                <StyledCmpt.ErrorContainer className="m-0">
                  <ErrorMessage name="newPassword" />
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

              {isSubmitting ? (
                <StyledCmpt.ModalBtnGrp className="d-flex justify-content-center">
                  <DotLoader between={"8px"} color="#008000" />
                </StyledCmpt.ModalBtnGrp>
              ) : (
                <StyledCmpt.ModalBtnGrp className="d-flex justify-content-end">
                  <StyledCmpt.ModalBtn
                    className="bg-green"
                    onClick={handleReset}
                  >
                    Reset
                  </StyledCmpt.ModalBtn>
                  <StyledCmpt.ModalBtn className="bg-green" type="submit">
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

export default ChangePassword;
