import React from "react";
import styled from "styled-components";
import { Formik, ErrorMessage } from "formik";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import * as yup from "yup";
import { useHistory } from "react-router";
import { withRouter } from "react-router-dom";
import { FerrisWheelSpinner } from "react-spinner-overlay";
import { Labels } from "../../config/constants";
import { MdLogout } from "react-icons/md";
import { VALIDATIONS } from "../../config/validations";
import { RouteConfig, WIN_CASH_URL } from "../../config/routeConfig";
import { LOGIN_ERRORS } from "../../config/errorMessages";
import { postRequest } from "../../api";
import { setAdminUser, setUsersList, setAdminsList } from "../../redux/auth";

const bgImage = require("../../assets/images/login-bg.jpg");

const LoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  background-color: ${(props) => props.theme.colors.loginBg};
  background-image url(${bgImage});
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
`;

const LoginStyled = styled.div`
  position: absolute;
  width: 600px;
  max-width: 90vw;
  left: 0;
  right: 0;
  top: 20%;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.loginBoxBg};
  border-radius: 8px;
  padding: 50px 0;
`;

const LoginLabel = styled.h2`
  text-align: center;
  padding: 15px;
  color: #fff;
`;

const LoginInput = styled.input`
  border: none;
  outline: none;
  padding: 10px;
  border-radius: 5px;
  width: 90%;
`;

const ErrorContainer = styled.div`
  display: flex;
  width: 90%;
  color: red;
  font-size: 16px;
  font-weight: 400;
  margin: auto;
`;

const LoginButton = styled.button`
  width: 90%;
  height: 50px;
  padding: 10px;
  background-color: ${(props) =>
    props.disabled ? props.theme.colors.disabled : props.theme.colors.red};
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-size: 20px;
  &:hover {
    background-color: ${(props) =>
      props.disabled
        ? props.theme.colors.disabled
        : props.theme.colors.redHover};
  }
`;

const LoginPage = ({ setAdminUser, setUsersList, setAdminsList }) => {
  const history = useHistory();
  return (
    <LoginContainer>
      <ToastContainer position="top-right" autoClose={2000} />
      <LoginStyled>
        <LoginLabel className="fs-xxxl fw-700">{Labels.LoginTitle}</LoginLabel>
        <Formik
          validateOnBlur
          validateOnChange
          validateOnMount
          initialValues={{
            name: "",
            password: "",
          }}
          validationSchema={yup.object().shape({
            name: yup
              .string()
              .min(6, LOGIN_ERRORS.USERNAME_MIN)
              .max(14)
              .required(LOGIN_ERRORS.USERNAME),
            password: yup
              .string()
              .min(6, LOGIN_ERRORS.PASSWORD_MIN)
              .max(14)
              .required(LOGIN_ERRORS.PASSWORD),
          })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            try {
              const loginResult = await postRequest(WIN_CASH_URL.LOGIN, {
                userName: values.name,
                password: values.password,
                userPlatform: window.navigator.platform,
                userBrowser: window.navigator.vendor,
                userIPAddress: "",
                userCity: "",
              });
              if (
                loginResult.isSuccessful &&
                loginResult.successCode === "0000"
              ) {
                setAdminUser(loginResult.data);
                const usersResult = await postRequest(WIN_CASH_URL.GET_USERS, {
                  tier1Parent: values.name,
                });
                setUsersList(usersResult.data);

                const adminsResult = await postRequest(
                  WIN_CASH_URL.GET_ADMINS_BY_PARENT_ID,
                  {
                    tier1Parent: values.name,
                  }
                );
                const adminsList =
                  adminsResult?.data?.length > 0 ? adminsResult.data : [];


                  const getChildDetails = async (child) => {
                    const childAdmins = await postRequest(
                      WIN_CASH_URL.GET_ADMINS_BY_PARENT_ID,
                      {
                        tier1Parent: child.userName,
                      }
                    );
                    const childUsers = await postRequest(WIN_CASH_URL.GET_USERS, {
                      tier1Parent: child.userName,
                    });
                    return Promise.allSettled([childAdmins, childUsers]).then((result) => ({
                      ...child,
                      childAdmins: result[0] ? result[0]?.value?.data : [],
                      childUsers: result[1] ? result[1]?.value?.data : [],
                    }));
                  };

                if (adminsList) {
                  try {
                    Promise.allSettled(
                      adminsList.map(async (child) => {
                        return await getChildDetails(child);
                      })
                    ).then((resp) => {
                      const resultList = resp.map((item) => item?.value);
                      setAdminsList(resultList);
                    });
                  } catch (e) {}
                  setAdminsList([]);
                }

                toast.success("Login Successful");
                history.push(RouteConfig.dashboard);
              } else {
                toast.error(loginResult.errorMessage);
              }
            } catch (e) {
              console.log(e);
              toast.error(e.errorMessage || "Server is down!");
            } finally {
              setSubmitting(false);
              resetForm();
            }
          }}
        >
          {({ values, handleSubmit, isSubmitting, setFieldValue }) => {
            const onNameChange = (e) => {
              setFieldValue(
                "name",
                e.target.value.replace(VALIDATIONS.ALPHANUM, "")
              );
            };
            const onPasswordChange = (e) => {
              setFieldValue(
                "password",
                e.target.value.replace(VALIDATIONS.ALPHANUM, "")
              );
            };
            return (
              <form onSubmit={handleSubmit}>
                <div className="d-flex justify-content-center">
                  <LoginInput
                    type="text"
                    placeholder="Username*"
                    id="name"
                    name="name"
                    className="fs-xxl fw-400"
                    autoComplete="false"
                    value={values.name}
                    onChange={onNameChange}
                    maxLength={14}
                  />
                </div>
                <ErrorContainer>
                  <ErrorMessage name="name" />
                </ErrorContainer>
                <div className="d-flex justify-content-center mt-4">
                  <LoginInput
                    type="password"
                    placeholder="Password*"
                    id="password"
                    name="password"
                    className="fs-xxl fw-400"
                    autoComplete="false"
                    value={values.password}
                    onChange={onPasswordChange}
                    maxLength={14}
                  />
                </div>
                <ErrorContainer>
                  <ErrorMessage name="password" />
                </ErrorContainer>
                <div className="d-flex justify-content-center mt-4">
                  <LoginButton
                    type="submit"
                    disabled={!values.name || !values.password}
                    className="d-flex justify-content-center text-center align-items-center"
                  >
                    <FerrisWheelSpinner
                      loading={isSubmitting}
                      size={24}
                      color="#fff"
                      className="rotate-infinite"
                    />
                    {!isSubmitting && (
                      <span className="fs-xxl fw-600">
                        {Labels.LoginButton} <MdLogout className="mx-1" />
                      </span>
                    )}
                  </LoginButton>
                </div>
              </form>
            );
          }}
        </Formik>
      </LoginStyled>
    </LoginContainer>
  );
};

const mapDispatchToProps = {
  setAdminUser: setAdminUser,
  setUsersList: setUsersList,
  setAdminsList: setAdminsList
};

export default withRouter(connect(null, mapDispatchToProps)(LoginPage));
