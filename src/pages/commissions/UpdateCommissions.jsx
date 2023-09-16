import React from "react";
import { ErrorMessage, Formik } from "formik";
import { connect } from "react-redux";
import { VALIDATIONS } from "../../config/validations";
import * as yup from "yup";
import { toast } from "react-toastify";
import StyledCmpt from "../../components/styledCmpt";
import { postRequest } from "../../api";
import { WIN_CASH_URL } from "../../config/routeConfig";
import { DotLoader } from "react-spinner-overlay";

const UpdateCommissions = ({
  setCommissionModal,
  tier1Percentage,
  tier2Percentage,
  tier3Percentage,
  fetchCommissionRates,
}) => {
  return (
    <StyledCmpt.ModalContainer>
      <StyledCmpt.ModalHeader className="bg-salmon">
        Set Commissions
      </StyledCmpt.ModalHeader>
      <StyledCmpt.ModalCloseBox onClick={() => setCommissionModal(false)}>
        x
      </StyledCmpt.ModalCloseBox>
      <Formik
        initialValues={{
          tier1Percentage: tier1Percentage,
          tier2Percentage: tier2Percentage,
          tier3Percentage: tier3Percentage,
        }}
        validationSchema={yup.object().shape({
          tier1Percentage: yup
            .number()
            .min(1, "* Tier1 Percentage can't be less than 1")
            .required("* Tier1 Percentage is required"),
          tier2Percentage: yup
            .number()
            .min(1, "* Tier2 Percentage can't be less than 1")
            .required("* Tier2 Percentage is required"),
          tier3Percentage: yup
            .number()
            .min(1, "* Tier3 Percentage can't be less than 1")
            .required("* Tier3 Percentage is required"),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          try {
            const result = await postRequest(
              WIN_CASH_URL.SET_COMMISSION_RATES,
              {
                tier1Percentage: Number(values.tier1Percentage),
                tier2Percentage: Number(values.tier2Percentage),
                tier3Percentage: Number(values.tier3Percentage),
              }
            );
            if (result.isSuccessful && result.successCode === "0000") {
              fetchCommissionRates();
              toast.success("Rates are updated Successful", {
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
            setCommissionModal(false);
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
          const onChangeTier1 = (e) => {
            setFieldValue(
              "tier1Percentage",
              e.target.value.replace(VALIDATIONS.DIGIT, "")
            );
          };
          const onChangeTier2 = (e) => {
            setFieldValue(
              "tier2Percentage",
              e.target.value.replace(VALIDATIONS.DIGIT, "")
            );
          };
          const onChangeTier3 = (e) => {
            setFieldValue(
              "tier3Percentage",
              e.target.value.replace(VALIDATIONS.DIGIT, "")
            );
          };

          return (
            <form onSubmit={handleSubmit}>
              <StyledCmpt.ModalItemsWrapper>
                <StyledCmpt.ModalItem>
                  <StyledCmpt.ModalLabel htmlFor="tier1Percentage">
                    Tier 1 Percentage <span className="text-danger">*</span>
                  </StyledCmpt.ModalLabel>
                  <StyledCmpt.ModalInput
                    id="tier1Percentage"
                    name="tier1Percentage"
                    onChange={onChangeTier1}
                    autoComplete="false"
                    type="number"
                    value={values.tier1Percentage}
                  />
                </StyledCmpt.ModalItem>

                <StyledCmpt.ErrorContainer className="m-0">
                  <ErrorMessage name="tier1Percentage" />
                </StyledCmpt.ErrorContainer>

                <StyledCmpt.ModalItem>
                  <StyledCmpt.ModalLabel htmlFor="tier2Percentage">
                    Tier 2 Percentage <span className="text-danger">*</span>
                  </StyledCmpt.ModalLabel>
                  <StyledCmpt.ModalInput
                    id="tier2Percentage"
                    name="tier2Percentage"
                    onChange={onChangeTier2}
                    autoComplete="false"
                    type="number"
                    value={values.tier2Percentage}
                  />
                </StyledCmpt.ModalItem>

                <StyledCmpt.ErrorContainer className="m-0">
                  <ErrorMessage name="tier2Percentage" />
                </StyledCmpt.ErrorContainer>

                <StyledCmpt.ModalItem>
                  <StyledCmpt.ModalLabel htmlFor="tier3Percentage">
                    Tier 3 Percentage <span className="text-danger">*</span>
                  </StyledCmpt.ModalLabel>
                  <StyledCmpt.ModalInput
                    id="tier3Percentage"
                    name="tier3Percentage"
                    onChange={onChangeTier3}
                    autoComplete="false"
                    type="number"
                    value={values.tier3Percentage}
                  />
                </StyledCmpt.ModalItem>

                <StyledCmpt.ErrorContainer className="m-0">
                  <ErrorMessage name="tier3Percentage" />
                </StyledCmpt.ErrorContainer>
              </StyledCmpt.ModalItemsWrapper>

              {!isSubmitting ? (
                <StyledCmpt.ModalBtnGrp className="d-flex justify-content-end">
                  <StyledCmpt.ModalBtn
                    className="bg-salmon"
                    onClick={handleReset}
                  >
                    Reset
                  </StyledCmpt.ModalBtn>
                  <StyledCmpt.ModalBtn className="bg-salmon" type="submit">
                    Confirm
                  </StyledCmpt.ModalBtn>
                </StyledCmpt.ModalBtnGrp>
              ) : (
                <StyledCmpt.ModalBtnGrp className="d-flex justify-content-center">
                  <DotLoader between={"8px"} color="#fa8072" />
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
  tier1Percentage: state.rates.tier1Percentage,
  tier2Percentage: state.rates.tier2Percentage,
  tier3Percentage: state.rates.tier3Percentage,
});

export default connect(mapStateToProps)(UpdateCommissions);
